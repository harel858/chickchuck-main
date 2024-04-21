/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppointmentSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvailableSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomAppointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AppointmentSlotToAvailableSlot` table. If the table is not empty, all the data it contains will be lost.

*/
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
ALTER TABLE "CustomAppointment" DROP CONSTRAINT "CustomAppointment_appointmentSlotId_fkey";

-- DropForeignKey
ALTER TABLE "CustomAppointment" DROP CONSTRAINT "CustomAppointment_businessId_fkey";

-- DropForeignKey
ALTER TABLE "CustomAppointment" DROP CONSTRAINT "CustomAppointment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "CustomAppointment" DROP CONSTRAINT "CustomAppointment_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentSlotToAvailableSlot" DROP CONSTRAINT "_AppointmentSlotToAvailableSlot_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentSlotToAvailableSlot" DROP CONSTRAINT "_AppointmentSlotToAvailableSlot_B_fkey";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "AppointmentSlot";

-- DropTable
DROP TABLE "AvailableSlot";

-- DropTable
DROP TABLE "CustomAppointment";

-- DropTable
DROP TABLE "_AppointmentSlotToAvailableSlot";
