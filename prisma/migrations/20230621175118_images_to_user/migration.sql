/*
  Warnings:

  - You are about to drop the column `userId` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the `BusinessImages` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[businessId]` on the table `Images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessId` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessImages" DROP CONSTRAINT "BusinessImages_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_userId_fkey";

-- DropIndex
DROP INDEX "Images_userId_key";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "userId",
ADD COLUMN     "businessId" TEXT NOT NULL;

-- DropTable
DROP TABLE "BusinessImages";

-- CreateIndex
CREATE UNIQUE INDEX "Images_businessId_key" ON "Images"("businessId");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
