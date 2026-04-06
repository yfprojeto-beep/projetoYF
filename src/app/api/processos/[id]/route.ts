import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const process = await db.process.findUnique({
      where: { id },
      include: {
        status: true,
        assignedTo: { select: { id: true, name: true, email: true } },
        details: true,
        vistorias: true,
        midias: true,
        adiantamentos: true,
        salvados: true,
        history: {
          include: { user: { select: { name: true, email: true } } },
          orderBy: { date: "desc" },
        },
      },
    })

    if (!process) {
      return NextResponse.json(
        { error: "Process not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(process)
  } catch (error) {
    console.error("Error fetching process:", error)
    return NextResponse.json(
      { error: "Failed to fetch process" },
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

    // Check if process exists
    const existingProcess = await db.process.findUnique({
      where: { id },
    })

    if (!existingProcess) {
      return NextResponse.json(
        { error: "Process not found" },
        { status: 404 }
      )
    }

    const updatedProcess = await db.process.update({
      where: { id },
      data: {
        statusId: body.statusId,
        userId: body.userId,
        prejudice: body.prejudice ? Number(body.prejudice) : undefined,
      },
      include: {
        status: true,
        assignedTo: true,
      },
    })

    return NextResponse.json(updatedProcess)
  } catch (error: any) {
    console.error("Error updating process:", error)
    return NextResponse.json(
      { error: "Failed to update process" },
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

    const process = await db.process.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, process })
  } catch (error) {
    console.error("Error deleting process:", error)
    return NextResponse.json(
      { error: "Failed to delete process" },
      { status: 500 }
    )
  }
}
