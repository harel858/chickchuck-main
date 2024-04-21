import { prisma } from "..";

//  code to block a customer for a specific business
export async function blockCustomerForBusiness(
  customerId: string,
  businessId: string
) {
  try {
    // Unblock the customer for the specific business
    await prisma.customer.update({
      where: { id: customerId },
      data: {
        blockedByBusiness: {
          connect: { id: businessId },
        },
      },
    });

    return { success: "Customer blocked for the business." };
  } catch (error) {
    console.error(error);
    return { error: "Error unblocking the customer." };
  }
}

//  code to unblock a customer for a specific business
export async function unblockCustomerForBusiness(
  customerId: string,
  businessId: string
) {
  try {
    // Unblock the customer for the specific business
    await prisma.customer.update({
      where: { id: customerId },
      data: {
        blockedByBusiness: {
          disconnect: { id: businessId },
        },
      },
    });

    return { success: "Customer unblocked for the business." };
  } catch (error) {
    console.error(error);
    return { error: "Error unblocking the customer." };
  }
}

//  code to check if a customer is blocked for a specific business
export async function isCustomerBlockedForBusiness(
  customerId: string,
  businessId: string
) {
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: { blockedByBusiness: true },
  });

  if (!customer) {
    return false; // Customer not found
  }

  // Check if the business is in the list of blocked businesses
  const blockedByBusiness = customer.blockedByBusiness || [];
  return blockedByBusiness.some(
    (blockedBusiness) => blockedBusiness.id === businessId
  );
}
