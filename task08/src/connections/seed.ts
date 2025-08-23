import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const suppliers = await prisma.supplier.createMany({
    data: [
      { id: "client-J88Q4", name: "Supplier A" },
      { id: "client3gENT", name: "Supplier B" },
      { id: "client-H1TK1", name: "Supplier C" },
    ],
  });

  const products = await prisma.product.createMany({
    data: [
      { id: "item-oldW-", name: "T-Shirt Black M", sku: "TSHRT-BLK-M" },
      { id: "item-1YVRp", name: "Laptop HP 15X", sku: "LPTP-HP-15X" },
      { id: "item-CC3dP", name: "Snack Cheese 50g", sku: "SNCK-CHS-50G" },
    ],
  });

  // Ambil ID yang baru dibuat
  const [supplier1, supplier2, supplier3] = await prisma.supplier.findMany();
  const [product1, product2, product3] = await prisma.product.findMany();

  await prisma.supplierStock.createMany({
    data: [
      { supplier_id: supplier1.id, product_id: product1.id, stock: 50 },
      { supplier_id: supplier2.id, product_id: product2.id, stock: 20 },
      { supplier_id: supplier3.id, product_id: product3.id, stock: 0 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
