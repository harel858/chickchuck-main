"use client";
import React, { useState } from "react";
import { Business, User } from "@prisma/client";
import TextField from "@mui/material/TextField";
import { Button } from "@ui/Button";
import axios from "axios";
import { ProfilePageData } from "../../../../types/types";

interface BussinessAdress {
  city: String | null;
  street: String | null;
  zipcode: String | null;
}

function BussinessAddress({ user }: { user: ProfilePageData }) {
  const [formData, setFormData] = useState<BussinessAdress>({
    city: user.bussiness.Address[0]?.city || "",
    street: user.bussiness.Address[0]?.street || "",
    zipcode: user.bussiness.Address[0]?.zipcode || "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    setError("");
    const params = { ...formData, userId: user.id };

    try {
      const res = await axios.post(`/api/bussiness/addresses`, params);
      console.log(res.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center relative w-fit bg-white/70 p-5 rounded-2xl gap-5">
      <h2 className="text-black text-2xl w-max">Bussiness Address</h2>
      <TextField
        id="filled-basic"
        label={`City`}
        value={user.bussiness.Address[0]?.city || undefined}
        variant="filled"
        name="city"
        onChange={handleChange}
      />
      <TextField
        id="filled-basic"
        label={user.bussiness.Address[0]?.street || `Street`}
        variant="filled"
        name="street"
        onChange={handleChange}
      />
      <TextField
        id="filled-basic"
        label={user.bussiness.Address[0]?.zipcode || `Zip Code`}
        variant="filled"
        name="zipcode"
        onChange={handleChange}
      />
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="font-serif text-red-500">{error}</p>
        <Button onClick={handleButtonClick} isLoading={loading}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default BussinessAddress;
