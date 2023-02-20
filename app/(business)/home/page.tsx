"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { SessionData } from "../../../types";
import UniqueLink from "./UniqueLink";

function Business() {
  const { data }: any = useSession();
  const SessionData = data as SessionData;
  console.log(SessionData);

  const businessName = SessionData?.user?.businessName.replace(/ /g, "-");

  if (!businessName) return <h1>Loading...</h1>;

  if (businessName)
    return (
      <main className="flex align-center justify-center mt-4">
        <UniqueLink link={`http://localhost:3000/${businessName}`} />
      </main>
    );
}

export default Business;
