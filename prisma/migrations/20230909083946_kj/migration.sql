/*
  Warnings:

  - The `GlobalSalary` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hourlyWage` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "GlobalSalary",
ADD COLUMN     "GlobalSalary" INTEGER,
DROP COLUMN "hourlyWage",
ADD COLUMN     "hourlyWage" INTEGER;
