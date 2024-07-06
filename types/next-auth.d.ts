import { AppointmentRequest, UserRole } from "@prisma/client";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    refresh_token: string;
    user: User;
    access_token: string;
    businessName: string;
    logo: string;
    isAdmin: boolean;
    businessId: string;
    UserRole: UserRole | null;
    accountId: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      access_token: string;
      businessName: string;
      image: string;
      isAdmin: boolean;
      businessId: string;
      UserRole: UserRole | null;
      accountId: string;
    };
  }
}
