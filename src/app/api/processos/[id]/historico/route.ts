import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const filterDept = searchParams.get('dept');
    const filterDate = searchParams.get('date'); // YYYY-MM-DD format

    let whereClause: any = { processId: params.id };

    if (filterDept && filterDept !== "Todos") {
      whereClause.dept = filterDept;
    }

    if (filterDate) {
      // Create a range for the specific date
      const startDate = new Date(filterDate);
      startDate.setUTCHours(0, 0, 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setUTCHours(23, 59, 59, 999);
      
      whereClause.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    /*
    // REAL DATABASE LOGIC (Uncomment when db is fully populated)
    const history = await prisma.processHistory.findMany({
      where: whereClause,
      include: {
        user: { select: { name: true } },
      },
      orderBy: { date: "desc" },
    });

    const formattedHistory = history.map(h => ({
      id: h.id,
      date: new Date(h.date).toLocaleString('pt-BR'),
      user: h.user.name,
      dept: h.dept || "Geral",
      content: h.content,
    }));
    return NextResponse.json(formattedHistory);
    */

    // MOCK RESPONSE FOR UI DEVELOPMENT
    const mockHistory = [
      { id: "1", date: "31/03/2026 11:29:00", user: "ALICE", dept: "Central", content: "Processo aberto no sistema.", status: "Aberto" },
      { id: "2", date: "31/03/2026 14:15:00", user: "JOÃO D.", dept: "Análise", content: "Iniciada análise documental preliminar.", status: "Em Andamento" },
    ];

    let filteredMock = [...mockHistory];
    
    if (filterDept && filterDept !== "Todos") {
        filteredMock = filteredMock.filter(h => h.dept.toLowerCase() === filterDept.toLowerCase());
    }

    if (filterDate) {
        // filterDate format: 2026-03-31
        // mock format: 31/03/2026 11:29:00
        const parts = filterDate.split('-');
        if (parts.length === 3) {
            const formattedDateStr = `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
            filteredMock = filteredMock.filter(h => h.date.startsWith(formattedDateStr));
        }
    }

    return NextResponse.json(filteredMock);
  } catch (error) {
    console.error("Error fetching process history:", error);
    return NextResponse.json({ error: "Erro ao buscar histórico" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { content, dept, userId } = body;

    /*
    // REAL DATABASE LOGIC
    const newEntry = await prisma.processHistory.create({
      data: {
        processId: params.id,
        content,
        dept,
        userId: userId || "ADMIN_MOCK_USER_ID", // TODO: Auth
        type: "MANUAL"
      },
      include: {
        user: { select: { name: true } }
      }
    });

    return NextResponse.json({
      id: newEntry.id,
      date: new Date(newEntry.date).toLocaleString('pt-BR'),
      user: newEntry.user.name,
      dept: newEntry.dept,
      content: newEntry.content,
    });
    */

    // MOCK RESPONSE
    const newEntryMock = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('pt-BR'),
      user: "USUÁRIO YF",
      dept: dept || "Operacional",
      content: content,
      status: "Adicionado Manualmente"
    };

    return NextResponse.json(newEntryMock);
    
  } catch (error) {
    console.error("Error creating history entry:", error);
    return NextResponse.json({ error: "Erro ao salvar anotação" }, { status: 500 });
  }
}
