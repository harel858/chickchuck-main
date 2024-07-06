import { prisma } from "./prisma";
import { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { getImage } from "./aws/s3";
import googleProvider from "next-auth/providers/google";
import { getUserByPhone, updateUserByPhone } from "./prisma/users";
import bcrypt from "bcrypt";
import findUserByPhone from "actions/findUserByPhone";

const bucketName = process.env.BUCKET_NAME!;

type UserCredentials = {
  phone: string;
  password: string;
  confirmPassword: string;
};
const authorizeUserSignUp = async (credentials: any, req: any) => {
  console.log("req", req);
  console.log("credentials", credentials);

  try {
    const { phone, password } = credentials as UserCredentials;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await updateUserByPhone(phone, hashedPassword);

    return user;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
const authorizeUserSignIn = async (credentials: any, req: any) => {
  console.log("req", req);
  console.log("credentials", credentials);

  try {
    const { phone, password, confirmPassword } = credentials as UserCredentials;

    const user = await findUserByPhone(phone);
    if (user?.password) {
      let verify = await bcrypt.compare(password, user.password);

      if (!verify) return null;
      return user;
    }
    return null;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

async function refreshAccessToken(
  token: JWT & {
    accountId: string;
  }
) {
  try {
    console.log("token", token);

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
    console.log("refreshedTokens", refreshedTokens);

    if (!response.ok) {
      throw refreshedTokens;
    }
    await prisma.account.update({
      where: { id: token.accountId },
      data: { access_token: token.access_token },
    });
    return {
      ...token,
      access_token: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/signin", newUser: "/createbusinessdetails" },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      name: "Sign Up",
      type: "credentials",
      credentials: {
        phone: {
          label: "Phone",
          type: "phone",
        },
        password: { label: "Password", type: "password" },
        confirmPassword: { label: "Confirm Password", type: "password" },
      },
      authorize: authorizeUserSignUp,
    }),
    CredentialsProvider({
      name: "Sign In",
      type: "credentials",
      credentials: {
        phone: {
          label: "Phone",
          type: "phone",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: authorizeUserSignIn,
    }),
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "openid https://www.googleapis.com/auth/calendar",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile, tokens) {
        try {
          console.log("profile", profile);
          console.log("tokens", tokens);

          return {
            id: profile.sub,
            name: `${profile.given_name} ${profile.family_name}`,
            email: profile.email,
            image: profile.image,
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

      try {
        /*         if (trigger === "signUp" && token) {
          // Link user and account if it's a new sign-in
          await prisma.user.update({
            where: { id: token?.sub },
            data: {
              accounts: {
                connect: { userId: token?.sub },
              },
            },
          });
        }
 */
        let logo: string | null = "";

        let user = await prisma.user.findUnique({
          where: { id: token.sub! },
          include: {
            Business: { include: { Images: true, Customer: true } },
            Treatment: true,
            activityDays: true,
            accounts: true,
          },
        });
        if (!user) {
          throw new Error("user not found");
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
        ``;

        token.businessId = user?.Business?.id || "";
        token.user = user;
        token.logo = logo;
        token.businessName = user.Business?.businessName || "";
        token.access_token = user.accounts[0]?.access_token || "";
        token.refresh_token = user.accounts[0]?.refresh_token || "";

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
        },
      };
    },
  },
};
