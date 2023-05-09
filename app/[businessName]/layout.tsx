import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col justify-center items-center">
      {children}
    </section>
  );
}

export default Layout;
