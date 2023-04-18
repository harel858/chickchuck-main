"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "@prisma/client";
import { Button } from "@ui/Button";

type signInData = {
  email: string;
  password: string;
};

function SignInForm() {
  const [isLodaing, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<signInData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event.target.value);

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
      const result = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      const res = await axios.get(
        `api/user/get?email=${formData.email}&password=${formData.password}`
      );

      const user = res.data as User;
      // reset formData
      setFormData({
        email: "",
        password: "",
      });
      const value = user.businessName.replace(/ /g, "-");
      if (user) setIsLoading(false);

      router.push(`/home`);
    } catch (err) {
      setIsLoading(false);
      console.log(err);

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
      <>
        {data?.map(
          (item: keyof signInData, _index: number, _array: string[]) => (
            <label key={_index}>
              {item}:
              <input
                type={item === "email" ? "email" : "password"}
                name={item}
                required
                value={formData[item]}
                onChange={handleChange}
              />
            </label>
          )
        )}
      </>
    );
  };

  return (
    <form className="flex flex-col items-center gap-3 " onSubmit={handleSubmit}>
      {displayInput()}
      <p className="test-red-500">{error ? error : ""}</p>
      <Button isLoading={isLodaing}>Submit</Button>
    </form>
  );
}

export default SignInForm;
