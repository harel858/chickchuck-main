import React from "react";
import { motion } from "framer-motion";
import { Input, Tooltip } from "antd";
import { UserFileFormData } from "types/types";
import { DollarTwoTone } from "@ant-design/icons";
interface NumericInputProps {
  defaultValue: string | null;
  value: string | null;

  onChange: React.Dispatch<React.SetStateAction<UserFileFormData>>;
}
const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange, defaultValue } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange((prev) => ({ ...prev, salary: inputValue }));
    }
  };

  // Ensure value is not null before formatting
  const formattedValue = value !== null ? value : null;

  const title =
    formattedValue !== "" ? (
      <span className="numeric-input-title">
        {formattedValue !== "-" ? formattedValue : "-"}
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
        placeholder={"Enter Amount"}
        maxLength={10}
        min={0}
        size="large"
        defaultValue={defaultValue ? defaultValue : ""}
        prefix={<DollarTwoTone />}
        className="w-full"
        // Ensure value is not null before passing to Input
        value={value !== null ? value : ""}
      />
    </Tooltip>
  );
};
function WageField({
  defaultValue,
  value,
  setFormData,
}: {
  defaultValue: string | null;
  value: string | null;
  setFormData: React.Dispatch<React.SetStateAction<UserFileFormData>>;
}) {
  return (
    <motion.div
      key={"Salary"}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="w-8/12 flex flex-col items-center justify-self-end"
    >
      <NumericInput
        defaultValue={defaultValue}
        value={value}
        onChange={setFormData}
      />
    </motion.div>
  );
}

export default WageField;
