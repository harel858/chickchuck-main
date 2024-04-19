/*
  Warnings:

  - You are about to drop the `Break` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BreakTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BreakTimeToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Break" DROP CONSTRAINT "Break_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Break" DROP CONSTRAINT "Break_userId_fkey";

-- DropForeignKey
ALTER TABLE "BreakTime" DROP CONSTRAINT "BreakTime_businessId_fkey";

-- DropForeignKey
ALTER TABLE "_BreakTimeToUser" DROP CONSTRAINT "_BreakTimeToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BreakTimeToUser" DROP CONSTRAINT "_BreakTimeToUser_B_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "Break";

-- DropTable
DROP TABLE "BreakTime";

-- DropTable
DROP TABLE "_BreakTimeToUser";
