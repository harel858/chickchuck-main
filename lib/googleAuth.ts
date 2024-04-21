import { NextAuthOptions } from "next-auth";
import googleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};

/* const dbUser = await prisma.user.findUnique({
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
          business: dbUser.Business,
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          UserRole: dbUser.UserRole,
          isAdmin: dbUser.isAdmin,
        };
      } else if (dbCustomer) {
        return {
          ...token,
          id: dbCustomer.id,
          name: dbCustomer.name,
          phoneNumber: dbCustomer.phoneNumber,
          UserRole: dbCustomer.UserRole,
          business: null,
          isAdmin: false,
          urls: null,
        };
      }

      token.id = user!.id;
      return token;
     */
