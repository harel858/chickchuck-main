import React from "react";

export default function DynamicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
