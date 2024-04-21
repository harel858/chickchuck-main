/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppointmentSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvailableSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Break` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BreakTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomAppointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequiredDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Treatment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AppointmentSlotToAvailableSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlockedCustomers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BreakTimeToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BusinessToCustomer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CustomerToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RequiredDocumentToTreatment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TreatmentToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_appointmentSlotId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_userId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentSlot" DROP CONSTRAINT "AppointmentSlot_businessId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentSlot" DROP CONSTRAINT "AppointmentSlot_userId_fkey";

-- DropForeignKey
ALTER TABLE "AvailableSlot" DROP CONSTRAINT "AvailableSlot_breakTimeId_fkey";

-- DropForeignKey
ALTER TABLE "AvailableSlot" DROP CONSTRAINT "AvailableSlot_businessId_fkey";

-- DropForeignKey
ALTER TABLE "AvailableSlot" DROP CONSTRAINT "AvailableSlot_userId_fkey";

-- DropForeignKey
ALTER TABLE "Break" DROP CONSTRAINT "Break_appointmentSlotId_fkey";

-- DropForeignKey
ALTER TABLE "Break" DROP CONSTRAINT "Break_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Break" DROP CONSTRAINT "Break_userId_fkey";

-- DropForeignKey
ALTER TABLE "BreakTime" DROP CONSTRAINT "BreakTime_businessId_fkey";

-- DropForeignKey
ALTER TABLE "CustomAppointment" DROP CONSTRAINT "CustomAppointment_appointmentSlotId_fkey";

-- DropForeignKey
ALTER TABLE "CustomAppointment" DROP CONSTRAINT "CustomAppointment_businessId_fkey";

-- DropForeignKey
ALTER TABLE "CustomAppointment" DROP CONSTRAINT "CustomAppointment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "CustomAppointment" DROP CONSTRAINT "CustomAppointment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_businessId_fkey";

-- DropForeignKey
ALTER TABLE "RequiredDocument" DROP CONSTRAINT "RequiredDocument_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_businessId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_businessId_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentSlotToAvailableSlot" DROP CONSTRAINT "_AppointmentSlotToAvailableSlot_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentSlotToAvailableSlot" DROP CONSTRAINT "_AppointmentSlotToAvailableSlot_B_fkey";

-- DropForeignKey
ALTER TABLE "_BlockedCustomers" DROP CONSTRAINT "_BlockedCustomers_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlockedCustomers" DROP CONSTRAINT "_BlockedCustomers_B_fkey";

-- DropForeignKey
ALTER TABLE "_BreakTimeToUser" DROP CONSTRAINT "_BreakTimeToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BreakTimeToUser" DROP CONSTRAINT "_BreakTimeToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToCustomer" DROP CONSTRAINT "_BusinessToCustomer_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToCustomer" DROP CONSTRAINT "_BusinessToCustomer_B_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToUser" DROP CONSTRAINT "_CustomerToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToUser" DROP CONSTRAINT "_CustomerToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_RequiredDocumentToTreatment" DROP CONSTRAINT "_RequiredDocumentToTreatment_A_fkey";

-- DropForeignKey
ALTER TABLE "_RequiredDocumentToTreatment" DROP CONSTRAINT "_RequiredDocumentToTreatment_B_fkey";

-- DropForeignKey
ALTER TABLE "_TreatmentToUser" DROP CONSTRAINT "_TreatmentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TreatmentToUser" DROP CONSTRAINT "_TreatmentToUser_B_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "AppointmentSlot";

-- DropTable
DROP TABLE "AvailableSlot";

-- DropTable
DROP TABLE "Break";

-- DropTable
DROP TABLE "BreakTime";

-- DropTable
DROP TABLE "Business";

-- DropTable
DROP TABLE "CustomAppointment";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Document";

-- DropTable
DROP TABLE "Images";

-- DropTable
DROP TABLE "RequiredDocument";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Treatment";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "_AppointmentSlotToAvailableSlot";

-- DropTable
DROP TABLE "_BlockedCustomers";

-- DropTable
DROP TABLE "_BreakTimeToUser";

-- DropTable
DROP TABLE "_BusinessToCustomer";

-- DropTable
DROP TABLE "_CustomerToUser";

-- DropTable
DROP TABLE "_RequiredDocumentToTreatment";

-- DropTable
DROP TABLE "_TreatmentToUser";

-- DropEnum
DROP TYPE "AppointmentStatus";

-- DropEnum
DROP TYPE "PremiumKits";

-- DropEnum
DROP TYPE "TypeOfWage";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
