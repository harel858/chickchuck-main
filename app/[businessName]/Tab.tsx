import React from "react";

function Tab({ active, children }: any) {
  return (
    <div className={`p-4 bg-gray-900 flex justify-center`}>{children}</div>
  );
}

export default Tab;
