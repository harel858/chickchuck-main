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
  try {
    const employee = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
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
