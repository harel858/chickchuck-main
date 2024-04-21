/*
  Warnings:

  - You are about to drop the column `activityDays` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `activityDays` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "activityDays";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "activityDays";

-- CreateTable
CREATE TABLE "ActivityDays" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "businessId" TEXT,
    "userId" TEXT,

    CONSTRAINT "ActivityDays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityDays" ADD CONSTRAINT "ActivityDays_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityDays" ADD CONSTRAINT "ActivityDays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
