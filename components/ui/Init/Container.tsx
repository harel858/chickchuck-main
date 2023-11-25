"use client";
import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import InitDetails from "./InitDetails";
import type { Session } from "next-auth";

const steps = [
  {
    title: "First",
    content: "First-content",
  },
  {
    title: "Second",
    content: <InitDetails />,
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

const Container = ({ session }: { session: Session }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    width: "100%",
    minHeight: "70vh",
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <Steps
        /*         progressDot
         */ direction="horizontal"
        current={current}
        items={items}
        className="w-full mb-2"
      />
      <div style={contentStyle} className="flex justify-center items-center">
        {steps[current]?.content}
      </div>
      <div className="mt-2 space-x-4">
        {current < steps.length - 1 && (
          <Button className="bg-sky-600" type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            className="bg-sky-600"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            className="bg-slate-800 text-white hover:bg-transparent"
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default Container;
