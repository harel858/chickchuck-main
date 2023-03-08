"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

type formData = {
  name: string;
  email: string;
  password: string;
  businessName: string;
};

function SignUpForm() {
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
      console.log(JSON.stringify(formData));

      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const user = await res.json();

        // reset formData
        setFormData({
          name: "",
          email: "",
          password: "",
          businessName: "",
        });
        signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: "/home",
        });
      } else {
        const error = await res.json();
        console.log(error);

        setError(error);
      }
    } catch (err: any) {
      console.log(err);
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignUpForm;
