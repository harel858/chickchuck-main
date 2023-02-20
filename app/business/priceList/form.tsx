"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { User } from "../../../types";

type formData = {
  title: string;
  cost: string;
  duration: string;
};

function Form() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as User;

  const [formData, setFormData] = useState<formData>({
    title: "",
    cost: "",
    duration: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/treatment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, businessId: user?.id }),
      });

      if (res.ok) {
        const result = await res.json();
        console.log(result);
        router.refresh();
      }
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
    const data: any = ["title", "cost", "duration"];
    return (
      <>
        {data?.map((item: keyof formData, _index: number, _array: string[]) => (
          <label key={_index}>
            {item}:
            <input
              type="text"
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
    <div>
      <h1>Add Treatment</h1>
      <form onSubmit={handleSubmit}>
        {displayInput()}
        <button>add treatment +</button>
      </form>
    </div>
  );
}

export default Form;
