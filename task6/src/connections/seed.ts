import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: [
      {
        user_id: "USER-" + nanoid(10),
        name: "jeremy",
        email: "jeremy@example.com",
      },
      {
        user_id: "USER-" + nanoid(10),
        name: "santoso",
        email: "santoso@example.com",
      },
    ],
  });
  console.log("Seeding completed ✅");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
