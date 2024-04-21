/*
  Warnings:

  - You are about to drop the `_TreatmentToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TreatmentToUser" DROP CONSTRAINT "_TreatmentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TreatmentToUser" DROP CONSTRAINT "_TreatmentToUser_B_fkey";

-- AlterTable
ALTER TABLE "Treatment" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TreatmentToUser";

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
