import { Select } from "antd";
import React from "react";
import { AdditionData } from "./SyncfusionCalendar";

function FormFiled({
  data,
  event,
  index: i,
  setEvent,
}: {
  data: {
    value: string;
    label: string;
  }[];
  index: number;
  setEvent: React.Dispatch<React.SetStateAction<AdditionData | null>>;
  event: AdditionData | null;
}) {
  console.log("data", data);

  const value = i === 0 ? event?.customer : event?.service;
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      size="large"
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={data}
      onSelect={(e, option) => {
        i === 0
          ? setEvent({ ...event, customer: option })
          : setEvent({ ...event, service: option });
      }}
      value={value}
    />
  );
}

export default FormFiled;
