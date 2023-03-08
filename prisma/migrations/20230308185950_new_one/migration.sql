/*
  Warnings:

  - Added the required column `slotDuration` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activityDays" INTEGER[],
ADD COLUMN     "slotDuration" INTEGER NOT NULL;
