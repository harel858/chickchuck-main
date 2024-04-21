/*
  Warnings:

  - You are about to drop the column `businessId` on the `AppointmentSlot` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AppointmentSlot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AppointmentSlot" DROP CONSTRAINT "AppointmentSlot_businessId_fkey";

-- AlterTable
ALTER TABLE "AppointmentSlot" DROP COLUMN "businessId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AppointmentSlot" ADD CONSTRAINT "AppointmentSlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
