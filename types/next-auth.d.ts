/* eslint-disable no-unused-vars */
import type { User, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    UserRole: "CUSTOMER" | "RECIPIENT";
    phoneNumber: string | null;
    urls: {
      backgroundImage: string;
      profileImage: string;
    } | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      UserRole: "CUSTOMER" | "RECIPIENT";
      urls: {
        backgroundImage: string;
        profileImage: string;
      } | null;
    };
  }
}
