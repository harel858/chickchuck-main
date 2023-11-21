"use server";
import { bussinessById } from "@lib/prisma/bussiness/getUnique";
import { createCustomer } from "@lib/prisma/customer/customer";
import validateCustomer from "@lib/validation/customer";
import { revalidatePath } from "next/cache";

interface InputData {
  name: string;
  phoneNumber: string;
  bussinesId: string;
}
export async function createNewCustomer({
  name,
  phoneNumber,
  bussinesId,
}: InputData) {
  try {
    console.log("bussinesId", bussinesId);

    const { error } = validateCustomer({
      name,
      phoneNumber,
      bussinesId,
    });
    if (error) throw new Error(error?.details[0]?.message);

    const business = await bussinessById(bussinesId);

    if (!business) throw new Error("business is not found");

    const matchingCustomer = business.Customer?.find(
      (customer) => customer.phoneNumber === phoneNumber
    );

    if (matchingCustomer)
      throw new Error(`User with this phone number is already existed`);

    const { newCustomer, createCustomerErr } = await createCustomer(
      name,
      phoneNumber,
      bussinesId
    );

    if (!newCustomer || createCustomerErr)
      throw new Error(`faild to create new customer`);

    revalidatePath("/schedule");
    return;
  } catch (err) {
    console.log(err);
    return;
  }
}
