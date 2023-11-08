import React, { useState } from "react";
import { message } from "antd";
import Content from "./Content";
import { Modal, Tabs, Tooltip } from "antd";
import dayjs from "dayjs";
import { TbCalendarPlus } from "react-icons/tb";
import { ClockCircleTwoTone, CoffeeOutlined } from "@ant-design/icons";

function TimeSlot({ props }: { props: any }) {
  const [modalOpen, setModaOpen] = useState(false);
  const time = props?.record?.key;
  const date = dayjs(props?.record?.date);

  const isToday = (date: string) =>
    dayjs(date).format("DD/MM/YYY") == dayjs().format("DD/MM/YYYY");

  const validDate = date.isAfter(dayjs());

  return (
    <>
      <Tooltip key={time} title={time}>
        <td
          {...props}
          onMouseEnter={null}
          onMouseLeave={null}
          className={`p-0 h-5 !important py-2 w-40 border-l-2 !important border-t-0 !important border-b-2 !important border-r-0 !important border-gray-500/50 !important border-solid !important cursor-pointer hover:bg-purple-200   ${
            isToday(time) ? "bg-slate-700" : "bg-white"
          } `}
          onClick={() => {
            if (validDate) return setModaOpen(true);
            message.error("somthing went wrong");
          }}
        />
      </Tooltip>
      <Modal
        title={
          <div className="flex flex-row justify-center items-start  gap-2">
            <h3 className="font-sans text-2xl">
              {dayjs(props?.record?.date)?.format("dddd D")}, {time}
            </h3>
            <ClockCircleTwoTone className="text-4xl p-0" />
          </div>
        }
        className="pt-5"
        open={modalOpen}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setModaOpen(false);
        }}
        styles={{
          body: {
            background: "rgba(254,215,170,0.7)",
            borderRadius: "3em",
            padding: "2em",
            margin: "0 auto",
          },
        }}
      >
        <Content props={props} />
      </Modal>
    </>
  );
}

export default TimeSlot;
