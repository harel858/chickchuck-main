/*
  Warnings:

  - The `isConfirmed` column on the `AppointmentRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AppointmentRequest" DROP COLUMN "isConfirmed",
ADD COLUMN     "isConfirmed" BOOLEAN;
