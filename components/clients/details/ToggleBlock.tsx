"use client";
import React, { useState } from "react";
import { CustomerItem } from "types/types";
import { Button } from "@ui/Button";
import { BiBlock } from "react-icons/bi";
import axios from "axios";

export default function ToggleBlock({ customer }: { customer: CustomerItem }) {
  const [block, setBlock] = useState(customer.blockedByBusiness);
  const [loading, setLoading] = useState(false);

  const handleClick = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/customers/block", {
        customerId: customer.id,
        businessId: customer.BusinessId,
      });
      if (res.status === 200) {
        setBlock(res.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [setBlock]);

  return (
    <Button
      isLoading={loading}
      onClick={handleClick}
      variant={"default"}
      className={`flex justify-center items-center gap-2 hover:bg-red-600 hover:text-white !important text-base font-medium font-serif ${
        block && "bg-red-600"
      }
      `}
    >
      {block ? "Unblock User" : "Block User"}
      <BiBlock />
    </Button>
  );
}
