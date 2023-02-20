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
    const newUser = await prisma?.user.create({ data });
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
        email: true,
        appointments: true,
        treatment: true,
      },
    });
    return { userExist };
  } catch (err) {
    return { err };
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
