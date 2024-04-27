import React from "react";
import { UserOutlined } from "@ant-design/icons";

function resourceHeaderTemplate(props: any) {
  const getEmployeeName = (value: any) => {
    return value.resourceData
      ? value.resourceData[value.resource.textField]
      : value.resourceName;
  };

  return (
    <div className="template-wrap flex justify-center items-center flex-wrap gap-2">
      <div className={"resource-image "}>
        <UserOutlined className="text-2xl" />
      </div>
      <div className="resource-details">
        <div className="resource-name font-bold text-xl">
          {getEmployeeName(props)}
        </div>
      </div>
    </div>
  );
}

export default resourceHeaderTemplate;
