import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // delete
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // create
  await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
    ],
  });
  await prisma.product.createMany({
    data: [
      { name: "Keyboard", price: 350_000, stock: 12 },
      { name: "Mouse", price: 150_000, stock: 30 },
      { name: "Monitor", price: 1_500_000, stock: 5 },
      { name: "Laptop", price: 8_000_000, stock: 3 },
      { name: "USB Hub", price: 100_000, stock: 50 },
    ],
  });
  await prisma.order.createMany({
    data: [
      { userId: 1, productId: 1, quantity: 2 },
      { userId: 1, productId: 2, quantity: 1 },
      { userId: 2, productId: 3, quantity: 1 },
      { userId: 2, productId: 4, quantity: 2 },
      { userId: 3, productId: 2, quantity: 4 },
      { userId: 3, productId: 5, quantity: 3 },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeding completed ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
