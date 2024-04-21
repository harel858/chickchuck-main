/*
  Warnings:

  - You are about to drop the column `GlobalSalary` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyWage` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeOfWage" AS ENUM ('GLOBALY', 'HOURLY');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "GlobalSalary",
DROP COLUMN "hourlyWage",
ADD COLUMN     "TypeOfWage" "TypeOfWage",
ADD COLUMN     "Wage" TEXT;
