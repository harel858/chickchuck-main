"use client";
import React, { useEffect, useState } from "react";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs, TabsProps } from "antd";
import { Session } from "next-auth";
import { ActivityDays, Business } from "@prisma/client";
import Accordion from "./Accordion";
import { MdBusinessCenter } from "react-icons/md";

const Profile = ({
  link,
  user,
  session,
  business,
}: {
  business: Business & { activityDays: ActivityDays[] };
  link: string;
  user: any;
  session: Session;
}) => {
  const items: TabsProps["items"] = [
    {
      key: "0",
      label: `הגדרות עסק`,
      children: <Accordion business={business} />,
    },
    {
      key: "1",
      label: `מנוי`,
      children: <></>,
    },
  ];
  return (
    <div className="flex justify-center items-center mt-10">
      <Tabs
        defaultActiveKey="0"
        className="max-md:w-full w-1/2 bg-white px-2 pb-10 rounded-2xl"
        items={items}
      />
    </div>
  );
};

export default Profile;
