"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { User } from "@prisma/client";
import { Button } from "@ui/Button";
import axios, { AxiosError } from "axios";
import { TextField } from "@mui/material";

type registerFormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  businessName: string;
};

function SignUpForm() {
  const [isLodaing, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<registerFormData>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
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
      const res = await axios.post("/api/createUser", { ...formData });
      const user = res.data as User;
      signIn("credentials", {
        email: user.email,
        password: formData.password,
        redirect: true,
        callbackUrl: `/home`,
      });
      setIsLoading(false);
      // reset formData
      setFormData({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
        businessName: "",
      });
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      if (err instanceof AxiosError) {
        setError(err.response?.data);
      }

      /* toast({
        title: "Error Signing In",
        message: "Please try again later",
        type: "error",
      }); */
    }
  };

  const displayInput = () => {
    const data: any = [
      "name",
      "email",
      "password",
      "repeatPassword",
      "businessName",
    ];
    return (
      <>
        {data?.map(
          (item: keyof registerFormData, i: number, _array: string[]) => (
            <TextField
              key={item}
              id="outlined-basic"
              label={`${item}`}
              name={item}
              type={
                item === "email"
                  ? "email"
                  : item === "password" || item === "repeatPassword"
                  ? "password"
                  : "text"
              }
              onChange={handleChange}
              error={error ? true : false}
              variant="filled"
              InputProps={{
                style: {
                  color: `white`,
                  fontWeight: "lighter",
                  fontSize: `1.2em`,
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "1.2em",
                  fontWeight: "bolder",
                  transition: "all 200ms ease-in",
                },
              }}
              sx={{
                bgcolor: "rgba(0, 0, 0,.5)",
                borderRadius: "8px",
                transition: "all 200ms ease-in",
                ":after": { border: `4px solid white ` },
              }}
            />
          )
        )}
      </>
    );
  };

  return (
    <form
      className="flex flex-col items-center gap-3 w-5/12 py-4 rounded-lg dark:bg-white/50 bg-gray-600"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row flex-wrap items-center justify-center content-center gap-4">
        {displayInput()}
      </div>
      <p className="test-red-500">{error ? error : ""}</p>
      <Button type="submit" isLoading={isLodaing}>
        Submit
      </Button>
    </form>
  );
}

export default SignUpForm;
