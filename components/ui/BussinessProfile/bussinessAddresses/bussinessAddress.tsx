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
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`/api/business/addresses`, formData);
      setHasChanges(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setHasChanges(true);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-80 flex flex-col items-center justify-end relative w-fit dark:bg-orange-400/70 bg-orange-300 p-5 rounded-2xl gap-5 shadow-sm shadow-black">
      <h2 className="absolute text-black text-2xl w-max top-7">
        Business Address
      </h2>
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
        <Button
          disabled={!hasChanges}
          onClick={handleButtonClick}
          isLoading={loading}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default BusinessAddress;
