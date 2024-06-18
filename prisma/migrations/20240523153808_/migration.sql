/*
  Warnings:

  - Added the required column `created` to the `AppointmentRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentRequest" ADD COLUMN     "created" TEXT NOT NULL;
