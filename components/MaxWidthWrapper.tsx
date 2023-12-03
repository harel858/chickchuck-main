import { cn } from "@lib/utils";
import type { ReactNode } from "react";

function MaxWidthWrapper({
  classNames,
  children,
}: {
  classNames?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        classNames
      )}
    >
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
