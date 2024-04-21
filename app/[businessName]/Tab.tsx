import React from "react";

function Tab({ active, children }: any) {
  return (
    <div className={` p-5 rounded-3xl bg-gray-600 flex justify-center`}>
      {children}
    </div>
  );
}

export default Tab;
