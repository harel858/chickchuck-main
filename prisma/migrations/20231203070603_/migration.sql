/*
  Warnings:

  - The values [TATOO] on the enum `BusinessType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BusinessType_new" AS ENUM ('Barber', 'TATTOO', 'Beautician', 'Manicurist', 'BeautySalon', 'MedicalClinic', 'SpaAndWellnessCenter', 'VeterinaryClinic', 'Trainer', 'DogGroomer', 'Other');
ALTER TABLE "Business" ALTER COLUMN "BusinessType" TYPE "BusinessType_new" USING ("BusinessType"::text::"BusinessType_new");
ALTER TYPE "BusinessType" RENAME TO "BusinessType_old";
ALTER TYPE "BusinessType_new" RENAME TO "BusinessType";
DROP TYPE "BusinessType_old";
COMMIT;
