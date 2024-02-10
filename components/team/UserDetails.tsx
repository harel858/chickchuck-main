/* import React, { ReactNode } from "react";
import { notification, Tabs } from "antd";
import { FaBusinessTime, FaRegUserCircle } from "react-icons/fa";
import UserActivity from "./UserActivity";
import { BreakTime, Treatment, User } from "@prisma/client";
import UserFile from "./UserFile";
import { NotificationPlacement } from "antd/es/notification/interface";
interface TabData {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function UserDetails({
  user,
  allServices,
  allBreakTimes,
  setModalOpen,
  bussinesClosingTime,
  bussinesOpeningTime,
}: {
  user: User & {
    Treatment: Treatment[];
    BreakTime: BreakTime[];
  };
  allBreakTimes: BreakTime[];
  allServices: Treatment[];
  bussinesOpeningTime: number;
  bussinesClosingTime: number;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const tabs: TabData[] = [
    {
      label: "Member File",
      icon: <FaRegUserCircle className="text-2xl" />,
      children: (
        <UserFile
          setModalOpen={setModalOpen}
          allServices={allServices}
          user={user}
        />
      ),
    },
    {
      label: "Member Activity",
      icon: <FaBusinessTime className="text-2xl" />,
      children: (
        <UserActivity
          allBreakTimes={allBreakTimes}
          user={user}
          setModalOpen={setModalOpen}
          bussinesOpeningTime={bussinesOpeningTime}
          bussinesClosingTime={bussinesClosingTime}
        />
      ),
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
 */

export {};
