"use client";
import React, { useEffect, useState } from "react";
import { Input, Skeleton } from "antd";
import { Button } from "@ui/Button";
import axios from "axios";
import { BusinessAddress, ProfilePageData } from "../../../../types/types";
import { FaMapSigns } from "react-icons/fa";

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
  const [loading, setLoading] = useState(false);
  const [initialRendering, setInitialRendering] = useState(true);
  useEffect(() => setInitialRendering(false), []);

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
    <div className="relative flex flex-col items-center justify-end max-2xl:w-11/12 w-64 dark:bg-orange-400/70 bg-slate-900 shadow-sm shadow-black p-5 rounded-xl gap-10 transition-all duration-300 ease-in-out border border-gray-500">
      <div className="text-white/90 flex justify-center items-end gap-3">
        <h2 className=" text-2xl font-semibold text-center w-max">
          Business Address
        </h2>
        <FaMapSigns className="text-3xl font-semibold" />
      </div>
      {initialRendering ? (
        <Skeleton active />
      ) : (
        <div className="flex flex-col justify-center items-center gap-5">
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
              variant={"destructive"}
              disabled={!hasChanges}
              onClick={handleButtonClick}
              isLoading={loading}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessAddress;
