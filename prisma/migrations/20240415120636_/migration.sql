/*
  Warnings:

  - You are about to drop the `_AccountToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AccountToUser" DROP CONSTRAINT "_AccountToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToUser" DROP CONSTRAINT "_AccountToUser_B_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accountId" TEXT;

-- DropTable
DROP TABLE "_AccountToUser";

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
