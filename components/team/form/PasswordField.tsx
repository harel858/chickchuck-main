import React from "react";
import { Input } from "antd";
import { motion } from "framer-motion";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function PasswordField({
  handleChange,
  error,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <motion.div
      key={"password"}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="flex flex-col items-center justify-center gap-2"
    >
      <Input.Password
        onChange={handleChange}
        name={"password"}
        size="large"
        placeholder="Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
      />
      <Input.Password
        onChange={handleChange}
        name={"confirm password"}
        size="large"
        placeholder="Confirm Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
      />
    </motion.div>
  );
}

export default PasswordField;
