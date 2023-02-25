"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { SessionData } from "../../../types";
import UniqueLink from "./UniqueLink";
import CircularProgress from "@mui/material/CircularProgress";
import { Lobster } from "@next/font/google";

const font = Lobster({
  subsets: ["latin"],
  weight: "400",
});

function Business() {
  const { data }: any = useSession();
  const SessionData = data as SessionData;
  console.log(SessionData);

  const businessName = SessionData?.user?.businessName.replace(/ /g, "-");

  return (
    <>
      {businessName ? (
        <main className="flex align-center justify-center mt-4">
          <UniqueLink link={`http://localhost:3000/${businessName}`} />
        </main>
      ) : (
        <div className="text-white flex justify-center items-center align-center flex-col gap-2 mx-auto mt-60">
          <CircularProgress size={100} color="warning" />
        </div>
      )}
    </>
  );
}

export default Business;
