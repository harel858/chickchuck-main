import React, { createContext } from "react";
import { Cycle, useCycle } from "framer-motion";

type Context = {
  isOpen: boolean;
  toggleOpen: Cycle;
};

export const BusinessContext = createContext<Context>({
  isOpen: false,
  toggleOpen: () => {},
});
export const BusinessContextProvider: React.FC<any> = ({
  children,
}: any): any => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const context = {
    isOpen,
    toggleOpen,
  };

  return (
    <BusinessContext.Provider value={context}>
      {children}
    </BusinessContext.Provider>
  );
};
