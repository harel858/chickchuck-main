/*
  Warnings:

  - Made the column `businessId` on table `ActivityDays` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `ActivityDays` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ActivityDays" DROP CONSTRAINT "ActivityDays_businessId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityDays" DROP CONSTRAINT "ActivityDays_userId_fkey";

-- AlterTable
ALTER TABLE "ActivityDays" ALTER COLUMN "businessId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ActivityDays" ADD CONSTRAINT "ActivityDays_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityDays" ADD CONSTRAINT "ActivityDays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
