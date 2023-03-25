"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "@prisma/client";

type signInData = {
  email: string;
  password: string;
};

function SignUpForm() {
  const [formData, setFormData] = useState<signInData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

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
      const result = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      if (!result?.ok) return setError(`the details you provided are correct.`);
      const res = await axios.get(
        `api/user?email=${formData.email}&password=${formData.password}`
      );
      const user = res.data[0] as User;
      console.log(user);

      setError("");

      // reset formData
      setFormData({
        email: "",
        password: "",
      });
      router.push(`/home/${user.businessName}`);
    } catch (err: any) {
      console.log(err);
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignUpForm;
