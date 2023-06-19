"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@ui/Button";
import axios from "axios";
import { BusinessAddress, ProfilePageData } from "../../../../types/types";

function BusinessAddress({ user }: { user: ProfilePageData }) {
  const [formData, setFormData] = useState<BusinessAddress>({
    city: user.business.Address[0]?.city || "",
    street: user.business.Address[0]?.street || "",
    zipcode: user.business.Address[0]?.zipcode || "",
    userId: user.id,
    businessId: user.business.id,
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`/api/business/addresses`, formData);
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
    console.log(formData);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center relative w-fit bg-white/70 p-5 rounded-2xl gap-2 shadow-md shadow-black">
      <h2 className="text-black text-2xl w-max">business Address</h2>
      <TextField
        id="filled-basic"
        label={`City`}
        value={formData.city}
        variant="filled"
        name="city"
        onChange={handleChange}
      />
      <TextField
        id="filled-basic"
        label={`Street`}
        value={formData.street}
        variant="filled"
        name="street"
        onChange={handleChange}
      />
      <TextField
        id="filled-basic"
        label={`Zip Code`}
        value={formData.zipcode}
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

export default BusinessAddress;
