/*
  Warnings:

  - Added the required column `phone` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "phone" TEXT NOT NULL;
