/*
  Warnings:

  - You are about to drop the column `breakTimeId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_breakTimeId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "breakTimeId";

-- CreateTable
CREATE TABLE "_BreakTimeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BreakTimeToUser_AB_unique" ON "_BreakTimeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BreakTimeToUser_B_index" ON "_BreakTimeToUser"("B");

-- AddForeignKey
ALTER TABLE "_BreakTimeToUser" ADD CONSTRAINT "_BreakTimeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "BreakTime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BreakTimeToUser" ADD CONSTRAINT "_BreakTimeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
