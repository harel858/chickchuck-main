"use client";
import { Button } from "@ui/Button";
import React from "react";
import { useState } from "react";

function SignOutBtn() {
  const [isLodaing, setIsLoading] = useState<boolean>(false);
  return <Button isLoading={isLodaing}>Sign Out</Button>;
}

export default SignOutBtn;
