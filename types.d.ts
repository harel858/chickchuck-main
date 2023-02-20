export type User = {
  id: string;
  name: string;
  phone: string;
  businessName: string;
  email: string;
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
  createAt: string;
  appointmentTime: string;
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
