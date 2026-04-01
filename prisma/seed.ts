import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create roles
  console.log("Creating roles...")
  const superAdminRole = await prisma.role.upsert({
    where: { name: "SuperAdmin" },
    update: {},
    create: {
      name: "SuperAdmin",
    },
  })

  const analistaRole = await prisma.role.upsert({
    where: { name: "Analista" },
    update: {},
    create: {
      name: "Analista",
    },
  })

  const vistoriadorRole = await prisma.role.upsert({
    where: { name: "Vistoriador" },
    update: {},
    create: {
      name: "Vistoriador",
    },
  })

  const financeiroRole = await prisma.role.upsert({
    where: { name: "Financeiro" },
    update: {},
    create: {
      name: "Financeiro",
    },
  })

  // Create process statuses
  console.log("Creating process statuses...")
  const statusOpen = await prisma.processStatus.upsert({
    where: { name: "Aberto" },
    update: {},
    create: { name: "Aberto" },
  })

  const statusDistribution = await prisma.processStatus.upsert({
    where: { name: "Distribuição" },
    update: {},
    create: { name: "Distribuição" },
  })

  const statusConduction = await prisma.processStatus.upsert({
    where: { name: "Condução" },
    update: {},
    create: { name: "Condução" },
  })

  const statusFinalized = await prisma.processStatus.upsert({
    where: { name: "Finalizado" },
    update: {},
    create: { name: "Finalizado" },
  })

  // Create demo users
  console.log("Creating demo users...")
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@projetoyf.com" },
    update: {},
    create: {
      email: "admin@projetoyf.com",
      name: "Admin User",
      password: await hash("admin123", 10),
      roleId: superAdminRole.id,
    },
  })

  const analistaUser = await prisma.user.upsert({
    where: { email: "analista@projetoyf.com" },
    update: {},
    create: {
      email: "analista@projetoyf.com",
      name: "Analista Demo",
      password: await hash("analista123", 10),
      roleId: analistaRole.id,
    },
  })

  const vistoriadorUser = await prisma.user.upsert({
    where: { email: "vistoriador@projetoyf.com" },
    update: {},
    create: {
      email: "vistoriador@projetoyf.com",
      name: "Vistoriador Demo",
      password: await hash("vistoriador123", 10),
      roleId: vistoriadorRole.id,
    },
  })

  const financeiroUser = await prisma.user.upsert({
    where: { email: "financeiro@projetoyf.com" },
    update: {},
    create: {
      email: "financeiro@projetoyf.com",
      name: "Financeiro Demo",
      password: await hash("financeiro123", 10),
      roleId: financeiroRole.id,
    },
  })

  // Create sample process
  console.log("Creating sample process...")
  const process = await prisma.process.upsert({
    where: { processNumber: "202404.001.01" },
    update: {},
    create: {
      processNumber: "202404.001.01",
      statusId: statusOpen.id,
      insured: "João Silva",
      insurer: "Seguradora XYZ",
      broker: "Corretora ABC",
      merchandise: "Equipamento Eletrônico",
      value: 50000.0,
      prejudice: 35000.0,
      userId: analistaUser.id,
      details: {
        create: {
          preliminaryReport: "Initial assessment completed",
          eventDetails: "Damage from transportation accident",
        },
      },
    },
  })

  console.log("✅ Seeding completed successfully!")
  console.log("\n📝 Demo credentials:")
  console.log("  Admin: admin@projetoyf.com / admin123")
  console.log("  Analista: analista@projetoyf.com / analista123")
  console.log("  Vistoriador: vistoriador@projetoyf.com / vistoriador123")
  console.log("  Financeiro: financeiro@projetoyf.com / financeiro123")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
