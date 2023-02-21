import React from "react";

function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-center ">{children}</div>;
}

export default LandingPageLayout;
