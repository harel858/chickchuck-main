import React, { ReactNode } from "react";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { FaBusinessTime, FaRegUserCircle } from "react-icons/fa";
import UserActivity from "./UserActivity";
import { Treatment, User } from "@prisma/client";
import UserFile from "./UserFile";
interface TabData {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function UserDetails({
  user,
  allServices,
}: {
  user: User & {
    Treatment: Treatment[];
  };
  allServices: Treatment[];
}) {
  const tabs: TabData[] = [
    {
      label: "Member File",
      icon: <FaRegUserCircle className="text-2xl" />,
      children: <UserFile allServices={allServices} user={user} />,
    },
    {
      label: "Member Activity",
      icon: <FaBusinessTime className="text-2xl" />,
      children: <UserActivity user={user} />,
    },
  ];
  return (
    <Tabs
      defaultActiveKey="1"
      items={tabs.map(({ label, icon, children }, i) => {
        const id = String(i + 1);

        return {
          label: (
            <div className="flex flex-row gap-2 justify-center items-center">
              {icon}
              <p className="text-lg font-normal font-serif">{label}</p>
            </div>
          ),
          key: id,
          children: children,
        };
      })}
    />
  );
}
