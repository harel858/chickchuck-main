import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { CreateUser } from "types/types";
import { prisma } from ".";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export async function getAllUsers() {
  const users = await prisma?.user.findMany({});
  return { users };
}

export async function createUser({
  name,
  email,
  phone,
  password,
  businessName,
}: CreateUser) {
  const openingTime = dayjs().set("hour", 9).set("minute", 0).set("second", 0);
  const closingTime = dayjs().set("hour", 17).set("minute", 0).set("second", 0);

  try {
    const newBusiness = await prisma.business.create({
      data: {
        businessName,
        activityDays: [0, 1, 2, 3, 4, 5],
        phone,
        openingTime: openingTime.toISOString(),
        closingTime: closingTime.toISOString(),
      },
    });
    const newUser = await prisma?.user.create({
      data: {
        name,
        email: email.toLocaleLowerCase(),
        phone,
        startActivity: openingTime.toISOString(),
        endActivity: closingTime.toISOString(),
        activityDays: [0, 1, 2, 3, 4, 5],
        password,
        isAdmin: true,
        Business: { connect: { businessName: newBusiness.businessName } },
      },
    });

    if (newBusiness && newUser) return newUser.id;
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
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

export async function updateActivityTime(
  id: string,
  startActivity: string,
  endActivity: string
) {
  try {
    const updated = await prisma.business.update({
      where: {
        id,
      },
      data: {
        openingTime: startActivity,
        closingTime: endActivity,
      },
    });
    const response = await prisma.business.findUnique({
      where: { id },
      select: { user: true },
    });
    return { response };
  } catch (error) {
    console.log(error);
    return { error };
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
export async function updateActivityDays(id: string, activityDays: number[]) {
  try {
    const updateDaysSuccess = await prisma.business.update({
      where: {
        id,
      },
      data: {
        activityDays,
      },
    });

    return { updateDaysSuccess };
  } catch (updateDaysFailed) {
    console.log(updateDaysFailed);
    return { updateDaysFailed };
  }
}

export async function updateUserActivityDays(
  id: string,
  activityDays: number[]
) {
  try {
    const updateDaysSuccess = await prisma.user.update({
      where: {
        id,
      },
      data: {
        activityDays,
      },
    });

    return { updateDaysSuccess };
  } catch (updateDaysFailed) {
    console.log(updateDaysFailed);
    return { updateDaysFailed };
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
    let verify = await bcrypt.compare(pass, userExist.password);

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
  createUser,
  getUserByEmail,
  getAllUsers,
  updateActivityTime,
  updateActivityDays,
  getByBusinessName,
  getById,
  signIn,
  getAdminById,
};
export default userOperations;
