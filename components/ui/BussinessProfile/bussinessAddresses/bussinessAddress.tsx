"use client";
import React, { useEffect, useState } from "react";
import { Input, notification, Skeleton } from "antd";
import { Button } from "@ui/Button";
import axios, { AxiosError } from "axios";
import { TextField } from "@mui/material";
import { BusinessAddress, ProfilePageData } from "../../../../types/types";
import { FaMapSigns } from "react-icons/fa";
import { NotificationPlacement } from "antd/es/notification/interface";

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
  const [api, contextHolder] = notification.useNotification();
  const successNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };

  const errorNotification = (placement: NotificationPlacement) => {
    api.error({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };

  const handleButtonClick = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`/api/business/addresses`, formData);
      if (res.status === 200) {
        setHasChanges(false);
        setLoading(false);
        return successNotification("bottom");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.message);
        setLoading(false);
        return errorNotification("bottom");
      }
      console.log(err);
      setLoading(false);
      return errorNotification("bottom");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setHasChanges(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center relative max-2xl:w-11/12 dark:bg-orange-400/70 bg-slate-100 shadow-sm shadow-black p-5 rounded-xl gap-1 transition-all duration-300 ease-in-out border border-gray-500">
        <div className="text-black flex justify-center items-end gap-3">
          <h2 className=" text-2xl font-semibold text-center w-max">
            Business Address
          </h2>
          <FaMapSigns className="text-3xl font-semibold" />
        </div>

        <div className="flex flex-col justify-center items-start gap-3">
          <TextField
            id="outlined-basic"
            label="City"
            name="city"
            onChange={handleChange}
            error={Boolean(error)}
            variant="filled"
            value={formData.city}
            InputProps={{
              style: { color: "black", fontSize: "1.2em" },
              inputMode: "numeric",
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.1em",
                fontWeight: "500",
                color: "black",
              },
            }}
            sx={{
              width: "100%",
              borderRadius: "4px",
              ":after": { border: "4px solid white" },
              ...(error && { boxShadow: "0px 0px 0px 2px red" }),
            }}
          />
          <TextField
            id="outlined-basic"
            label="Street"
            name="street"
            onChange={handleChange}
            error={Boolean(error)}
            variant="filled"
            value={formData.street}
            InputProps={{
              style: { color: "black", fontSize: "1.2em" },
              inputMode: "numeric",
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.1em",
                fontWeight: "500",
                color: "black",
              },
            }}
            sx={{
              width: "100%",
              borderRadius: "4px",
              ":after": { border: "4px solid white" },
              ...(error && { boxShadow: "0px 0px 0px 2px red" }),
            }}
          />
          <TextField
            id="outlined-basic"
            label="Zip Code"
            name="zipcode"
            onChange={handleChange}
            error={Boolean(error)}
            variant="filled"
            value={formData.zipcode}
            InputProps={{
              style: { color: "black", fontSize: "1.2em" },
              inputMode: "numeric",
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.1em",
                fontWeight: "500",
                color: "black",
              },
            }}
            sx={{
              width: "100%",
              borderRadius: "4px",
              ":after": { border: "4px solid white" },
              ...(error && { boxShadow: "0px 0px 0px 2px red" }),
            }}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="font-serif text-red-500">{error}</p>
          <Button
            variant={"default"}
            disabled={!hasChanges}
            onClick={handleButtonClick}
            isLoading={loading}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}

export default BusinessAddress;
