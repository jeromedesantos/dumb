import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Bersihin data lama dulu
  await prisma.user.deleteMany();

  // Tambah user dummy
  await prisma.user.createMany({
    data: [
      {
        name: "Alice",
        email: "alice@example.com",
        points: 1500,
      },
      {
        name: "Bob",
        email: "bob@example.com",
        points: 800,
      },
      {
        name: "Charlie",
        email: "charlie@example.com",
        points: 300,
      },
    ],
  });

  console.log("✅ Seeder user selesai dibuat!");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
