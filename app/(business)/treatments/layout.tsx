import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <main className="mt-32">{children}</main>;
}

export default Layout;
