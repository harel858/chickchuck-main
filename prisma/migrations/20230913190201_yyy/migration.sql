-- AlterTable
ALTER TABLE "AvailableSlot" ADD COLUMN     "breakTimeId" TEXT;

-- CreateTable
CREATE TABLE "BreakTime" (
    "id" TEXT NOT NULL,
    "Time" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "BreakTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BreakTime" ADD CONSTRAINT "BreakTime_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableSlot" ADD CONSTRAINT "AvailableSlot_breakTimeId_fkey" FOREIGN KEY ("breakTimeId") REFERENCES "BreakTime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
