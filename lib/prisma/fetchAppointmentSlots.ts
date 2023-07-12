import { prisma } from ".";
import { UserData } from "../../types/types";

export const fetchAppointmentSlots = async (businessName: string) => {
  try {
    const value = businessName.replace(/-/g, " ").replace(/%60/g, "`");

    const business = await prisma.business.findUnique({
      where: { businessName: value },
      include: { user: { include: { Treatment: true } } },
    });
    if (!business) return null;
    let UsersData: UserData[] = [];
    for (let i = 0; i < business.user.length; i++) {
      let result = await prisma.availableSlot.findMany({
        where: {
          userId: business.user[i]?.id, // Replace with the ID of the user/business you want to book an appointment with
        },
        orderBy: [{ start: "asc" }],
      });
      UsersData.push({
        name: business.user[i].name,
        AvailableSlot: result,
        treatments: business.user[i].Treatment,
        userId: business.user[i].id,
      });
    }

    return UsersData;
  } catch (err) {
    console.log(err);
  }
};
