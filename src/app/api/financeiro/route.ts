import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { FinancialTransactionSchema } from "@/lib/validations"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")

    const whereClause: any = {}

    if (type) {
      whereClause.type = type
    }

    if (status) {
      whereClause.status = status
    }

    const transactions = await db.financialTransaction.findMany({
      where: whereClause,
      orderBy: { dueDate: "asc" },
    })

    // Calculate totals
    const totals = {
      receita: transactions
        .filter((t) => t.type === "RECEITA")
        .reduce((sum, t) => sum + Number(t.amount), 0),
      despesa: transactions
        .filter((t) => t.type === "DESPESA")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    }

    return NextResponse.json({
      data: transactions,
      count: transactions.length,
      totals,
    })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
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
    const validatedData = FinancialTransactionSchema.parse(body)

    const transaction = await db.financialTransaction.create({
      data: {
        type: validatedData.type,
        amount: Number(validatedData.amount),
        description: validatedData.description,
        status: validatedData.status,
        dueDate: validatedData.dueDate,
        paidDate: validatedData.paidDate,
        referenceId: validatedData.referenceId,
        referenceType: validatedData.referenceType,
      },
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error: any) {
    console.error("Error creating transaction:", error)

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    )
  }
}
