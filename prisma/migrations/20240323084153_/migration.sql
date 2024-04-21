/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Address` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_businessId_fkey";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "Address" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";
