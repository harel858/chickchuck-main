/*
  Warnings:

  - Made the column `businessId` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_businessId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "zipcode" DROP NOT NULL,
ALTER COLUMN "businessId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
