"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { User } from "@prisma/client";
import { Button } from "@ui/Button";

type formData = {
  name: string;
  email: string;
  password: string;
  businessName: string;
};

function SignUpForm() {
  const [isLodaing, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<formData>({
    name: "",
    email: "",
    password: "",
    businessName: "",
  });
  const [error, setError] = useState("");

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
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const user = (await res.json()) as User;
        console.log(user);
        // reset formData
        setFormData({
          name: "",
          email: "",
          password: "",
          businessName: "",
        });
        setIsLoading(false);
        signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: `/home/${user.businessName}`,
        });
      } else {
        const error = await res.json();
        console.log(error);

        setError(error);
      }
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
    const data: any = ["name", "email", "password", "businessName"];
    return (
      <>
        {data?.map((item: keyof formData, _index: number, _array: string[]) => (
          <label key={_index}>
            {item == "password" ? "New Password" : item}:
            <input
              type={
                item === "email"
                  ? "email"
                  : item === "password"
                  ? "password"
                  : "text"
              }
              name={item}
              required
              value={formData[item]}
              onChange={handleChange}
            />
          </label>
        ))}
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

export default SignUpForm;
