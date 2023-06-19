import { prisma } from "..";
import { BusinessAddress } from "../../../types/types";

interface AddressData {
  city: string;
  street: string;
  zipcode: string | null;
  bussinessId: string;
}

export const getBusinessAddress = async (businessId: string) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { businessId },
    });
    console.log(addresses);

    return addresses;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createBussinessAddress = async ({
  businessId,
  city,
  street,
  zipcode,
}: BusinessAddress) => {
  try {
    const addresses = await prisma.address.create({
      data: {
        city,
        street,
        zipcode,
        Business: { connect: { id: businessId } },
      },
    });
    console.log(addresses);

    return addresses;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateBussinessAddress = async (
  addressesId: string,
  city: string,
  street: string,
  zipcode: string | null
) => {
  try {
    const addresses = await prisma.address.update({
      where: { id: addressesId },
      data: {
        city,
        street,
        zipcode,
      },
    });
    console.log(addresses);

    return addresses;
  } catch (err) {
    console.log(err);
    return null;
  }
};
