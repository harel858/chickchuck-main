/*
  Warnings:

  - Added the required column `date` to the `AppointmentSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentSlot" ADD COLUMN     "date" TEXT NOT NULL,
ALTER COLUMN "start" SET DATA TYPE TEXT,
ALTER COLUMN "end" SET DATA TYPE TEXT;
