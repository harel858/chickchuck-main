import React from "react";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="mt-56">{children}</section>;
}
