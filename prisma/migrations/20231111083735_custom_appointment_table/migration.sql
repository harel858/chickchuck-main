-- CreateTable
CREATE TABLE "CustomAppointment" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "appointmentSlotId" TEXT NOT NULL,
    "status" "AppointmentStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "CustomAppointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomAppointment_appointmentSlotId_key" ON "CustomAppointment"("appointmentSlotId");

-- AddForeignKey
ALTER TABLE "CustomAppointment" ADD CONSTRAINT "CustomAppointment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomAppointment" ADD CONSTRAINT "CustomAppointment_appointmentSlotId_fkey" FOREIGN KEY ("appointmentSlotId") REFERENCES "AppointmentSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomAppointment" ADD CONSTRAINT "CustomAppointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomAppointment" ADD CONSTRAINT "CustomAppointment_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
