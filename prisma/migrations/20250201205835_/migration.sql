-- CreateEnum
CREATE TYPE "country" AS ENUM ('USA', 'IL');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "country" TEXT;
