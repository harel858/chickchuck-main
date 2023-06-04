"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@ui/Button";
import { AxiosError } from "axios";

type signInData = {
  email: string;
  password: string;
};

function SignInForm() {
  const [error, setError] = useState("");
  const [isLodaing, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<signInData>({
    email: "",
    password: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Use formData for API call
    try {
      setIsLoading(true);
      await signIn("User Login", {
        ...formData,
        redirect: true,
        callbackUrl: "/profile",
      });

      // reset formData
    } catch (err) {
      setIsLoading(false);
      if (err instanceof AxiosError) {
        console.log(err.message);
      } else {
        console.log(err);
      }

      /* toast({
        title: "Error Signing In",
        message: "Please try again later",
        type: "error",
      }); */
    }
  };
  const displayInput = () => {
    const data: any = ["email", "password"];
    return (
      <div className="w-11/12">
        {data?.map(
          (item: keyof signInData, _index: number, _array: string[]) => (
            <label key={_index}>
              {item}:
              <input
                className="w-full py-3 rounded-xl border border-gray-500 focus:outline-none focus:border-2 dark:focus:border-white/80 focus:border-black/80 transition duration-300 transform scale-95 hover:scale-100"
                type={item === "email" ? "email" : "password"}
                name={item}
                required
                value={formData[item]}
                onChange={handleChange}
              />
            </label>
          )
        )}
      </div>
    );
  };

  return (
    <form
      className="flex flex-col items-center gap-3 w-1/3 py-4 rounded-lg bg-white/20"
      onSubmit={handleSubmit}
    >
      {displayInput()}
      <p className="test-red-500">{error ? error : ""}</p>
      <Button isLoading={isLodaing}>Submit</Button>
    </form>
  );
}

export default SignInForm;
