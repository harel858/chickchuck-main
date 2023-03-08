import prisma from ".";

export const createCustomer = async (name: string, phoneNumber: string) => {
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        phoneNumber,
      },
    });
    console.log(newCustomer);

    return { newCustomer };
  } catch (createCustomerErr) {
    console.log(createCustomerErr);

    return { createCustomerErr };
  }
};

export const getCustomer = async (phoneNumber: string) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { phoneNumber },
      select: { appointments: true, id: true, name: true, phoneNumber: true },
    });
    console.log(customer);

    return { customer };
  } catch (getCustomerErr) {
    console.log(getCustomerErr);

    return { getCustomerErr };
  }
};
