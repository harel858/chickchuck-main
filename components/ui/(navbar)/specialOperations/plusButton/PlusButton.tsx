"use client";
import React from "react";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { TbCalendarPlus } from "react-icons/tb";

import { FloatButton } from "antd";

const App: React.FC = () => (
  <>
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ right: 24 }}
      shape="square"
      icon={<PlusOutlined />}
    >
      <FloatButton
        icon={
          <div className=" text-center flex justify-center items-center">
            <UserAddOutlined className="w-full h-full scale-150" />
          </div>
        }
        shape="square"
        style={{ right: 24 }}
      />

      <FloatButton
        icon={
          <div className="text-center flex justify-center items-center">
            <TbCalendarPlus className="w-full h-full scale-150" />
          </div>
        }
        shape="square"
        style={{ right: 164 }}
      />
    </FloatButton.Group>
  </>
);

export default App;
