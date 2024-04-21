import { Input } from "antd";
import React, { useState } from "react";

function NewCustomer({
  newClient,
  setNewClient,
}: {
  setNewClient: React.Dispatch<
    React.SetStateAction<{
      name: string;
      phone: string;
    }>
  >;
  newClient: {
    name: string;
    phone: string;
  };
}) {
  const handleInputChange = (name: string, value: string) => {
    // If the input is for the phone field, validate and update the state
    if (name === "phone") {
      // Remove non-numeric characters
      const numericValue = value.replace(/\D/g, "");
      setNewClient((prevClient) => ({ ...prevClient, [name]: numericValue }));
    } else {
      // For other fields, update the state directly
      setNewClient((prevClient) => ({ ...prevClient, [name]: value }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Input
        name="name"
        placeholder="Name"
        onChange={(e) => handleInputChange("name", e.target.value)}
        value={newClient.name}
      />
      <Input
        name="phone"
        placeholder="Phone"
        type="tel" // Set the input type to "tel" for better mobile support
        onChange={(e) => handleInputChange("phone", e.target.value)}
        value={newClient.phone}
      />
    </div>
  );
}

export default NewCustomer;
