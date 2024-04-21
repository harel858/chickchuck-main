"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Treatment } from "@prisma/client";
import axios from "axios";

type treatmentProps = {
  item: Treatment;
};

const Treatment = React.memo(({ item }: treatmentProps) => {
  console.log(item);

  const { title, id, cost, duration } = item;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      try {
        setLoading(true);
        const res = await axios.delete(`/api/treatment?id=${id}`);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        () => setLoading(false);
      }
    },
    [id, router]
  );

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <li className="p-10 bg-yellow-200 border-2 border-black m-2 shadow-xl">
      <p>id:{id}</p>
      <p>title: {title}</p>
      <p>cost: {cost}</p>
      <p>duration: {duration}</p>
      <button
        onClick={handleDelete}
        className="border-t border-black mt-5 text-right"
      >
        delete
      </button>
    </li>
  );
});

export default Treatment;
