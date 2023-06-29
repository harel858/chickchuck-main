"use client";
import React, { useState } from "react";
import { Input } from "antd";
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
    <div className="flex flex-col items-center justify-center relative w-fit bg-white/70 p-5 rounded-2xl gap-2 shadow-sm shadow-black">
      <h2 className="text-black text-2xl w-max">business Address</h2>
      <Input
        id="filled-basic"
        placeholder={`City`}
        value={formData.city}
        name="city"
        onChange={handleChange}
      />
      <Input
        id="filled-basic"
        placeholder={`Street`}
        value={formData.street}
        name="street"
        onChange={handleChange}
      />
      <Input
        id="filled-basic"
        placeholder={`Zip Code`}
        value={formData.zipcode}
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
