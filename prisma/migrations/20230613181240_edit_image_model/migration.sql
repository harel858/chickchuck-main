/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Images_userId_key" ON "Images"("userId");
