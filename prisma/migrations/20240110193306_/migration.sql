/*
  Warnings:

  - Added the required column `isActive` to the `ActivityDays` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityDays" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
