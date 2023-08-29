import {
  User,
  AppointmentSlot,
  AvailableSlot,
  Treatment,
  Customer,
  AppointmentStatus,
  Business,
  Address,
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
  userId: string;
  recipient: {
    name: string;
    email: string;
    phone: string | null;
    startActivity: string;
    endActivity: string;
    activityDays: number[];
    UserRole: UserRole;
    isAdmin: boolean;
    PremiumKit: PremiumKits;
    businessId: string | null;
  };
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
  user: User & {
    Business: Business | null;
  };
  business: {
    openingTime: string;
    closingTime: string;
    activityDays: number[];
    address: Address | undefined;
  };
};

export type ActivityDay = {
  value: any;
  label: string;
};

export type VerificationData = {
  name: string;
  request_id: string;
  phoneNumber: string;
  code: string;
  bussinesId: string;
};

export type UserData = {
  name: string;
  AvailableSlot: AvailableSlot[];
  treatments: Treatment[];
  userId: string;
  activityDays: number[];
};

export type BusinessData = {
  usersData: UserData[];
  business: Business & {
    user: (User & {
      Treatment: Treatment[];
    })[];
    Customer: Customer[];
  };
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
  customerId: string | null | undefined;
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

export interface ActivityForm {
  startActivity: Dayjs;
  endActivity: Dayjs;
  activityDays: any[];
}

export interface ProfilePageData {
  business: Business & {
    Address: Address[];
  };
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  startActivity: string | null;
  endActivity: string | null;
  UserRole: UserRole;
  isAdmin: boolean;
  PremiumKit: PremiumKits;
}
export interface BusinessAddress {
  city: string;
  street: string;
  zipcode: string;
  businessId: string;
  userId: string;
}
export interface BusinessProps {
  openingTime: string;
  closingTime: string;
  activityDays: number[];
  address: Address | undefined;
}

export interface Inovice {
  id: string;
  invoice_no: string;
  balance: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  trans_date: string;
  due_date: string;
  items: {
    sno: number;
    desc: string;
    qty: number;
    rate: number;
  }[];
}

export interface InoviceItems {
  sno: number;
  desc: string;
  qty: number;
  rate: number;
}
export interface CreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  businessName: string;
}

export interface LandingPageData {
  Images: {
    backgroundImage: string;
    profileImage: string;
  } | null;
  businessName: string;
  phone: string;
  openingTime: string | null;
  closingTime: string | null;
  businessImage: string | null;
  activityDays: number[];
  Address: Address[];
}

export type CustomerItem = {
  BusinessId: string;
  blockedByBusiness: boolean;
  average_monthly_income: number;
  id: string;
  name: string;
  phoneNumber: string;
  UserRole: UserRole;
  appointments: (Appointment & {
    treatment: Treatment;
    appointmentSlot: AppointmentSlot;
  })[];
};

export type ServiceFormKeys = "title" | "cost" | "duration" | "document Name";
export type ErrorData = Record<ServiceFormKeys, boolean>;
