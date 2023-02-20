/*
  Warnings:

  - Added the required column `cost` to the `treatment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "treatment" ADD COLUMN     "cost" TEXT NOT NULL;
