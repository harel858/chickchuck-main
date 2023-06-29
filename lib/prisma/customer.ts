import { prisma } from ".";

export const createCustomer = async (name: string, phoneNumber: string) => {
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        phoneNumber,
      },
    });
    console.log("newCustomer", newCustomer);

    return { newCustomer };
  } catch (createCustomerErr) {
    console.log(createCustomerErr);

    return { createCustomerErr };
  }
};

export async function customerSignIn(phoneNumber: string) {
  try {
  } catch (err) {}
}

export const getCustomer = async (phoneNumber: string) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { phoneNumber },
      select: {
        appointments: true,
        id: true,
        name: true,
        phoneNumber: true,
        UserRole: true,
      },
    });

    return { customer };
  } catch (getCustomerErr) {
    console.log(getCustomerErr);

    return { getCustomerErr };
  }
};

export const updateCustomer = async (name: string, phoneNumber: string) => {
  try {
    const updatedcustomer = await prisma.customer.update({
      where: { phoneNumber },
      data: { name },
    });
    console.log(updatedcustomer);

    return { updatedcustomer };
  } catch (updateCustomerErr) {
    console.log(updateCustomerErr);

    return { updateCustomerErr };
  }
};
