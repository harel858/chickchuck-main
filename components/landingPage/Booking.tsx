"use client";
import Verification from "@components/Verification";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { UserData } from "../../types/types";
import StepThree from "./StepThree";

function Booking({ userData }: { userData: UserData[] }) {
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
    <div className="flex flex-col items-center justify-center gap-20 h-screen w-full text-white">
      {loading ? (
        <>loading...</>
      ) : !session?.data?.user ||
        session?.data?.user.UserRole === "RECIPIENT" ? (
        <Verification userData={userData} />
      ) : (
        <Suspense fallback={<>loading...</>}>
          <StepThree userData={userData} />
        </Suspense>
      )}
    </div>
  );
}

export default Booking;
