import dayjs from "dayjs";
import { prisma } from "..";

interface Employee {
  name: string;
  email: string;
  password: string;
  isAdmin: string;
  businessId: string;
  bussinessName: string;
}

export async function createEmployee(data: Employee) {
  const openingTime = dayjs().set("hour", 9).set("minute", 0).set("second", 0);
  const closingTime = dayjs().set("hour", 17).set("minute", 0).set("second", 0);

  try {
    const employee = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        startActivity: openingTime.toISOString(),
        endActivity: closingTime.toISOString(),
        activityDays: [0, 1, 2, 3, 4, 5],
        password: data.password,
        isAdmin: false,
        Business: {
          connect: { id: data.businessId, businessName: data.bussinessName },
        },
      },
    });

    return { employee };
  } catch (err) {
    console.log(err);

    return { err };
  }
}
