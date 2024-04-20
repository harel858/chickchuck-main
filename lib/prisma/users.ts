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
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: true,
        Treatment: true,
        activityDays: true,
        Customer: true,
        Business: { include: { user: true, Customer: true, Treatment: true } },
      },
    });
    if (
      user?.UserRole === "TEAMMEATE" &&
      user?.accounts.length === 0 &&
      user.accountId
    ) {
      const account = await prisma.account.findUnique({
        where: { id: user?.accountId },
      });
      account && user.accounts.push(account);
    }
    return user;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export async function getById(userId: string) {
  try {
    const userExist = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: true,
        Treatment: true,
        activityDays: true,
        Customer: true,
        Business: { include: { user: true, Customer: true, Treatment: true } },
      },
    });
    return { userExist };
  } catch (err: any) {
    return { err };
  }
}

export async function getUserByPhone(emailORphoneNumber: string) {
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
export async function updateUserByPhone(phone: string, password: string) {
  try {
    console.log("phone", phone);

    const userUpdated = await prisma?.user.update({
      where: {
        phone,
      },
      data: { password },
    });

    return userUpdated;
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

export async function getAdminById(id: any) {
  try {
    const userExist = await prisma?.user.findUnique({
      where: { id },
      include: { Business: true, activityDays: true },
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
    const userExist = await getUserByPhone(emailORphoneNumber);

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
  getUserByPhone,
  getAllUsers,
  getByBusinessName,
  signIn,
  getAdminById,
  getUserAccount,
  getById,
};
export default userOperations;
