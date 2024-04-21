/*
  Warnings:

  - Made the column `treatmentId` on table `RequiredDocument` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RequiredDocument" DROP CONSTRAINT "RequiredDocument_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_businessId_fkey";

-- AlterTable
ALTER TABLE "RequiredDocument" ALTER COLUMN "treatmentId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_TreatmentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TreatmentToUser_AB_unique" ON "_TreatmentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TreatmentToUser_B_index" ON "_TreatmentToUser"("B");

-- AddForeignKey
ALTER TABLE "RequiredDocument" ADD CONSTRAINT "RequiredDocument_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TreatmentToUser" ADD CONSTRAINT "_TreatmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TreatmentToUser" ADD CONSTRAINT "_TreatmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
