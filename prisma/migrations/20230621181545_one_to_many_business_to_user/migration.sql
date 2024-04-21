/*
  Warnings:

  - You are about to drop the `_BusinessToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `businessId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BusinessToUser" DROP CONSTRAINT "_BusinessToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToUser" DROP CONSTRAINT "_BusinessToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "businessId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BusinessToUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
