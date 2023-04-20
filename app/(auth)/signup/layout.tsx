import React from "react";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-full flex justify-center items-center">
      {children}
    </section>
  );
}
