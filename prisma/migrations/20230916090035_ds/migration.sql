-- AlterTable
ALTER TABLE "User" ADD COLUMN     "breakTimeId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_breakTimeId_fkey" FOREIGN KEY ("breakTimeId") REFERENCES "BreakTime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
