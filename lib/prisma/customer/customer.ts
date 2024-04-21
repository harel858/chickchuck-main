import { Customer } from "@prisma/client";
import { prisma } from "..";

export const createCustomer = async (
  name: string,
  phoneNumber: string,
  bussinesId: string
) => {
  try {
    const newCustomer = await prisma.customer.create({
      data: { name, phoneNumber, Business: { connect: { id: bussinesId } } },
    });

    return { newCustomer };
  } catch (createCustomerErr) {
    console.log(createCustomerErr);

    return { createCustomerErr };
  }
};

export const getCustomer = async (phoneNumber: string, businessId: string) => {
  try {
    const existCustomer = await prisma.customer.findUnique({
      where: { phoneNumber: phoneNumber },
      include: {
        Business: true,
      },
    });

    // Check if relation exists with this business
    const exist = existCustomer?.Business.some(
      (item) => item.id === businessId
    );

    if (!exist) {
      // Create the relation with the business
      const updatedCustomer = await prisma.customer.update({
        where: { id: existCustomer?.id },
        data: {
          Business: {
            connect: { id: businessId },
          },
        },
      });

      return { existCustomer: updatedCustomer };
    }

    return { existCustomer };
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
