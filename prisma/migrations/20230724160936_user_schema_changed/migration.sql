/*
  Warnings:

  - Made the column `endActivity` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startActivity` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activityDays" INTEGER[],
ALTER COLUMN "endActivity" SET NOT NULL,
ALTER COLUMN "startActivity" SET NOT NULL;
