import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { signIn as userSignIn } from "./prisma/users";
import { getCustomer } from "./prisma/customer";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers

  adapter: PrismaAdapter(prisma),
  pages: { signIn: "/signin" },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "User Login",
      id: "User Login",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log(credentials);

          const { email, password } = credentials as any;

          const { user, error } = await userSignIn(email, password);
          console.log(user);

          if (error) throw new Error(error.message);

          return user;
        } catch (err) {
          console.log(err);

          return null;
        }
      },
    }),
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
      async authorize(credentials, req) {
        try {
          console.log(credentials);

          const { phoneNumber } = credentials as any;

          const { customer, getCustomerErr } = await getCustomer(phoneNumber);
          console.log(customer);

          if (getCustomerErr || !customer)
            throw new Error("Customer log in Fail");

          return customer;
        } catch (err) {
          console.log(err);

          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email! },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        UserRole: dbUser.UserRole,
      };
    },
    async session({ session, token, user }) {
      session.user = session.user ?? {};

      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.UserRole = token.UserRole;
        session.user.image = token.picture;
      }
      console.log(session);

      return session;
    },
  },
};
