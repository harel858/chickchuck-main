/*
  Warnings:

  - You are about to drop the column `Title` on the `Appointment` table. All the data in the column will be lost.
  - Made the column `treatmentId` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_treatmentId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "Title",
ALTER COLUMN "treatmentId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
