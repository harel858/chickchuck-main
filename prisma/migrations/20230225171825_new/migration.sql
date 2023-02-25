/*
  Warnings:

  - You are about to drop the column `appointmentTime` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `end` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "appointmentTime",
ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL;
