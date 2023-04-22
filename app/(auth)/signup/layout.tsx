import React from "react";

export default function SignUpLayout({
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
