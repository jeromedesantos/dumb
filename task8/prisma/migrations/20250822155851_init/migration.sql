-- CreateTable
CREATE TABLE "task8"."Supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task8"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task8"."SupplierStock" (
    "id" SERIAL NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupplierStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "task8"."Product"("sku");

-- AddForeignKey
ALTER TABLE "task8"."SupplierStock" ADD CONSTRAINT "SupplierStock_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "task8"."Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task8"."SupplierStock" ADD CONSTRAINT "SupplierStock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "task8"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
