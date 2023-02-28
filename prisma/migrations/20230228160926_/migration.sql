/*
  Warnings:

  - Added the required column `slotDuration` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "slotDuration" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "availableSlot" (
    "id" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "availableSlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "availableSlot" ADD CONSTRAINT "availableSlot_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
