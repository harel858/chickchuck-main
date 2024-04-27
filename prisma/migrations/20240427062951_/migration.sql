-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('SCHEDULED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'RECIPIENT', 'TEAMMEATE');

-- CreateEnum
CREATE TYPE "TypeOfWage" AS ENUM ('GLOBALY', 'HOURLY');

-- CreateEnum
CREATE TYPE "PremiumKits" AS ENUM ('Light', 'Pro', 'ProPlus');

-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('Barber', 'TATTOO', 'Beautician', 'Manicurist', 'BeautySalon', 'MedicalClinic', 'SpaAndWellnessCenter', 'VeterinaryClinic', 'Trainer', 'DogGroomer', 'Other');

-- CreateEnum
CREATE TYPE "LastCalendar" AS ENUM ('PhysicalCalendar', 'GoogleCalendar', 'OtherSystem', 'NONE');

-- CreateEnum
CREATE TYPE "ComeFrom" AS ENUM ('InternetAdvertisement', 'GoogleSearch', 'Recommendation', 'anotherBusiness');

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
    "syncToken" TEXT,
    "resourceId" TEXT,
    "channelId" TEXT,
    "watchExpired" TEXT,

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
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "startActivity" TEXT,
    "endActivity" TEXT,
    "TypeOfWage" "TypeOfWage" NOT NULL DEFAULT 'HOURLY',
    "Wage" TEXT,
    "UserRole" "UserRole" DEFAULT 'RECIPIENT',
    "isAdmin" BOOLEAN,
    "PremiumKit" "PremiumKits" NOT NULL DEFAULT 'Light',
    "businessId" TEXT,
    "calendarId" TEXT,
    "accountId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "profileImgName" TEXT,
    "backgroundImgName" TEXT,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequiredDocument" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "RequiredDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentURL" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityDays" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "businessId" TEXT,
    "userId" TEXT,

    CONSTRAINT "ActivityDays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "businessImage" TEXT,
    "BusinessType" "BusinessType",
    "LastCalendar" "LastCalendar",
    "ComeFrom" "ComeFrom",
    "Address" TEXT NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "UserRole" "UserRole" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "advancePayment" INTEGER,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RequiredDocumentToTreatment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BusinessToCustomer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BlockedCustomers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CustomerToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TreatmentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_user_id_key" ON "accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Business_businessName_key" ON "Business"("businessName");

-- CreateIndex
CREATE UNIQUE INDEX "Business_phone_key" ON "Business"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phoneNumber_key" ON "Customer"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Treatment_title_key" ON "Treatment"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_RequiredDocumentToTreatment_AB_unique" ON "_RequiredDocumentToTreatment"("A", "B");

-- CreateIndex
CREATE INDEX "_RequiredDocumentToTreatment_B_index" ON "_RequiredDocumentToTreatment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BusinessToCustomer_AB_unique" ON "_BusinessToCustomer"("A", "B");

-- CreateIndex
CREATE INDEX "_BusinessToCustomer_B_index" ON "_BusinessToCustomer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BlockedCustomers_AB_unique" ON "_BlockedCustomers"("A", "B");

-- CreateIndex
CREATE INDEX "_BlockedCustomers_B_index" ON "_BlockedCustomers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToUser_AB_unique" ON "_CustomerToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToUser_B_index" ON "_CustomerToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TreatmentToUser_AB_unique" ON "_TreatmentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TreatmentToUser_B_index" ON "_TreatmentToUser"("B");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequiredDocument" ADD CONSTRAINT "RequiredDocument_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityDays" ADD CONSTRAINT "ActivityDays_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityDays" ADD CONSTRAINT "ActivityDays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequiredDocumentToTreatment" ADD CONSTRAINT "_RequiredDocumentToTreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "RequiredDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequiredDocumentToTreatment" ADD CONSTRAINT "_RequiredDocumentToTreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToCustomer" ADD CONSTRAINT "_BusinessToCustomer_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToCustomer" ADD CONSTRAINT "_BusinessToCustomer_B_fkey" FOREIGN KEY ("B") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedCustomers" ADD CONSTRAINT "_BlockedCustomers_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedCustomers" ADD CONSTRAINT "_BlockedCustomers_B_fkey" FOREIGN KEY ("B") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToUser" ADD CONSTRAINT "_CustomerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToUser" ADD CONSTRAINT "_CustomerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TreatmentToUser" ADD CONSTRAINT "_TreatmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TreatmentToUser" ADD CONSTRAINT "_TreatmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
