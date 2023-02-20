/*
  Warnings:

  - You are about to drop the `_appointmentTotreatment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `appointmentId` to the `treatment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_appointmentTotreatment" DROP CONSTRAINT "_appointmentTotreatment_A_fkey";

-- DropForeignKey
ALTER TABLE "_appointmentTotreatment" DROP CONSTRAINT "_appointmentTotreatment_B_fkey";

-- AlterTable
ALTER TABLE "treatment" ADD COLUMN     "appointmentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_appointmentTotreatment";

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
