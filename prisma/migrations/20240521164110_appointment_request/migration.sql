-- CreateTable
CREATE TABLE "AppointmentRequest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "treatmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AppointmentRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
