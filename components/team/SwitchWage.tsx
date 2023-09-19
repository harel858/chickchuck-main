import React from "react";
import { Switch } from "antd";

const SwitchWage = ({
  setTypeOfWage,
  typeOfWage,
}: {
  typeOfWage: "GLOBALY" | "HOURLY";
  setTypeOfWage: React.Dispatch<React.SetStateAction<"GLOBALY" | "HOURLY">>;
}) => (
  <Switch
    className={`${typeOfWage === "GLOBALY" && "bg-gray-500"}`}
    checkedChildren={typeOfWage}
    unCheckedChildren={typeOfWage}
    checked={typeOfWage === "HOURLY"}
    onChange={() =>
      setTypeOfWage((prev) => (prev === "GLOBALY" ? "HOURLY" : "GLOBALY"))
    }
  />
);

export default SwitchWage;
