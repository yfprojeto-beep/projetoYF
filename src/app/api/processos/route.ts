import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ProcessSchema } from "@/lib/validations"
import { auth } from "@/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const statusName = searchParams.get("status") || undefined

    // Build where clause
    const whereClause: any = {
      OR: [
        { processNumber: { contains: search, mode: "insensitive" } },
        { insured: { contains: search, mode: "insensitive" } },
        { insurer: { contains: search, mode: "insensitive" } },
      ],
    }

    // If status filter is provided, find the status ID first
    if (statusName) {
      const processStatus = await db.processStatus.findUnique({
        where: { name: statusName },
      })
      if (processStatus) {
        whereClause.statusId = processStatus.id
      }
    }

    const processes = await db.process.findMany({
      where: whereClause,
      include: {
        status: true,
        assignedTo: { select: { id: true, name: true, email: true } },
      },
      orderBy: { dateOpened: "desc" },
      take: 50, // Limit to 50 for pagination
    })

    return NextResponse.json({
      data: processes,
      count: processes.length,
    })
  } catch (error) {
    console.error("Error fetching processes:", error)
    return NextResponse.json(
      { error: "Failed to fetch processes" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate input
    const validatedData = ProcessSchema.parse(body)

    // Get default status (Aberto) if not provided
    let statusId = validatedData.statusId
    if (!statusId) {
      const openStatus = await db.processStatus.findUnique({
        where: { name: "Aberto" },
      })
      statusId = openStatus?.id || ""
    }

    const process = await db.process.create({
      data: {
        processNumber: validatedData.processNumber,
        statusId,
        insured: validatedData.insured,
        insurer: validatedData.insurer,
        broker: validatedData.broker,
        merchandise: validatedData.merchandise,
        value: validatedData.value ? Number(validatedData.value) : undefined,
        prejudice: validatedData.prejudice
          ? Number(validatedData.prejudice)
          : undefined,
        userId: validatedData.userId,
      },
      include: {
        status: true,
        assignedTo: true,
      },
    })

    return NextResponse.json(process, { status: 201 })
  } catch (error: any) {
    console.error("Error creating process:", error)

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create process" },
      { status: 500 }
    )
  }
}
