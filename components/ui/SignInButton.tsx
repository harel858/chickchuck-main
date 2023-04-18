"use client";
import { Button } from "@ui/Button";
import React from "react";
import { useState } from "react";

function SignInButton() {
  const [isLodaing, setIsLoading] = useState<boolean>(false);
  return <Button isLoading={isLodaing}>Sign In</Button>;
}

export default SignInButton;
