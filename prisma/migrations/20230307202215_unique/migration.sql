/*
  Warnings:

  - You are about to drop the column `end` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `appointment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[availableSlotId]` on the table `appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availableSlotId` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "end",
DROP COLUMN "name",
DROP COLUMN "phoneNumber",
DROP COLUMN "start",
ADD COLUMN     "availableSlotId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "appointment_availableSlotId_key" ON "appointment"("availableSlotId");

-- CreateIndex
CREATE UNIQUE INDEX "customer_phoneNumber_key" ON "customer"("phoneNumber");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_availableSlotId_fkey" FOREIGN KEY ("availableSlotId") REFERENCES "availableSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
