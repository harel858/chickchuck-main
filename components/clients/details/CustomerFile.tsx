import React from "react";
import {
  BsFillPersonBadgeFill,
  BsFillTelephoneForwardFill,
} from "react-icons/bs";
import { CustomerItem } from "types/types";
import Typography from "@mui/material/Typography";
import { Button } from "@ui/Button";
import ToggleBlock from "./ToggleBlock";

function Customer({ customer }: { customer: CustomerItem }) {
  return (
    <div className="p-0 w-full flex flex-col justify-start items-center h-80 overflow-x-hidden overflow-y-auto gap-10">
      <h2 className="text-2xl font-medium flex flex-row items-center justify-center gap-2">
        Client File
        <BsFillPersonBadgeFill className="text-2xl" />
      </h2>
      <ul className="p-0 flex flex-col justify-center items-center gap-2 w-full">
        <li className="flex flex-row justify-between items-center w-full">
          <p className="text-lg font-serif font-semibold">Name</p>
          <p className="text-lg font-semibold text-gray-600">{customer.name}</p>
        </li>
        <li className="flex flex-row justify-between items-center w-full">
          <p className="text-lg font-serif font-semibold">Phone</p>
          <a href={`tel:${customer.phoneNumber}`}>
            <Button
              variant={"default"}
              className={`flex justify-center items-center gap-2 text-base font-medium font-serif"
      `}
            >
              {customer.phoneNumber}
              <BsFillTelephoneForwardFill />
            </Button>
          </a>
        </li>
        <li className="flex flex-row justify-between items-center w-full">
          <p className="text-lg font-serif font-semibold">Block</p>
          <ToggleBlock customer={customer} />
        </li>
      </ul>
    </div>
  );
}

export default Customer;
