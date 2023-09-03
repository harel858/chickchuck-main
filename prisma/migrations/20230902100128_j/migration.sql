/*
  Warnings:

  - Made the column `businessId` on table `RequiredDocument` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RequiredDocument" DROP CONSTRAINT "RequiredDocument_businessId_fkey";

-- AlterTable
ALTER TABLE "RequiredDocument" ALTER COLUMN "businessId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "RequiredDocument" ADD CONSTRAINT "RequiredDocument_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
