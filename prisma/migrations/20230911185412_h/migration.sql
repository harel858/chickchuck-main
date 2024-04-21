/*
  Warnings:

  - Made the column `TypeOfWage` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "TypeOfWage" SET NOT NULL,
ALTER COLUMN "TypeOfWage" SET DEFAULT 'HOURLY';
