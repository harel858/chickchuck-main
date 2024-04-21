"use client";
import { Button } from "@ui/Button";
import React from "react";
import { signOut } from "next-auth/react";

function SignOutBtn() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
  );
}

export default SignOutBtn;
