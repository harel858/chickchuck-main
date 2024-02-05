import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { prisma } from ".";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export async function getAllUsers() {
  const users = await prisma?.user.findMany({});
  return { users };
}

export const getUserAccount = async (userId: string) => {
  try {
    const res = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: true,
        Treatment: true,
        activityDays: true,
        Customer: true,
        Business: { include: { Customer: true } },
      },
    });
    return res;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export async function getUserByEmail(emailORphoneNumber: string) {
  try {
    console.log("emailORphoneNumber", emailORphoneNumber);

    const userExist = await prisma?.user.findFirst({
      where: {
        OR: [
          { email: emailORphoneNumber.toLowerCase() },
          { phone: emailORphoneNumber },
        ],
      },
    });

    return userExist;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getIdByEmail(email: string) {
  try {
    const userExist = await prisma?.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return userExist?.id;
  } catch (err) {
    return null;
  }
}

export async function updateUserActivityTime(
  id: string,
  startActivity: string,
  endActivity: string,
  breaksId: string[]
) {
  try {
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        startActivity,
        endActivity,
        BreakTime: { connect: breaksId.map((item) => ({ id: item })) },
      },
    });
    const response = await prisma.user.findUnique({
      where: { id },
      select: { availableSlots: true },
    });
    return { response };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export async function getByBusinessName(businessName: any) {
  try {
    const userExist = await prisma?.business.findUnique({
      where: { businessName: businessName },
    });
    return { userExist };
  } catch (err) {
    return { err };
  }
}

export async function getById(id: any) {
  try {
    const userExist = await prisma?.user.findUnique({
      where: { id },
      include: { Business: true, BreakTime: true },
    });
    return { userExist };
  } catch (err) {
    return { err };
  }
}

export async function getAdminById(id: any) {
  try {
    const userExist = await prisma?.user.findUnique({
      where: { id },
      include: { Business: true },
    });
    if (userExist?.isAdmin) return userExist;
    return null;
  } catch (err) {
    console.log(err);

    return null;
  }
}

export async function signIn(emailORphoneNumber: string, pass: string) {
  if (!emailORphoneNumber || !pass)
    return {
      error: { message: `Check the details you provided are correct.` },
    };
  try {
    const userExist = await getUserByEmail(emailORphoneNumber);

    if (!userExist)
      return {
        error: { message: `User not found` },
      };
    let verify = await bcrypt.compare(pass, userExist.password!);

    if (!verify)
      return {
        error: { message: `password not verified` },
      };
    const { password, ...rest } = userExist;
    return { user: rest };
  } catch (err) {
    console.log(err);
    return {
      error: { message: `error with the function` },
    };
  }
}
const userOperations = {
  getUserByEmail,
  getAllUsers,
  getByBusinessName,
  getById,
  signIn,
  getAdminById,
  getUserAccount,
};
export default userOperations;
