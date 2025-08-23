-- CreateTable
CREATE TABLE "task4"."User" (
    "user_id" TEXT NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "task4"."Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "task4"."User"("email");

-- AddForeignKey
ALTER TABLE "task4"."Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "task4"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
