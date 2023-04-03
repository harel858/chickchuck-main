import React from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { notFound } from "next/navigation";
import prisma from "../../../../lib/prisma";
import { BusinessNameProps, AppointmentEvent } from "../../../../types";
import CalendarComponent from "./(calendar)/Calendar";
dayjs.extend(customParseFormat);
export const revalidate = 60;

const fetchEvents = async (businessName: string) => {
  console.log(`businessName:${businessName}`);

  try {
    const value = businessName
      .replace(/-/g, " ")
      .replace(/%20/g, " ")
      .replace(/%60/g, "`");
    console.log(`value:${value}`);

    const user = await prisma.user.findUnique({
      where: { businessName: value },
    });

    const appointments = await prisma.appointment.findMany({
      where: { userId: user?.id },
      include: {
        appointmentSlot: true,
        treatment: true,
        customer: true,
      },
    });
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
      return {
        id: appointment.id,
        start,
        end,
        date,
        text: appointment.treatment.title,
        color: "#007aff", // set a default color for all events
      };
    });

    return events as AppointmentEvent[];
  } catch (err) {
    console.log(err);
  }
};

async function ScheduleListPage({
  params: { businessName },
}: BusinessNameProps) {
  const events = await fetchEvents(businessName);
  console.log(events);

  if (!events) return notFound();
  console.log(events);

  return <CalendarComponent events={events} />;
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  const params = users?.map((user) => ({ id: user.id.toString() }));

  return params;
}

export default ScheduleListPage;
