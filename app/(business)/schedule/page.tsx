import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
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
dayjs.extend(customParseFormat);
export const revalidate = 60;

const fetchEvents = async (email: string | null | undefined) => {
  try {
    if (!email) return null;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Business: true },
    });
    const business = await prisma.business.findUnique({
      where: { id: user?.Business[0].id },
      include: { user: true },
    });
    if (!business) return null;

    const now = dayjs();

    //update appointments status
    const appointmentSlots = await prisma.appointmentSlot.findMany({
      where: { businessId: business.id },
      include: { appointments: true },
    });
    console.log(appointmentSlots);

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
        where: { userId: business?.user[0]?.id },
        include: {
          User: true,
          appointmentSlot: true,
          treatment: true,
          customer: true,
        },
      });
      appointments.push(...result);
    }
    console.log(appointments);

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
    console.log(events);

    const scheduleData: ScheduleData[] = business.user.map((user) => {
      console.log(user.id);

      return {
        user,
        events: events.filter((event) => user.id == event.userId),
      };
    });

    return { scheduleData, user } as ScheduleProps;
  } catch (err) {
    console.log(err);
  }
};

async function ScheduleListPage() {
  const session = await getServerSession();
  if (!session) return notFound();
  const scheduleProps = await fetchEvents(session?.user?.email);
  console.log(scheduleProps);

  if (!scheduleProps) return notFound();

  return <CalendarComponent scheduleProps={scheduleProps} />;
}

/* export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({ id: user.id.toString() }));

  return params;
} */

export default ScheduleListPage;
