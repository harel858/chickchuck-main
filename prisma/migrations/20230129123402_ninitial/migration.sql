/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `treatment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_appointmentId_fkey";

-- AlterTable
ALTER TABLE "treatment" DROP COLUMN "appointmentId";

-- CreateTable
CREATE TABLE "_appointmentTotreatment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_appointmentTotreatment_AB_unique" ON "_appointmentTotreatment"("A", "B");

-- CreateIndex
CREATE INDEX "_appointmentTotreatment_B_index" ON "_appointmentTotreatment"("B");

-- AddForeignKey
ALTER TABLE "_appointmentTotreatment" ADD CONSTRAINT "_appointmentTotreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_appointmentTotreatment" ADD CONSTRAINT "_appointmentTotreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
