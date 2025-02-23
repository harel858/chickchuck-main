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
    <section
      style={{
        backgroundImage:
          "linear-gradient(330deg, hsl(272, 53%, 50%) 0%, hsl(226, 68%, 56%) 100%)",
      }}
      className="flex flex-col justify-center items-center gap-10 pb-10"
    >
      {children}
    </section>
  );
}

export default Layout;
