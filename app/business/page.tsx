"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { SessionData } from "../../types";

function Business() {
  const { data }: any = useSession();
  const SessionData = data as SessionData;
  console.log(SessionData);

  let businessName = SessionData?.user?.businessName.replace(/ /g, "-");

  if (!businessName) return <h1>Loading...</h1>;

  if (businessName)
    return (
      <main>
        <main>
          <div className="flex gap-2">
            <h2>your unique link:</h2>
            <Link
              className="text-blue-500 hover:text-blue-700"
              href={`/${businessName}`}
            >
              http://localhost:3000/{businessName}
            </Link>
            <Link
              href={`/business/schedule/${SessionData?.user?.id}`}
              className="p-2 m-10 text-2xl rounded-lg  transition duration-300 ease-out hover:rounded-full hover:bg-black hover:text-white border-2 border-black bg-purple-500 text-center text-l text-bold"
            >
              Schedule
            </Link>
            <Link
              href={`/business/priceList/${SessionData?.user?.id}`}
              className="p-2 m-10 text-2xl rounded-lg  transition duration-300 ease-out hover:rounded-full hover:bg-black hover:text-white border-2 border-black bg-purple-500 text-center text-l text-bold"
            >
              Price List
            </Link>
          </div>
        </main>
      </main>
    );
}

export default Business;
