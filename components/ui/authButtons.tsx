"use client";

import Image from "next/image";
import googleLogo from "@public/google.png";
import { signIn } from "next-auth/react";
import { RiTeamFill } from "react-icons/ri";
import { useTranslations } from "next-intl";

export function GoogleSignInButton({ locale }: { locale: string }) {
  const t = useTranslations("login");

  console.log("locale", locale);

  const handleClick = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: `/${locale}/schedule`,
      });
      console.log("result", result);

      if (!result?.ok) {
        console.error("Google sign-in failed");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={40} height={40} />
      <span className="ml-4 text-lg">{t("businessOwnerSignin")}</span>
    </button>
  );
}

export function CredentialsSignInButton() {
  const handleClick = async () => {
    try {
      const result: any = await signIn();
      if (!result) {
        console.error("Credentials sign-in failed");
      }
    } catch (error) {
      console.error("Credentials sign-in error:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <RiTeamFill className="text-4xl" />
      <span className="ml-4"> התחבר כאיש צוות</span>
    </button>
  );
}
