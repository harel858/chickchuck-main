/*
  Warnings:

  - You are about to drop the column `appointmentSlotId` on the `AvailableSlot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AvailableSlot" DROP CONSTRAINT "AvailableSlot_appointmentSlotId_fkey";

-- AlterTable
ALTER TABLE "AvailableSlot" DROP COLUMN "appointmentSlotId";

-- CreateTable
CREATE TABLE "_AppointmentSlotToAvailableSlot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AppointmentSlotToAvailableSlot_AB_unique" ON "_AppointmentSlotToAvailableSlot"("A", "B");

-- CreateIndex
CREATE INDEX "_AppointmentSlotToAvailableSlot_B_index" ON "_AppointmentSlotToAvailableSlot"("B");

-- AddForeignKey
ALTER TABLE "_AppointmentSlotToAvailableSlot" ADD CONSTRAINT "_AppointmentSlotToAvailableSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "AppointmentSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentSlotToAvailableSlot" ADD CONSTRAINT "_AppointmentSlotToAvailableSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "AvailableSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
