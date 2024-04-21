/*
  Warnings:

  - The values [anotherBsiness] on the enum `ComeFrom` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ComeFrom_new" AS ENUM ('InternetAdvertisement', 'GoogleSearch', 'Recommendation', 'anotherBusiness');
ALTER TABLE "Business" ALTER COLUMN "ComeFrom" TYPE "ComeFrom_new" USING ("ComeFrom"::text::"ComeFrom_new");
ALTER TYPE "ComeFrom" RENAME TO "ComeFrom_old";
ALTER TYPE "ComeFrom_new" RENAME TO "ComeFrom";
DROP TYPE "ComeFrom_old";
COMMIT;
