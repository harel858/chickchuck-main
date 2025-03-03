import {
  User,
  AppointmentSlot,
  AvailableSlot,
  Treatment,
  Customer,
  AppointmentStatus,
  Business,
  Address,
  Appointment,
  Customer,
  AppointmentRequest,
} from "@prisma/client";
import { Dayjs } from "dayjs";
import { calendar_v3 } from "googleapis";

export type AllUsers = {
  id: string;
  name: string;
  phone: string;
  businessName: string;
  email: string;
  appointments: appointment[];
  treatment: treatment[];
};

export type RegularAppointment = {
  id: string;
  userId: string;
  recipient: {
    name: string;
    email: string | null;
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
  appointmentSlot: AppointmentSlot & {
    availableSlots: AvailableSlot[];
  };
  status: AppointmentStatus;
  color: string;
};
export type AppointmentEvent = RegularAppointment | CustomeEvents | CustomBreak;
export type CustomeEvents = {
  id: string;
  userId: string;
  title: string;
  recipient: {
    name: string;
    email: string | null;
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
  customer: Customer;
  appointmentSlot: AppointmentSlot & {
    availableSlots: AvailableSlot[];
  };
  status: AppointmentStatus;
  color: string;
};
export type ScheduleData = {
  events: AppointmentEvent[];
  customeEvents: CustomeEvents[];
  allbreaks: CustomBreak[];
  user: User;
};

export type CustomBreak = {
  id: string;
  userId: string;
  title: string;
  start: string;
  end: string;
  recipient: {
    id: string;
    name: string;
    email: string | null;
    phone: string;
    startActivity: string;
    endActivity: string;
    activityDays: number[];
    TypeOfWage: TypeOfWage;
    Wage: string | null;
    UserRole: UserRole;
    isAdmin: boolean;
    PremiumKit: PremiumKits;
    businessId: string;
  };
  date: string;
  appointmentSlot: AppointmentSlot & {
    availableSlots: AvailableSlot[];
  };
  status: string;
  variant: string;
  color: string;
};

export type ScheduleProps = {
  scheduleData: ScheduleData[];
  user: User & {
    Business: Business;
    Treatment: Treatment[];
  };
  business: {
    id: string;
    Customers: Customer[];
    openingTime: string;
    closingTime: string;
    activityDays: number[];
    address: Address | undefined;
  };
};

export type ActivityDay = {
  value: number;
  label: string;
  color: string;
};

export type VerificationData = {
  name: string;
  request_id: string;
  phoneNumber: string;
  fromDate: string;
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
  user: User & {
    Business: Business & {
      user: (User & {
        Treatment: Treatment[];
      })[];
      Customer: Customer[];
    };
    appointments: Appointment[];
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
  Images: any;
  Address: Address[];
  businessName: string;
  phone: string;
  businessImage: string | null;
  BusinessType: BusinessType;
  LastCalendar: LastCalendar;
  ComeFrom: ComeFrom;
  urls: string[];
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

export type ServiceFormKeys =
  | "title"
  | "cost"
  | "duration"
  | "document Name"
  | "advance Payment";
export type BasicFormKeys = "title" | "cost" | "duration";
export type AdvanceFormKeys = "document Name" | "advance Payment";
export type ErrorData = Record<ServiceFormKeys, boolean>;

export type ServiceFormData = Record<
  ServiceFormKeys,
  string | number | RequiredDocument[]
>;
export type CreateUserFormKey =
  | "name"
  | "phone Number"
  | "password"
  | "confirm password";

export type CreateUserForm = Record<CreateUserFormKey, string>;

export type UserFileFormKey = "salary" | "phone Number";

export type UserFileFormData = {
  salary: string | null;
  "phone Number": string;
  email: string;
  services: Treatment[];
};

export type TeamData = {
  business: Business & {
    user: (User & {
      Treatment: Treatment[];
    })[];
  };
};

export type TeamPageParams = Business & {
  BreakTime: BreakTime[];
  user: (User & {
    BreakTime: BreakTime[];
    Treatment: Treatment[];
  })[];
  Treatment: Treatment[];
};

export interface Notification {
  userId: string;
  type: string; // or other notification types like "appointment", "message", "event", etc.
  timestamp: string; // ISO 8601 format
  content: string; //"You have a new appointment with Dr. Smith on October 15, 2023, at 2:30 PM.";
  appointmentId: string;
  // Other relevant appointment details
  read: boolean; // Indicates whether the user has read the notification
}

export interface NotificationData {
  notification: Notification;
  appointment: Appointment & {
    customer: Customer;
    treatment: Treatment;
    appointmentSlot: AppointmentSlot;
  };
}

export type EditProps = {
  EndTime: string;
  ExtendedProperties: {
    private: {
      customerId: string;
      treatmentId: string;
    };
  };
  Guid: string;
  Id: string;
  IsAllDay: boolean;
  StartTime: string;
  Subject: string;
  descripition: string;
  status: string;
};

export type EditEventProps = {
  EndTime: string;
  ExtendedProperties: {
    private: {
      customerId: string;
      treatmentId: string;
    };
  };
  Guid: string;
  Id: string;
  IsAllDay: boolean;
  StartTime: string;
  Subject: string;
  description: string;
  status: string;
};
export type UpdateEventProps = {
  summary: string | undefined;
  description: string | undefined;
  start: {
    dateTime: Date;
    timeZone: string;
  };
  end: {
    dateTime: Date;
    timeZone: string;
  };
  extendedProperties: {
    private: {
      treatmentId: string;
      customerId: string;
    };
  };
};

export type CombinedEvent =
  | calendar_v3.Schema$Event
  | (AppointmentRequest & {
      treatment: Treatment;
      customer: Customer;
      user: User;
    });
