import {
  User,
  AppointmentSlot,
  AvailableSlot,
  Treatment,
  Customer,
  AppointmentStatus,
} from "@prisma/client";
import { Dayjs } from "dayjs";

export type AllUsers = {
  id: string;
  name: string;
  phone: string;
  businessName: string;
  email: string;
  appointments: appointment[];
  treatment: treatment[];
};

export type AppointmentEvent = {
  id: string;
  start: string;
  end: string;
  date: string;
  treatment: Treatment;
  customer: Customer;
  appointmentSlot: AppointmentSlot;
  status: AppointmentStatus;
  color: string;
};
export type ScheduleData = {
  events: AppointmentEvent[];
  user: User;
};

export type ScheduleProps = {
  scheduleData: ScheduleData[];
  user: User;
  business: {
    openingTime: string;
    closingTime: string;
    activityDays: number[];
  };
};

export type ActivityDay = {
  value: number;
  label: string;
};

export type formData = {
  name: string;
  request_id: string;
  phoneNumber: string;
  code: string;
};

export type UserData = {
  name: string;
  AvailableSlot: AvailableSlot[];
  treatments: Treatment[];
  userId: string;
};

export type Slots = {
  start: string;
  end: string;
};
export type SessionData = {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    businessName: string;
  };
  expires: string;
};

export type pagesProps = {
  params: { businessName: string };
};
export type BusinessNameProps = {
  params: { businessName: string };
};

export type UserProps = {
  user: User;
};

export type AppointmentInput = {
  treatment: Treatment | null;
  user: UserData | null;
  availableSlot: AvailableSlot[];
  date: Dayjs;
};

export type NavBarProps = {
  Business: Business | undefined;
  id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  phone?: string | null | undefined;
  profileSrc?: string | undefined;
  isAdmin?: boolean | undefined;
  PremiumKit?: PremiumKits | undefined;
};

export default interface StepOne {
  name: string;
  phoneNumber: string;
}
