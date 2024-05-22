/*
  Warnings:

  - You are about to drop the column `date` on the `AppointmentRequest` table. All the data in the column will be lost.
  - Added the required column `end` to the `AppointmentRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `AppointmentRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentRequest" DROP COLUMN "date",
ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL;
