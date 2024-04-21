import React from "react";
import { motion } from "framer-motion";
import { Input, Tooltip } from "antd";
import { CreateUserForm, UserFileFormData } from "types/types";
import { PhoneTwoTone } from "@ant-design/icons";
interface NumericInputProps {
  value: string;
  onChange:
    | React.Dispatch<React.SetStateAction<CreateUserForm>>
    | React.Dispatch<React.SetStateAction<UserFileFormData>>;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange((prev: any) => ({ ...prev, "phone Number": inputValue }));
    }
  };

  const title = value ? (
    <span className="numeric-input-title">
      {value !== "-" ? formatNumber(Number(value)) : "-"}
    </span>
  ) : (
    "Input a number"
  );

  return (
    <Tooltip
      trigger={["focus"]}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
      className="w-full"
    >
      <Input
        {...props}
        onChange={handleChange}
        placeholder="Phone Number"
        maxLength={10}
        minLength={10}
        size="large"
        prefix={<PhoneTwoTone />}
        className="w-full"
      />
    </Tooltip>
  );
};

function PhoneFiled({
  value,
  setUserFormData,
}: {
  value: string;
  setUserFormData:
    | React.Dispatch<React.SetStateAction<CreateUserForm>>
    | React.Dispatch<React.SetStateAction<UserFileFormData>>;
}) {
  return (
    <motion.div
      key={"Phone Number"}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="w-8/12 flex flex-col items-center justify-self-end"
    >
      <NumericInput value={value} onChange={setUserFormData} />
    </motion.div>
  );
}

export default PhoneFiled;
