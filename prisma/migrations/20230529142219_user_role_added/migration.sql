-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'RECIPIENT');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "UserRole" "UserRole" NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "UserRole" "UserRole" NOT NULL DEFAULT 'RECIPIENT';
