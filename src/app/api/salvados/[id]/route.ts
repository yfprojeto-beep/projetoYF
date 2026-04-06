import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const salvado = await db.salvado.findUnique({
      where: { id },
      include: {
        process: true,
        propostas: true,
        movimentacoes: true,
        anexos: true,
      },
    })

    if (!salvado) {
      return NextResponse.json(
        { error: "Salvado not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(salvado)
  } catch (error) {
    console.error("Error fetching salvado:", error)
    return NextResponse.json(
      { error: "Failed to fetch salvado" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    const salvado = await db.salvado.update({
      where: { id },
      data: {
        status: body.status,
        storageLocation: body.storageLocation,
        damageDesc: body.damageDesc,
        receiver: body.receiver,
      },
      include: {
        process: true,
      },
    })

    return NextResponse.json(salvado)
  } catch (error: any) {
    console.error("Error updating salvado:", error)
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Salvado not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: "Failed to update salvado" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const salvado = await db.salvado.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, salvado })
  } catch (error: any) {
    console.error("Error deleting salvado:", error)
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Salvado not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: "Failed to delete salvado" },
      { status: 500 }
    )
  }
}
