import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { notFound } from "next/navigation";
import { prisma } from "@lib/prisma";
import { ScheduleData, ScheduleProps } from "../../../types/types";
import { getServerSession } from "next-auth";
import CalendarComponent from "@ui/(calendar)/Calendar";
import {
  Appointment,
  AppointmentSlot,
  Customer,
  Treatment,
  User,
} from "@prisma/client";
import { authOptions } from "@lib/auth";
dayjs.extend(customParseFormat);
export const revalidate = 60;

const fetchEvents = async (id: string | null | undefined) => {
  try {
    if (!id) return null;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { Business: true },
    });
    const business = await prisma.business.findUnique({
      where: { id: user?.Business[0].id },
      include: { user: true, Address: true },
    });
    if (!business) return null;

    const now = dayjs();

    //update appointments status
    const appointmentSlots = await prisma.appointmentSlot.findMany({
      where: { businessId: business.id },
      include: { appointments: true },
    });

    if (user && appointmentSlots) {
      for (let i = 0; i < appointmentSlots.length; i++) {
        const slotEnd = dayjs(appointmentSlots[i].date, "DD/MM/YYYY")
          .hour(parseInt(appointmentSlots[i].end.split(":")[0]))
          .minute(parseInt(appointmentSlots[i].end.split(":")[1]));

        if (
          now.isAfter(slotEnd) &&
          appointmentSlots[i].appointments[0].status === "SCHEDULED"
        ) {
          await prisma.appointment.update({
            where: { appointmentSlotId: appointmentSlots[i].id },
            data: { status: "COMPLETED" },
          });
        }
      }
    }
    let appointments: (Appointment & {
      User: User;
      customer: Customer;
      appointmentSlot: AppointmentSlot;
      treatment: Treatment;
    })[] = [];
    for (let i = 0; i < business?.user.length!; i++) {
      const result = await prisma.appointment.findMany({
        where: { userId: business?.user[i]?.id },
        include: {
          User: true,
          appointmentSlot: true,
          treatment: true,
          customer: true,
        },
      });

      appointments.push(...result);
    }

    //return the events of the user
    const events = appointments.map((appointment) => {
      const start = dayjs(appointment.appointmentSlot.date, "DD/MM/YYYY")
        .hour(parseInt(appointment.appointmentSlot.start.split(":")[0]))
        .minute(parseInt(appointment.appointmentSlot.start.split(":")[1]))
        .toISOString();
      const end = dayjs(appointment.appointmentSlot.date, "DD/MM/YYYY")
        .hour(parseInt(appointment.appointmentSlot.end.split(":")[0]))
        .minute(parseInt(appointment.appointmentSlot.end.split(":")[1]))
        .toISOString();
      const date = dayjs(appointment.appointmentSlot.date, "DD/MM/YYYY").format(
        "DD/MM/YYYY"
      );

      const color =
        appointment.status === "SCHEDULED"
          ? "bg-green-600"
          : appointment.status === "CANCELLED"
          ? "bg-red-600"
          : "bg-yellow-500";

      return {
        userId: appointment.User.id,
        id: appointment.id,
        start,
        end,
        date,
        treatment: appointment.treatment,
        customer: appointment.customer,
        appointmentSlot: appointment.appointmentSlot,
        status: appointment.status,
        color, // set a default color for all events
      };
    });

    const scheduleData: ScheduleData[] = business.user.map((user) => {
      return {
        user: { ...user, profileSrc: null },
        events: events.filter((event) => user.id == event.userId),
      };
    });

    return {
      scheduleData,
      user,
      business: {
        openingTime: business.openingTime,
        closingTime: business.closingTime,
        activityDays: business.activityDays,
        address: business.Address[0],
      },
    } as ScheduleProps;
  } catch (err) {
    console.log(err);
  }
};

async function ScheduleListPage() {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  const scheduleProps = await fetchEvents(session?.user?.id);

  if (!scheduleProps) return notFound();

  return <CalendarComponent scheduleProps={scheduleProps} />;
}

/* export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({ id: user.id.toString() }));

  return params;
} */

export default ScheduleListPage;
