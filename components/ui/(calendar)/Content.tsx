import { CoffeeOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React from "react";
import { TbCalendarPlus } from "react-icons/tb";
import Appointment from "./Appointment";

function Content({ props }: { props: any }) {
  return (
    <Tabs
      defaultActiveKey="1"
      size="large"
      items={[
        {
          title: "Appointment",
          Icon: <TbCalendarPlus className="text-2xl" />,
          children: <Appointment props={props} />,
        },
        {
          title: "Break",
          Icon: <CoffeeOutlined className="text-2xl" />,
          children: <></>,
        },
      ].map(({ Icon, title, children }, i) => {
        const id = String(i + 1);

        return {
          label: (
            <p className="flex justify-center items-center gap-2">
              {Icon}
              {title}
            </p>
          ),
          key: id,
          children: children,
        };
      })}
    />
  );
}

export default Content;
