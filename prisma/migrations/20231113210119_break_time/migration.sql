/*
  Warnings:

  - Added the required column `date` to the `Break` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Break" ADD COLUMN     "date" TEXT NOT NULL;
