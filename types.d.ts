export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  city: string | null;
  street: string | null;
  businessName: string;
  appointments: [
    {
      id: string;
      name: string;
      phoneNumber: string;
      createAt: string;
      appointmentTime: string;
      businessId: string;
      treatmentId: string;
    }
  ];
  treatment: [
    {
      id: string;
      title: string;
      cost: string;
      duration: string;
      businessId: string;
    }
  ];
  activityDays: number[]; // Define an array of integers field
  startActivity: string | null; // Define start activity field
  endActivity: string | null;
};

export type AllUsers = {
  id: string;
  name: string;
  phone: string;
  businessName: string;
  email: string;
  appointments: appointment[];
  treatment: treatment[];
};
export type AvailableSlot = {
  id: string;
  start: Dayjs;
  end: Dayjs;
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
export type IdProps = {
  params: { id: string };
};

export type UserProps = {
  user: User;
};

export type treatment = {
  id: string;
  title: string;
  duration: string;
  cost: string;
  businessId: string;
};

export type appointment = {
  id: string;
  name: string;
  phoneNumber: string;
  createAt: Date;
  start: Date;
  business: User;
  treatment: treatment[];
  businessId: string;
  treatmentId: string;
  treatment: [
    {
      id: string;
      title: string;
      cost: string;
      duration: string;
      businessId: string;
    }
  ];
};
