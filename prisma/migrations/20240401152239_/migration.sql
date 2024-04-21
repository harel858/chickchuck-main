/*
  Warnings:

  - Made the column `userId` on table `Treatment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_userId_fkey";

-- AlterTable
ALTER TABLE "Treatment" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
