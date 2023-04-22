import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import { signIn } from "../../../lib/prisma/users";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers

  adapter: PrismaAdapter(prisma),
  pages: { signIn: "/signin" },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log(credentials);

          const { email, password } = credentials as any;

          const { user, error } = await signIn(email, password);
          console.log(user);

          if (error) throw new Error(error.message);

          return user;
        } catch (err) {
          console.log(err);

          return null;
        }

        // Add logic here to look up the user from the credentials supplied

        // Any object returned will be saved in `user` property of the JWT

        // If you return null then an error will be displayed advising the user to check their details.

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },

  callbacks: {
    async session({ session, token, user }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
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
      };
    },
  },
};

export default NextAuth(authOptions);
