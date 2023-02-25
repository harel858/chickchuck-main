/*
  Warnings:

  - You are about to drop the `_appointmentTotreatment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_appointmentTotreatment" DROP CONSTRAINT "_appointmentTotreatment_A_fkey";

-- DropForeignKey
ALTER TABLE "_appointmentTotreatment" DROP CONSTRAINT "_appointmentTotreatment_B_fkey";

-- DropTable
DROP TABLE "_appointmentTotreatment";

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
