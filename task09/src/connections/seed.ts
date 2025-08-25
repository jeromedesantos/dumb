import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // user
  await prisma.user.createMany({
    data: [
      {
        id: "usr25-ssss1",
        name: "Jeremy",
        email: "jeremysan@gmail.com",
        role: "admin",
        password: "123",
      },
      {
        id: "usr25-dsaa2",
        name: "Root",
        email: "root1asd@gmail.com",
        role: "user",
        password: "123",
      },
      {
        id: "usr25-asdf3",
        name: "User",
        role: "user",
        email: "user1asd2@gmail.com",
        password: "123",
      },
    ],
  });

  // product
  await prisma.product.createMany({
    data: [
      {
        id: "prod25-dsaa1",
        name: "T-Shirt Black M",
        price: 10000,
        stock: 100,
      },
      {
        id: "prod25-asdf2",
        name: "Laptop HP 15X",
        price: 50000,
        stock: 120,
      },
      {
        id: "prod25-wers3",
        name: "Snack Cheese 50g",
        price: 300,
        stock: 150,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeding completed ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
