import React, { ReactNode } from "react";
type LandingPageProps = {
  children: ReactNode;
  params: {
    businessName: string;
  };
};

async function Layout({
  children,
  params: { businessName },
}: LandingPageProps) {
  return (
    <section className="flex flex-col justify-center items-center gap-3 pb-10">
      {children}
    </section>
  );
}

export default Layout;
