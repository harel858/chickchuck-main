"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { User } from "@prisma/client";
import { Button } from "@ui/Button";
import axios from "axios";

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
    console.log(formData);

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
      console.log({ ...formData });

      const res = await axios.post("/api/user", { ...formData });

      const user = res.data;
      console.log(user);
      // reset formData
      setFormData({
        name: "",
        email: "",
        password: "",
        businessName: "",
      });
      setIsLoading(false);
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
              className="w-full py-3 rounded-xl border border-gray-500 focus:outline-none focus:border-2 dark:focus:border-white/80 focus:border-black/80 transition duration-300 transform scale-95 hover:scale-100"
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
    <form
      className="flex flex-col items-center gap-3 w-1/3 py-4 rounded-lg bg-white/20"
      onSubmit={handleSubmit}
    >
      {displayInput()}
      <p className="test-red-500">{error ? error : ""}</p>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignUpForm;
