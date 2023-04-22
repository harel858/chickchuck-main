import prisma from ".";
import bcrypt from "bcrypt";

export async function getAllUsers() {
  const users = await prisma?.user.findMany({});
  return { users };
}

export async function createUser({
  name,
  email,
  password: hashedPassword,
  businessName,
}: {
  name: string;
  email: string;
  password: string;
  businessName: string;
}) {
  try {
    const newUser = await prisma?.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
      },
    });

    const newBusiness = await prisma.business.create({
      data: {
        businessName,
        activityDays: [0, 1, 2, 3, 4, 5],
        user: { connect: { id: newUser.id } },
      },
    });

    return { newUser };
  } catch (err) {
    console.log(err);

    return { err };
  }
}

export async function getByEmail(email: string) {
  try {
    const userExist = await prisma?.user.findUnique({
      where: { email },
    });
    return { userExist };
  } catch (err) {
    return { err };
  }
}

export async function updateActivityTime(
  id: string,
  startActivity: string,
  endActivity: string,
  duration: number
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

export async function getByBusinessName(businessName: any) {
  try {
    const userExist = await prisma?.business.findUnique({
      where: { businessName: businessName },
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
      include: { Business: true },
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
