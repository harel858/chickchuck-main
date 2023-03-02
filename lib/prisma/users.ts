import prisma from ".";
import bcrypt from "bcrypt";

export async function getAllUsers() {
  const users = await prisma?.user.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      businessName: true,
      email: true,
      appointments: true,
      treatment: true,
    },
  });
  return { users };
}

export async function createUser(data: any) {
  try {
    const newUser = await prisma?.user.create({
      data: { ...data, activityDays: [0, 1, 2, 3, 4, 5], slotDuration: 15 },
    });
    return { newUser };
  } catch (err) {
    return { err };
  }
}

export async function getByEmail(email: string) {
  try {
    const userExist = await prisma?.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        name: true,
        phone: true,
        businessName: true,
        activityDays: true,
        endActivity: true,
        startActivity: true,
        email: true,
        appointments: true,
        treatment: true,
        availableSlots: true,
      },
    });
    return { userExist };
  } catch (err) {
    return { err };
  }
}
export async function updateActivityTime(
  id: string,
  startActivity: string,
  endActivity: string
) {
  try {
    const response = await prisma.user.update({
      where: {
        id,
      },
      data: {
        startActivity,
        endActivity,
      },
    });
    console.log(response);

    return { response };
  } catch (error) {
    console.log(error);
    return { error };
  }
}
export async function updateActivityDays(id: string, activityDays: number[]) {
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
    const userExist = await prisma?.user.findUnique({
      where: { businessName: businessName },
      select: {
        name: true,
        phone: true,
        id: true,
        email: true,
        appointments: true,
        treatment: true,
        businessName: true,
      },
    });
    console.log(userExist);
    return { userExist };
  } catch (err) {
    return { err };
  }
}

export async function getById(id: any) {
  try {
    const userExist = await prisma?.user.findUnique({
      where: { id },
      select: {
        name: true,
        phone: true,
        id: true,
        activityDays: true,
        email: true,
        appointments: true,
        treatment: true,
        businessName: true,
      },
    });
    return { userExist };
  } catch (err) {
    return { err };
  }
}

export async function signIn(email: any, password: any) {
  if (!email || !password)
    return {
      error: { message: `Check the details you provided are correct.` },
    };
  try {
    const { userExist, err } = await getByEmail(email);

    if (!userExist || err)
      return {
        error: { message: `Check the details you provided are correct.` },
      };
    console.log(userExist);
    let pass = await bcrypt.compare(password, userExist.password);
    if (!pass)
      return {
        error: { message: `Check the details you provided are correct.` },
      };
    return { user: { ...userExist } };
  } catch (err) {
    console.log(err);
    return {
      error: { message: `Check the details you provided are correct.` },
    };
  }
}
