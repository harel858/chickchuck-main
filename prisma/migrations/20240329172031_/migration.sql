-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_userId_fkey";

-- AlterTable
ALTER TABLE "Treatment" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
