import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex mt-32 justify-center align-center content-center">
      {children}
    </div>
  );
}

export default Layout;
