"use client";
import Verification from "@components/Verification";
import { Business, Customer, Treatment, User } from "@prisma/client";
import { Button } from "@ui/Button";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { BusinessData, UserData } from "../../types/types";
import Steps from "./finals/Steps";

function Booking({
  businessData,
}: {
  businessData: {
    usersData: UserData[];
    business: Business & {
      user: (User & {
        Treatment: Treatment[];
      })[];
      Customer: Customer[];
    };
  };
}) {
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    // Check if the session has finished loading
    if (session?.status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [session]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full text-white ">
      {loading ? (
        <>loading...</>
      ) : !session?.data?.user ||
        session?.data?.user.UserRole === "RECIPIENT" ? (
        <Verification businessData={businessData} />
      ) : (
        <Suspense fallback={<>loading...</>}>
          <Steps businessData={businessData} />
        </Suspense>
      )}
    </div>
  );
}

export default Booking;
