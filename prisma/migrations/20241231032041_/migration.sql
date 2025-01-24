-- AlterTable
ALTER TABLE "_BlockedCustomers" ADD CONSTRAINT "_BlockedCustomers_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_BlockedCustomers_AB_unique";

-- AlterTable
ALTER TABLE "_BusinessToCustomer" ADD CONSTRAINT "_BusinessToCustomer_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_BusinessToCustomer_AB_unique";

-- AlterTable
ALTER TABLE "_CustomerToUser" ADD CONSTRAINT "_CustomerToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CustomerToUser_AB_unique";

-- AlterTable
ALTER TABLE "_RequiredDocumentToTreatment" ADD CONSTRAINT "_RequiredDocumentToTreatment_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_RequiredDocumentToTreatment_AB_unique";

-- AlterTable
ALTER TABLE "_TreatmentToUser" ADD CONSTRAINT "_TreatmentToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TreatmentToUser_AB_unique";
