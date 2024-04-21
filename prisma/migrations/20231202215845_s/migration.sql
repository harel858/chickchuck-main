/*
  Warnings:

  - You are about to drop the column `closingTime` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `openingTime` on the `Business` table. All the data in the column will be lost.
  - Added the required column `BusinessType` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ComeFrom` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastCalendar` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('Barber', 'Beautician', 'Manicurist', 'BeautySalon', 'MedicalClinic', 'SpaAndWellnessCenter', 'VeterinaryClinic', 'Trainer', 'DogGroomer', 'Other');

-- CreateEnum
CREATE TYPE "LastCalendar" AS ENUM ('PhysicalCalendar', 'GoogleCalendar', 'OtherSystem', 'NONE');

-- CreateEnum
CREATE TYPE "ComeFrom" AS ENUM ('InternetAdvertisement', 'GoogleSearch', 'Recommendation', 'anotherBsiness');

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "closingTime",
DROP COLUMN "openingTime",
ADD COLUMN     "BusinessType" "BusinessType" NOT NULL,
ADD COLUMN     "ComeFrom" "ComeFrom" NOT NULL,
ADD COLUMN     "LastCalendar" "LastCalendar" NOT NULL;
