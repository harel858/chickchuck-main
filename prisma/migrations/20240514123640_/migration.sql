/*
  Warnings:

  - A unique constraint covering the columns `[calendarId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "watchExpiration" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_calendarId_key" ON "users"("calendarId");
