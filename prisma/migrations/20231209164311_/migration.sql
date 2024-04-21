-- DropForeignKey
ALTER TABLE "ActivityDays" DROP CONSTRAINT "ActivityDays_businessId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityDays" DROP CONSTRAINT "ActivityDays_userId_fkey";

-- AlterTable
ALTER TABLE "ActivityDays" ALTER COLUMN "businessId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ActivityDays" ADD CONSTRAINT "ActivityDays_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityDays" ADD CONSTRAINT "ActivityDays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
