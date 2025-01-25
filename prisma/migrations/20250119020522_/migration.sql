/*
  Warnings:

  - A unique constraint covering the columns `[clId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "clId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_clId_key" ON "Customer"("clId");
