import { prisma } from "..";

export async function updateCustomerByPhone(phone: string, password: string) {
  try {
    console.log("userUpdated", "userUpdated");

    const userUpdated = await prisma?.customer.update({
      where: {
        phoneNumber: phone,
      },
      data: { password },
    });
    console.log("userUpdated", userUpdated);

    return userUpdated;
  } catch (err) {
    console.error(err);
    return null;
  }
}
