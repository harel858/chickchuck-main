/*
  Warnings:

  - You are about to drop the column `businessId` on the `AvailableSlot` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AvailableSlot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AvailableSlot" DROP CONSTRAINT "AvailableSlot_businessId_fkey";

-- AlterTable
ALTER TABLE "AvailableSlot" DROP COLUMN "businessId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AvailableSlot" ADD CONSTRAINT "AvailableSlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
