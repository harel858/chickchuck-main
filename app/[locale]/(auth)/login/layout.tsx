import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";

async function SignInLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(330deg, hsl(272, 53%, 50%) 0%, hsl(226, 68%, 56%) 100%)",
      }}
      className="h-screen w-full flex  justify-center items-center"
    >
      {children}
    </section>
  );
}

export default SignInLayout;
