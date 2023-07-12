"use client";
import { Business, Treatment, User } from "@prisma/client";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

type formData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function TeamForm({
  business,
}: {
  business: Business & {
    user: User[];
  };
}) {
  const router = useRouter();

  const [formData, setFormData] = useState<formData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/team/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          businessId: business.id,
          businessName: business.businessName,
        }),
      });
      const result = await res.json();

      if (res.ok) {
        router.refresh();
      }
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const displayInput = () => {
    const data: any = ["name", "email", "password", "confirmPassword"];
    return (
      <>
        {data?.map((item: keyof formData, _index: number, _array: string[]) => {
          const label = item === "confirmPassword" ? "confirm password" : item;

          return (
            <label key={_index}>
              {label}:
              <input
                type="text"
                name={item}
                required
                value={formData[item]}
                onChange={handleChange}
              />
            </label>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <h1>Add Treatment</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        {displayInput()}
        <button>add treatment +</button>
      </form>
    </div>
  );
}

export default TeamForm;
