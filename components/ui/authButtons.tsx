"use client";

import Image from "next/image";
import googleLogo from "@public/google.png";
import { signIn } from "next-auth/react";
import { RiTeamFill } from "react-icons/ri";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={40} height={40} />
      <span className="ml-4"> התחבר כבעל עסק</span>
    </button>
  );
}
/* 
export function GithubSignInButton() {
  const handleClick = () => {
    signIn("github");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={githubLogo} alt="Github Logo" width={20} height={20} />
      <span className="ml-4">Continue with Github</span>
    </button>
  );
}
 */
export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
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
