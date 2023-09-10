import React from "react";
import { motion } from "framer-motion";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

function NameField({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <motion.div
      key={"name"}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="w-11/12 flex flex-col items-center justify-center"
    >
      <Input
        onChange={handleChange}
        name={"name"}
        size="large"
        placeholder="User Name"
        prefix={<UserOutlined />}
      />
    </motion.div>
  );
}

export default NameField;
