import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { signIn as userSignIn } from "./prisma/users";
import { getCustomer } from "./prisma/customer";
import { getImage } from "./aws/s3";

interface UserCredentials {
  email: string;
  password: string;
}

interface CustomerCredentials {
  phoneNumber: string;
}
const bucketName = process.env.BUCKET_NAME!;

const authorizeUserLogin = async (credentials: any, req: any) => {
  try {
    const { email, password } = credentials as UserCredentials;

    const { user, error } = await userSignIn(email, password);

    if (error) throw new Error(error.message);

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const authorizeCustomerLogin = async (credentials: any, req: any) => {
  try {
    const { phoneNumber } = credentials as CustomerCredentials;
    const { customer, getCustomerErr } = await getCustomer(phoneNumber);

    if (getCustomerErr || !customer) throw new Error("Customer log in Fail");

    return customer;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const configureUserLoginProvider = () =>
  CredentialsProvider({
    name: "User Login",
    id: "User Login",
    credentials: {
      email: { label: "Email", type: "text", placeholder: "Email" },
      password: { label: "Password", type: "password" },
    },
    authorize: authorizeUserLogin,
  });

const configureCustomerLoginProvider = () =>
  CredentialsProvider({
    name: "Customer Login",
    id: "Customer Login",
    credentials: {
      phoneNumber: {
        label: "Phone Number",
        type: "text",
        placeholder: "Phone Number",
      },
    },
    authorize: authorizeCustomerLogin,
  });

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: { signIn: "/signin" },
  providers: [configureUserLoginProvider(), configureCustomerLoginProvider()],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
        include: { Business: true },
      });
      const dbCustomer = await prisma.customer.findUnique({
        where: { id: token.sub },
      });
      if (dbUser) {
        const business = await prisma.business.findUnique({
          where: { id: dbUser?.Business?.id },
          include: { Images: true },
        });
        let urls: {
          backgroundImage: string;
          profileImage: string;
        } | null = null;
        if (business?.Images) {
          const params = {
            Bucket: bucketName,
            Key: {
              profileImgName: business.Images.profileImgName,
              backgroundImgName: business.Images.backgroundImgName,
            },
          };
          const res = await getImage(params);
          urls = res;
        }
        return {
          ...token,
          urls: urls,
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          UserRole: dbUser.UserRole,
        };
      } else if (dbCustomer) {
        return {
          ...token,
          id: dbCustomer.id,
          name: dbCustomer.name,
          phoneNumber: dbCustomer.phoneNumber,
          UserRole: dbCustomer.UserRole,
          urls: null,
        };
      }

      token.id = user!.id;
      return token;
    },
    async session({ session, token, user }) {
      if (token && token.id) {
        session.user = token;
      }

      return session;
    },
  },
};
