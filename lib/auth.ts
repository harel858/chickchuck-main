import { prisma } from "./prisma";
import { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCustomer } from "./prisma/customer/customer";
import { getImage } from "./aws/s3";
import { signInNew } from "./routes/user/signin";
import googleProvider from "next-auth/providers/google";

interface UserCredentials {
  emailORphoneNumber: string;
  password: string;
}

interface CustomerCredentials {
  phoneNumber: string;
  bussinesId: string;
}
const bucketName = process.env.BUCKET_NAME!;

const authorizeUserLogin = async (credentials: any, req: any) => {
  try {
    const { emailORphoneNumber, password } = credentials as UserCredentials;

    const { user, err } = await signInNew(emailORphoneNumber, password);

    if (!user || err) throw new Error(err || "user not found");

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const authorizeCustomerLogin = async (credentials: any, req: any) => {
  try {
    const { phoneNumber, bussinesId } = credentials as CustomerCredentials;
    const { customer, getCustomerErr } = await getCustomer(
      phoneNumber,
      bussinesId
    );

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

async function refreshAccessToken(token: JWT) {
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
    console.log("refreshedTokens", refreshedTokens);

    if (!response.ok) {
      throw refreshedTokens;
    }

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
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope:
            "openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile, tokens) {
        console.log("profile", profile);
        console.log("tokens", tokens);

        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt(props) {
      const { token, user } = props;
      console.log("props", props);

      try {
        let logo: string | null = "";

        const user = await prisma.user.findUnique({
          where: { email: token.email! },
          include: {
            Business: { include: { Images: true, Customer: true } },
            Treatment: true,
            activityDays: true,
            accounts: true,
          },
        });
        console.log("user.tretment", user?.Treatment);

        if (!user) {
          throw new Error("user not found");
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

        token.business = user?.Business || null;
        token.Customer = user?.Business?.Customer || [];
        token.activityDays = user.activityDays;
        token.treatments = user.Treatment;
        token.user = user;
        token.logo = logo;
        /*        token.access_token = user.accounts[0]?.access_token || "";
        token.refresh_token = user.accounts[0]?.refresh_token || ""; */
        console.log("token9999", token);
        console.log("user", user);

        if (props.account?.expires_at && user) {
          return {
            ...token,
            accessToken: token.accessToken,
            accessTokenExpires: Date.now() + props.account.expires_at * 1000,
            refreshToken: token.refresh_token,
          };
        }
        /* 
        const newToken = {
          ...token,
          user,
          logo,
          activityDays: user.activityDays,
          treatments: user.Treatment,
          account: user.accounts[0],
          refreshToken: user.accounts[0]?.refresh_token || "",
        } as JWT; */

        // Return previous token if the access token has not expired yet
        /*         if (Date.now() < token.accessTokenExpires) {
          console.log("token22", token);

          return token;
        }
 */
        // Access token has expired, try to update it
        return refreshAccessToken(token);
      } catch (err) {
        console.error(err);
        return props.token;
      }
    },

    async session({ session, token, user }) {
      session.user = {
        ...token.user,
        activityDays: token.activityDays,
        access_token: token.access_token,
        business: token.business,
        Customer: token.Customer,
        treatments: token.treatments,
        logo: token.logo,
      };
      return session;
    },
  },
};

/* 398888172398-5su01j6ookv6isv2pjp0ubleadru7jg7.apps.googleusercontent.com */
