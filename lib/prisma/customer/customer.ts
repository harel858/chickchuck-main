import { prisma } from "..";

export const createCustomer = async (
  name: string,
  phoneNumber: string,
  bussinesId: string
) => {
  try {
    const newCustomer = await prisma.business.update({
      where: { id: bussinesId },
      data: {
        Customer: {
          create: {
            name,
            phoneNumber,
          },
        },
      },
    });

    return { newCustomer };
  } catch (createCustomerErr) {
    console.log(createCustomerErr);

    return { createCustomerErr };
  }
};

export const getCustomer = async (phoneNumber: string, businessId: string) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { phoneNumber },
      select: {
        appointments: true,
        id: true,
        name: true,
        phoneNumber: true,
        UserRole: true,
        Business: true,
      },
    });

    if (!customer) {
      return { error: "Customer not found" };
    }

    // Check if relation exists with this business
    const exist = customer.Business.some((item) => item.id === businessId);

    if (!exist) {
      // Create the relation with the business
      const updatedCustomer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          Business: {
            connect: { id: businessId },
          },
        },
      });

      return { customer: updatedCustomer };
    }

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

    return { updatedcustomer };
  } catch (updateCustomerErr) {
    console.log(updateCustomerErr);

    return { updateCustomerErr };
  }
};
