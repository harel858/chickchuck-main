"use server";

import { prisma } from "@lib/prisma";

export default async function findUserByPhone(phone: string) {
  try {
    const user = await prisma.user.findUnique({ where: { phone: phone } });
    return user;
  } catch (err: any) {
    console.log("err", err);
    throw new Error(err);
  }
}
