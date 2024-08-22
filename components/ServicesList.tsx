import React from "react";
import { List, Typography } from "antd";
import LargeHeading from "@ui/LargeHeading";
import { ActivityDays, Treatment } from "@prisma/client";

function ServicesList({
  services,
  onSelectedService,
  selectedService,
}: {
  services: Treatment[];
  selectedService: Treatment | null;
  onSelectedService: (service: Treatment) => void;
}) {
  console.log("selectedService", selectedService);

  return (
    <List
      className="w-full"
      header={
        <div className="w-full flex justify-center items-center">
          <LargeHeading size={"sm"} className="text-lg text-center font-medium">
            בחר/י שירות{" "}
          </LargeHeading>
        </div>
      }
      bordered
      dataSource={services}
      renderItem={(item) => (
        <List.Item
          onClick={() => onSelectedService(item)}
          className={`cursor-pointer transition-all ease-in-out duration-200 ${
            item.id === selectedService?.id
              ? "bg-slate-900"
              : "hover:bg-slate-400"
          }`}
        >
          <p
            dir="rtl"
            className={`w-full text-right font-bold ${
              item.id === selectedService?.id ? "text-white" : "text-black"
            }`}
          >
            {item.title}
          </p>
        </List.Item>
      )}
    />
  );
}

export default ServicesList;
