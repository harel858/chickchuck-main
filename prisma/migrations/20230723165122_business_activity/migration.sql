/*
  Warnings:

  - Made the column `openingTime` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `closingTime` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "openingTime" SET NOT NULL,
ALTER COLUMN "closingTime" SET NOT NULL;
