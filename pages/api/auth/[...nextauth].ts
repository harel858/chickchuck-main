import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../lib/prisma/users";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
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
          const { email, password } = credentials as any;

          const { user, error } = await signIn(email, password);
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
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.user = user as any;
      }
      return token;
    },

    async session({ session, token, user }: any) {
      session.user = token.user;

      return session;
    },
  },

  pages: { signIn: "/signIn" },
};

export default NextAuth(authOptions);
