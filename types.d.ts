import {
  AppointmentSlot,
  AvailableSlot,
  Treatment,
  Customer,
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
  start: string;
  end: string;
  date: string;
  text: string;
  color: string;
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
  availableSlot: AvailableSlot[];
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
  customer: Customer | null;
  userData: UserData;
  availableSlot: AvailableSlot[];
  date: Dayjs;
};
