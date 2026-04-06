import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { VistoriaSchema } from "@/lib/validations"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const processId = searchParams.get("processId")
    const status = searchParams.get("status")

    const whereClause: any = {}

    if (processId) {
      whereClause.processId = processId
    }

    if (status) {
      whereClause.status = status
    }

    const vistorias = await db.vistoria.findMany({
      where: whereClause,
      include: {
        process: { select: { id: true, processNumber: true } },
      },
      orderBy: { date: "desc" },
    })

    return NextResponse.json({
      data: vistorias,
      count: vistorias.length,
    })
  } catch (error) {
    console.error("Error fetching vistorias:", error)
    return NextResponse.json(
      { error: "Failed to fetch vistorias" },
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
    const validatedData = VistoriaSchema.parse(body)

    const vistoria = await db.vistoria.create({
      data: {
        processId: body.processId,
        date: validatedData.date || new Date(),
        location: validatedData.location,
        findings: validatedData.findings,
        status: validatedData.status,
        inspectorName: validatedData.inspectorName,
        justification: validatedData.justification,
      },
      include: {
        process: true,
      },
    })

    return NextResponse.json(vistoria, { status: 201 })
  } catch (error: any) {
    console.error("Error creating vistoria:", error)

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create vistoria" },
      { status: 500 }
    )
  }
}
