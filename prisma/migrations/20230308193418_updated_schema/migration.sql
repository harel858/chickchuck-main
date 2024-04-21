/*
  Warnings:

  - Added the required column `closingTime` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingTime` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "closingTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "openingTime" TIMESTAMP(3) NOT NULL;
