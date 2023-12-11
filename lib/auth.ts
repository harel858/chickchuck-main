import { prisma } from "./prisma";
import { NextAuthOptions } from "next-auth";
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
            "openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.events ",
        },
      },
      profile(profile, tokens) {
        /*         const user = await prisma.user.findUnique({
          where: { email: profile.email! },
          include: { Business: { include: { Images: true } } },
        });
 */
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.image,
          access_token: profile.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt(props) {
      const { account, token } = props;

      try {
        let logo: string | null = "";

        const user = await prisma.user.findUnique({
          where: { email: token.email! },
          include: { Business: { include: { Images: true } } },
        });

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

        if (logo) {
          token.logo = logo;
        }

        if (account?.access_token) {
          token.access_token = account.access_token;
        }

        token.business = user?.Business || null;
        return { ...token, logo, user, account };
      } catch (err) {
        console.error(err);
        return props.token;
      }
    },

    async session({ session, token, user }) {
      console.log("token.logoi", token.logo);
      session.user = {
        ...token.user,
        access_token: token.access_token,
        business: token.business,
        logo: token.logo,
      };
      return session;
    },
  },
};

/* 398888172398-5su01j6ookv6isv2pjp0ubleadru7jg7.apps.googleusercontent.com */
