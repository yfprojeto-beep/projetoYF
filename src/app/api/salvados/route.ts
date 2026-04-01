import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { SalvadoSchema } from "@/lib/validations"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status")

    const whereClause: any = {}

    if (search) {
      whereClause.OR = [
        { lotNumber: { contains: search, mode: "insensitive" } },
        { merchandise: { contains: search, mode: "insensitive" } },
      ]
    }

    if (status) {
      whereClause.status = status
    }

    const salvados = await db.salvado.findMany({
      where: whereClause,
      include: {
        process: { select: { id: true, processNumber: true, insured: true } },
        propostas: true,
        movimentacoes: true,
      },
      orderBy: { dateSent: "desc" },
    })

    return NextResponse.json({
      data: salvados,
      count: salvados.length,
    })
  } catch (error) {
    console.error("Error fetching salvados:", error)
    return NextResponse.json(
      { error: "Failed to fetch salvados" },
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
    const validatedData = SalvadoSchema.parse(body)

    const salvado = await db.salvado.create({
      data: {
        processId: body.processId,
        lotNumber: validatedData.lotNumber,
        storageLocation: validatedData.storageLocation,
        status: validatedData.status,
        merchandise: validatedData.merchandise,
        quantity: validatedData.quantity,
        damageDesc: validatedData.damageDesc,
        sender: validatedData.sender,
        receiver: validatedData.receiver,
      },
      include: {
        process: true,
      },
    })

    return NextResponse.json(salvado, { status: 201 })
  } catch (error: any) {
    console.error("Error creating salvado:", error)

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create salvado" },
      { status: 500 }
    )
  }
}
