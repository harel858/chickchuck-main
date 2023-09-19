/*
  Warnings:

  - You are about to drop the column `Time` on the `BreakTime` table. All the data in the column will be lost.
  - Added the required column `EndTime` to the `BreakTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartTime` to the `BreakTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BreakTime" DROP COLUMN "Time",
ADD COLUMN     "EndTime" TEXT NOT NULL,
ADD COLUMN     "StartTime" TEXT NOT NULL;
