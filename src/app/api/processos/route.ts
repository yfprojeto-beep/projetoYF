import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || undefined;

  try {
    const processes = await prisma.process.findMany({
      where: {
        OR: [
          { processNumber: { contains: search, mode: "insensitive" } },
          { insured: { contains: search, mode: "insensitive" } },
          { insurer: { contains: search, mode: "insensitive" } },
        ],
        status: status ? { name: status } : undefined,
      },
      include: {
        status: true,
        assignedTo: { select: { name: true } },
      },
      orderBy: { dateOpened: "desc" },
    });

    return NextResponse.json(processes);
  } catch (error) {
    console.error("Error fetching processes:", error);
    // Em caso de erro (ex: banco não configurado), retornar mock data para desenvolvimento da UI
    return NextResponse.json([
      { id: "1", processNumber: "202412.215.32", opening: "11/12/2024 17:29", distribution: "29/04/2025 15:38", insured: "LEAL TRANSPORTES", insurer: "HDI GLOBAL", status: { name: "Atuação necessária" }, complexity: "Alta", type: "Vistoria" },
      { id: "2", processNumber: "202412.216.45", opening: "15/12/2024 09:15", distribution: "30/04/2025 10:20", insured: "LOGISTICA BRASIL", insurer: "PORTO SEGURO", status: { name: "Em andamento" }, complexity: "Média", type: "Atendimento" },
    ]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const process = await prisma.process.create({
      data: body,
    });
    return NextResponse.json(process);
  } catch (error) {
    console.error("Error creating process:", error);
    return NextResponse.json({ error: "Failed to create process" }, { status: 500 });
  }
}
