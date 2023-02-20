-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_treatmentId_fkey";

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
