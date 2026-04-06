import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const filterDept = searchParams.get("dept")
    const filterDate = searchParams.get("date") // YYYY-MM-DD format

    let whereClause: any = { processId: id }

    if (filterDept && filterDept !== "Todos") {
      whereClause.dept = filterDept
    }

    if (filterDate) {
      // Create a range for the specific date
      const startDate = new Date(filterDate)
      startDate.setUTCHours(0, 0, 0, 0)

      const endDate = new Date(startDate)
      endDate.setUTCHours(23, 59, 59, 999)

      whereClause.date = {
        gte: startDate,
        lte: endDate,
      }
    }

    const history = await db.processHistory.findMany({
      where: whereClause,
      include: {
        user: { select: { name: true, email: true } },
      },
      orderBy: { date: "desc" },
    })

    const formattedHistory = history.map((h) => ({
      id: h.id,
      date: new Date(h.date).toLocaleString("pt-BR"),
      user: h.user.name || h.user.email,
      dept: h.dept || "Geral",
      content: h.content,
      type: h.type,
    }))

    return NextResponse.json(formattedHistory)
  } catch (error) {
    console.error("Error fetching process history:", error)
    return NextResponse.json(
      { error: "Erro ao buscar histórico" },
      { status: 500 }
    )
  }
}

export async function POST(
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
    const { content, dept } = body

    // Check if process exists
    const process = await db.process.findUnique({
      where: { id },
    })

    if (!process) {
      return NextResponse.json(
        { error: "Process not found" },
        { status: 404 }
      )
    }

    const newEntry = await db.processHistory.create({
      data: {
        processId: id,
        content,
        dept: dept || "Operacional",
        userId: session.user.id,
        type: "MANUAL",
      },
      include: {
        user: { select: { name: true, email: true } },
      },
    })

    return NextResponse.json(
      {
        id: newEntry.id,
        date: new Date(newEntry.date).toLocaleString("pt-BR"),
        user: newEntry.user.name || newEntry.user.email,
        dept: newEntry.dept,
        content: newEntry.content,
        type: newEntry.type,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating history entry:", error)
    return NextResponse.json(
      { error: "Erro ao salvar anotação" },
      { status: 500 }
    )
  }
}
