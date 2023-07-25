"use client";
import React from "react";
import { Address, Business, PremiumKits, UserRole } from "@prisma/client";
import UserActivity from "@components/team/UserActivity";

function TeamManeger({
  user,
}: {
  user: {
    business: Business & {
      Address: Address[];
    };
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string | null;
    startActivity: string | null;
    endActivity: string | null;
    UserRole: UserRole;
    isAdmin: boolean;
    PremiumKit: PremiumKits;
    businessId: string | null;
  };
}) {
  return <UserActivity user={user} />;
}

export default TeamManeger;
