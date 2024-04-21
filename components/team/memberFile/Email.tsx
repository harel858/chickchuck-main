import React from "react";
import { motion } from "framer-motion";
import { Input } from "antd";
import { MailTwoTone } from "@ant-design/icons";
import { UserFileFormData } from "types/types";

function Email({
  setFormData,
  value,
}: {
  value: string;
  setFormData: React.Dispatch<React.SetStateAction<UserFileFormData>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setFormData((prev) => ({ ...prev, email: value }));
  };
  return (
    <li className="flex flex-row justify-between items-start w-full">
      <p className="text-lg font-serif font-semibold">Email</p>{" "}
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
        <Input
          size="large"
          placeholder="Email"
          type={"email"}
          name={"email"}
          onChange={handleChange}
          value={value}
          prefix={<MailTwoTone />}
        />
      </motion.div>
    </li>
  );
}

export default Email;
