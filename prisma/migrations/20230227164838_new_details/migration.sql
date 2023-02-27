/*
  Warnings:

  - You are about to drop the column `Street` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `activityEndtTime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `activityStartTime` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Street",
DROP COLUMN "activityEndtTime",
DROP COLUMN "activityStartTime",
ADD COLUMN     "activityDays" INTEGER[],
ADD COLUMN     "endActivity" TEXT,
ADD COLUMN     "startActivity" TEXT;
