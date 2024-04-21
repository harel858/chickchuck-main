import React from "react";
import { motion } from "framer-motion";
import { Select, Space } from "antd";
import { UserFileFormData } from "types/types";
import { Treatment } from "@prisma/client";
const { Option } = Select;

function MemberServices({
  setFormData,
  value,
  allServices,
}: {
  value: Treatment[];
  setFormData: React.Dispatch<React.SetStateAction<UserFileFormData>>;
  allServices: Treatment[];
}) {
  const handleChange = (e: string[]) => {
    const newData = allServices.filter((service) =>
      e.some((title) => service.title == title)
    );
    console.log(newData);
    setFormData((prev) => ({ ...prev, services: newData }));
  };
  return (
    <li className="flex flex-row justify-between items-start w-full">
      <p className="text-lg font-serif font-semibold">Services</p>
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
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="select one country"
          defaultValue={value.map((item) => item.title)}
          onChange={handleChange}
          optionLabelProp="label"
        >
          {allServices.map((item) => (
            <Option key={item.id} value={item.title} label={item.title}>
              <Space>
                <span role="img" aria-label="China">
                  {item.title}
                </span>
                {item.title}
              </Space>
            </Option>
          ))}
        </Select>
      </motion.div>
    </li>
  );
}

export default MemberServices;
