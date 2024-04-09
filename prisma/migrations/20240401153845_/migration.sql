-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_userId_fkey";

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
ALTER TABLE "_TreatmentToUser" ADD CONSTRAINT "_TreatmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TreatmentToUser" ADD CONSTRAINT "_TreatmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
