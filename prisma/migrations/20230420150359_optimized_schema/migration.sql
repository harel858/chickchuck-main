/*
  Warnings:

  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `activityDays` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `closingTime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `openingTime` on the `User` table. All the data in the column will be lost.
  - Added the required column `PremiumKit` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PremiumKits" AS ENUM ('Light', 'Pro', 'ProPlus');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropIndex
DROP INDEX "User_businessName_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "userId",
ADD COLUMN     "businessId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activityDays",
DROP COLUMN "businessName",
DROP COLUMN "closingTime",
DROP COLUMN "openingTime",
ADD COLUMN     "PremiumKit" "PremiumKits" NOT NULL,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "openingTime" TEXT,
    "closingTime" TEXT,
    "businessImage" TEXT,
    "activityDays" INTEGER[],

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_businessName_key" ON "Business"("businessName");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
