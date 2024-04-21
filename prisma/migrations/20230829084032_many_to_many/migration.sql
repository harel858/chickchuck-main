/*
  Warnings:

  - You are about to drop the column `treatmentId` on the `RequiredDocument` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `RequiredDocument` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RequiredDocument" DROP CONSTRAINT "RequiredDocument_treatmentId_fkey";

-- AlterTable
ALTER TABLE "RequiredDocument" DROP COLUMN "treatmentId";

-- CreateTable
CREATE TABLE "_RequiredDocumentToTreatment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RequiredDocumentToTreatment_AB_unique" ON "_RequiredDocumentToTreatment"("A", "B");

-- CreateIndex
CREATE INDEX "_RequiredDocumentToTreatment_B_index" ON "_RequiredDocumentToTreatment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "RequiredDocument_name_key" ON "RequiredDocument"("name");

-- AddForeignKey
ALTER TABLE "_RequiredDocumentToTreatment" ADD CONSTRAINT "_RequiredDocumentToTreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "RequiredDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequiredDocumentToTreatment" ADD CONSTRAINT "_RequiredDocumentToTreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
