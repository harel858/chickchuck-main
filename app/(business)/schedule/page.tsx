import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { notFound } from "next/navigation";
import { prisma } from "@lib/prisma";
import { ScheduleData } from "../../../types/types";
import { getServerSession } from "next-auth";
import CalendarComponent from "@ui/(calendar)/Calendar";
import {
  Appointment,
  AppointmentSlot,
  AvailableSlot,
  Break,
  Business,
  CustomAppointment,
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
      include: { Business: true, Treatment: true },
    });
    if (!user?.Business) return null;

    const business = await prisma.business.findUnique({
      where: { id: user?.Business.id },
      include: { user: true, Address: true, Customer: true },
    });
    if (!business) return null;

    const now = dayjs();

    //update appointments status
    const appointmentSlots = await prisma.appointmentSlot.findMany({
      where: { businessId: business.id },
      include: { appointments: true, CustomAppointment: true },
    });

    if (user && appointmentSlots) {
      for (let i = 0; i < appointmentSlots.length; i++) {
        const slotDate = appointmentSlots[i]?.date;
        const slotEnd = appointmentSlots[i]?.end;

        // Check if slotDate and slotEnd are valid string values
        if (
          slotDate !== undefined &&
          typeof slotEnd === "string" &&
          slotEnd.includes(":")
        ) {
          const slotEndParts = slotEnd.split(":");
          const slotEndHour = slotEndParts[0] && parseInt(slotEndParts[0]);
          const slotEndMinute = slotEndParts[1] && parseInt(slotEndParts[1]);

          const slotEndTime =
            slotEndHour &&
            slotEndMinute &&
            dayjs(slotDate, "DD/MM/YYYY")
              .hour(slotEndHour)
              .minute(slotEndMinute);

          if (
            now.isAfter(slotEndTime) &&
            appointmentSlots[i]?.appointments[0]?.status === "SCHEDULED"
          ) {
            await prisma.appointment.update({
              where: { appointmentSlotId: appointmentSlots[i]?.id },
              data: { status: "COMPLETED" },
            });
          }
        }
      }
    }
    let appointments: (Appointment & {
      User: User;
      customer: Customer;
      appointmentSlot: AppointmentSlot & {
        availableSlots: AvailableSlot[];
      };
      treatment: Treatment;
    })[] = [];
    let customAppointments: (CustomAppointment & {
      customer: Customer;
      appointmentSlot: AppointmentSlot & {
        availableSlots: AvailableSlot[];
      };
      User: User;
    })[] = [];
    let breakArr: (Break & {
      user: User;
      business: Business;
      appointmentSlot: AppointmentSlot & {
        availableSlots: AvailableSlot[];
      };
    })[] = [];
    for (let i = 0; i < business?.user.length!; i++) {
      const result = await prisma.appointment.findMany({
        where: { userId: business?.user[i]?.id },
        include: {
          User: true,
          appointmentSlot: { include: { availableSlots: true } },
          treatment: true,
          customer: true,
        },
      });
      const custom = await prisma.customAppointment.findMany({
        where: { userId: business?.user[i]?.id },
        include: {
          User: true,
          appointmentSlot: { include: { availableSlots: true } },
          customer: true,
        },
      });
      const breaks = await prisma.break.findMany({
        where: { userId: business?.user[i]?.id },
        include: {
          appointmentSlot: { include: { availableSlots: true } },
          user: true,
          business: true,
        },
      });

      customAppointments.push(...custom);
      appointments.push(...result);
      breakArr.push(...breaks);
    }
    //return the events of the user
    const events = appointments.map((appointment) => {
      const { User } = appointment;
      const { password, ...rest } = User;
      const slotStart = appointment.appointmentSlot.start;
      const slotEnd = appointment.appointmentSlot.end;
      const slotDate = appointment.appointmentSlot.date;
      const startHour = slotStart.split(":")[0];
      const startMinute = slotStart.split(":")[1];
      const endHour = slotEnd.split(":")[0];
      const endMinute = slotEnd.split(":")[1];

      // Check if slotStart, slotEnd, and slotDate are valid string values
      const start = dayjs(slotDate, "DD/MM/YYYY")
        .hour(parseInt(startHour!))
        .minute(parseInt(startMinute!))
        .toISOString();
      const end = dayjs(slotDate, "DD/MM/YYYY")
        .hour(parseInt(endHour!))
        .minute(parseInt(endMinute!))
        .toISOString();
      const date = dayjs(slotDate, "DD/MM/YYYY").format("DD/MM/YYYY");

      const color =
        appointment.status === "SCHEDULED"
          ? "bg-green-600"
          : appointment.status === "CANCELLED"
          ? "bg-red-600"
          : "bg-yellow-500";

      return {
        id: appointment.id,
        userId: User.id,
        recipient: rest,
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

    //return the events of the user
    const customeEvents = customAppointments.map((appointment) => {
      const { User } = appointment;
      const { password, ...rest } = User;
      const slotStart = appointment.appointmentSlot.start;
      const slotEnd = appointment.appointmentSlot.end;
      const slotDate = appointment.appointmentSlot.date;
      const startHour = slotStart.split(":")[0];
      const startMinute = slotStart.split(":")[1];
      const endHour = slotEnd.split(":")[0];
      const endMinute = slotEnd.split(":")[1];

      // Check if slotStart, slotEnd, and slotDate are valid string values
      const start = dayjs(slotDate, "DD/MM/YYYY")
        .hour(parseInt(startHour!))
        .minute(parseInt(startMinute!))
        .toISOString();
      const end = dayjs(slotDate, "DD/MM/YYYY")
        .hour(parseInt(endHour!))
        .minute(parseInt(endMinute!))
        .toISOString();
      const date = dayjs(slotDate, "DD/MM/YYYY").format("DD/MM/YYYY");

      const color =
        appointment.status === "SCHEDULED"
          ? "bg-green-600"
          : appointment.status === "CANCELLED"
          ? "bg-red-600"
          : "bg-yellow-500";

      return {
        id: appointment.id,
        userId: User.id,
        title: appointment.Title,
        recipient: rest,
        start,
        end,
        date,
        customer: appointment.customer,
        appointmentSlot: appointment.appointmentSlot,
        status: appointment.status,
        color, // set a default color for all events
      };
    });
    //return the events of the user
    const allbreaks = breakArr.map((breakItem) => {
      const { user } = breakItem;
      const { password, ...rest } = user;
      const slotStart = breakItem.appointmentSlot.start;
      const slotEnd = breakItem.appointmentSlot.end;
      const slotDate = breakItem.appointmentSlot.date;
      const startHour = slotStart.split(":")[0];
      const startMinute = slotStart.split(":")[1];
      const endHour = slotEnd.split(":")[0];
      const endMinute = slotEnd.split(":")[1];

      // Check if slotStart, slotEnd, and slotDate are valid string values
      const start = dayjs(slotDate, "DD/MM/YYYY")
        .hour(parseInt(startHour!))
        .minute(parseInt(startMinute!))
        .toISOString();
      const end = dayjs(slotDate, "DD/MM/YYYY")
        .hour(parseInt(endHour!))
        .minute(parseInt(endMinute!))
        .toISOString();
      const date = dayjs(slotDate, "DD/MM/YYYY").format("DD/MM/YYYY");

      const color = "bg-blue-500/50";

      return {
        id: breakItem.id,
        userId: user.id,
        title: "break",
        recipient: rest,
        start,
        end,
        date,
        appointmentSlot: breakItem.appointmentSlot,
        status: "",
        variant: "BREAK",
        color, // set a default color for all events
      };
    });

    // Cast the result to AppointmentEvent[];
    const scheduleData: ScheduleData[] = business.user.map((user) => {
      return {
        user: { ...user, profileSrc: null },
        events: events.filter((event) => event && user.id === event.userId), // Filter events for the specific user
        customeEvents: customeEvents.filter(
          (event) => event && user.id === event.userId
        ), // Filter events for the specific user
        allbreaks: allbreaks.filter(
          (event) => event && user.id === event.userId
        ),
      };
    });

    return {
      scheduleData,
      user,
      business: {
        id: business.id,
        openingTime: business.openingTime,
        closingTime: business.closingTime,
        activityDays: business.activityDays,
        Customers: business.Customer,
        address: business.Address[0],
      },
    };
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
