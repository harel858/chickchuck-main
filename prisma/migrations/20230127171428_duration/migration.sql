/*
  Warnings:

  - You are about to drop the column `authorId` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `businessId` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_authorId_fkey";

-- DropIndex
DROP INDEX "appointment_authorId_key";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "authorId",
ADD COLUMN     "businessId" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
