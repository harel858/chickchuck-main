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
      const name = business.user[i]?.name;
      const treatments = business.user[i]?.Treatment;
      const userId = business.user[i]?.id;
      if (!name || !treatments || !userId) return;

      UsersData.push({
        name,
        AvailableSlot: result,
        treatments,
        userId,
      });
    }
    console.log("UsersData", UsersData);

    return UsersData;
  } catch (err) {
    console.log(err);
  }
};
