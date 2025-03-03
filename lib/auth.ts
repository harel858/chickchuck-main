import { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import googleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { getImage } from "./aws/s3";
import findUserByPhone from "actions/findUserByPhone";
import findCustomer from "actions/findCustomer";
import { updateUserByPhone } from "./prisma/users";
import { updateCustomerByPhone } from "./prisma/customer/updateCustomerByPhone";
import { getLocaleFromRequest, defaultLocale } from "./intl";

const bucketName = process.env.BUCKET_NAME!;
console.log("process.env.GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
console.log(
  "process.env.GOOGLE_CLIENT_SECRET",
  process.env.GOOGLE_CLIENT_SECRET
);

type UserCredentials = {
  phone: string;
  password: string;
  confirmPassword: string;
};

// Team member sign up
const authorizeUserSignUp = async (credentials: any, req: any) => {
  try {
    const { phone, password } = credentials as UserCredentials;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await updateUserByPhone(phone, hashedPassword);

    if (user) {
      return {
        ...user,
        UserRole: user.UserRole || undefined,
        preferredLocale:
          user.preferredLocale || getLocaleFromRequest(req) || defaultLocale, // Set preferredLocale
      };
    }
    return null;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

// Team member sign in
const authorizeUserSignIn = async (credentials: any, req: any) => {
  console.log("authorizeUserSignIn");

  try {
    const { phone, password } = credentials as UserCredentials;
    const user = await findUserByPhone(phone);
    if (user?.password) {
      const verify = await bcrypt.compare(password, user.password);
      if (!verify) return null;

      return {
        ...user,
        UserRole: user.UserRole || undefined,
        preferredLocale:
          user.preferredLocale || getLocaleFromRequest(req) || defaultLocale, // Set preferredLocale
      };
    }
    return null;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

// Customer sign up
const authorizeCustomerSignUp = async (credentials: any, req: any) => {
  console.log("authorizeCustomerSignUp");

  try {
    const { phone, password } = credentials as UserCredentials;
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await updateCustomerByPhone(phone, hashedPassword);

    if (customer) {
      return {
        ...customer,
        /*         preferredLocale:
          user.preferredLocale || getLocaleFromRequest(req) || defaultLocale, */ // Set preferredLocale
      };
    }
    return null;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

// Customer sign in
const authorizeCustomerSignIn = async (credentials: any, req: any) => {
  console.log("authorizeCustomerSignIn");

  try {
    const { phone, password } = credentials as UserCredentials;
    const user = await findCustomer(phone);
    if (user?.password) {
      const verify = await bcrypt.compare(password, user.password);
      if (!verify) return null;

      return user; /* {
        ...user,
        preferredLocale:
          user.preferredLocale || getLocaleFromRequest(req) || defaultLocale, // Set preferredLocale
      }; */
    }
    return null;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

async function refreshAccessToken(token: JWT & { accountId: string }) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        grant_type: "refresh_token",
        refresh_token: token?.refresh_token,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens: any = await response.json();
    console.log("response", refreshedTokens);
    console.log("response.ok", response.ok);
    if (!response.ok) {
      throw refreshedTokens;
    }
    await prisma.account.update({
      where: { id: token.accountId },
      data: { access_token: refreshedTokens.access_token },
    });
    return {
      ...token,
      access_token: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log("error", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/en/login",
    error: "/error",
    newUser: "/en/createbusinessdetails",
    signOut: "/en/login",
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      name: "SignUpCustomer",
      type: "credentials",
      credentials: {
        phone: { label: "Phone", type: "phone" },
        password: { label: "Password", type: "password" },
        confirmPassword: { label: "Confirm Password", type: "password" },
      },
      authorize: authorizeCustomerSignUp,
    }),
    CredentialsProvider({
      name: "SignInCustomer",
      type: "credentials",
      credentials: {
        phone: { label: "Phone", type: "phone" },
        password: { label: "Password", type: "password" },
      },
      authorize: authorizeCustomerSignIn,
    }),
    CredentialsProvider({
      name: "SignUpUser",
      type: "credentials",
      credentials: {
        phone: { label: "Phone", type: "phone" },
        password: { label: "Password", type: "password" },
        confirmPassword: { label: "Confirm Password", type: "password" },
      },
      authorize: authorizeUserSignUp,
    }),
    CredentialsProvider({
      name: "SignInUser",
      type: "credentials",
      credentials: {
        phone: { label: "Phone", type: "phone" },
        password: { label: "Password", type: "password" },
      },
      authorize: authorizeUserSignIn,
    }),
    googleProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      httpOptions: {
        timeout: 50000,
      },
      authorization: {
        params: {
          scope:
            "openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile, tokens) {
        console.log("profile", profile);
        console.log("tokens", tokens);

        try {
          return {
            id: profile.sub,
            name: `${profile.given_name} ${profile.family_name}`,
            email: profile.email,
            image: profile.image,
            preferredLocale: defaultLocale, // Set default preferredLocale
          };
        } catch (err: any) {
          console.log(err);
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt(props) {
      console.log("props", props);

      const { account, token, user, profile, session, trigger } = props;
      if (user) {
        console.log("JWT Callback - New User:", user);
      }
      try {
        let logo: string | null = "";
        let user = null;
        let customer = null;

        try {
          user = await prisma.user.findUnique({
            where: { id: token.sub! },
            include: {
              Business: { include: { Images: true, Customer: true } },
              Treatment: true,
              activityDays: true,
              accounts: true,
            },
          });
        } catch (err: any) {
          throw new Error(err);
        }
        try {
          const findCustomer = await prisma.customer.findUnique({
            where: { id: token.sub! },
          });
          customer = findCustomer;
        } catch (err: any) {
          throw new Error(err);
        }
        if (customer) {
          token.user = customer;

          return token;
        }
        if (!user) throw new Error("user not found");

        if (user.isAdmin) {
          token.createdAt = user.createdAt;
          token.PremiumKits = user.PremiumKit;
        }

        if (
          user?.UserRole === "TEAMMEATE" &&
          user?.accounts.length === 0 &&
          user.accountId
        ) {
          const account = await prisma.account.findUnique({
            where: { id: user?.accountId },
          });
          account && user.accounts.push(account);
        }

        if (user.Business?.Images && user.Business?.Images.length > 0) {
          await Promise.all(
            user.Business.Images.map(async (item) => {
              if (item.profileImgName) {
                const param = {
                  Bucket: bucketName,
                  Key: item.profileImgName,
                };
                const image = await getImage(param);
                logo = image;
              }
            })
          );
        }

        token.businessId = user?.Business?.id || "";
        token.user = user;
        token.logo = logo;
        token.businessName = user.Business?.businessName || "";
        token.access_token = user.accounts[0]?.access_token || "";
        token.refresh_token = user.accounts[0]?.refresh_token || "";
        token.locale = user.preferredLocale ?? undefined; // Add the locale to the token
        console.log("user", user);
        console.log("account?.expires_at", account?.expires_at);

        if (account?.expires_at && user) {
          return {
            ...token,
            accessToken: token.accessToken,
            accessTokenExpires: Date.now() + account.expires_at * 1000,
            refreshToken: token.refresh_token,
          };
        }

        // Access token has expired, try to update it
        return refreshAccessToken({
          ...token,
          refresh_token: user.accounts[0]?.refresh_token!,
          accountId: user.accounts[0]?.id!,
        });
      } catch (err) {
        console.error(err);
        return token;
      }
    },

    async session({ session, token, user }) {
      console.log("session", session);

      return {
        ...session,
        user: {
          email: token.email,
          name: token.user.name,
          id: token.user.id,
          accountId: token.accountId,
          image: token.logo || undefined,
          access_token: token.access_token,
          businessId: token.businessId,
          businessName: token.businessName,
          isAdmin: token.user.isAdmin,
          locale: token.locale, // Add the locale to the session
        },
      };
    },
  },
};
