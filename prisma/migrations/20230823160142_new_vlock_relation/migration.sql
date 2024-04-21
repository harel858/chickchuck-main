/*
  Warnings:

  - You are about to drop the column `businessId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `isBlocked` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_businessId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "businessId",
DROP COLUMN "isBlocked";

-- CreateTable
CREATE TABLE "_BlockedCustomers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlockedCustomers_AB_unique" ON "_BlockedCustomers"("A", "B");

-- CreateIndex
CREATE INDEX "_BlockedCustomers_B_index" ON "_BlockedCustomers"("B");

-- AddForeignKey
ALTER TABLE "_BlockedCustomers" ADD CONSTRAINT "_BlockedCustomers_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedCustomers" ADD CONSTRAINT "_BlockedCustomers_B_fkey" FOREIGN KEY ("B") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
