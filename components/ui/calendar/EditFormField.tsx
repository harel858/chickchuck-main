import "./antd.css";
import { Input } from "@components/input";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import { Select, TimePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import { EditData, EditProps } from "./EditEvent";
import TextArea from "antd/es/input/TextArea";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function EditFormField({
  props,
  scheduleObj,
  customers,
  services,
  setEvent,
  event,
}: {
  props: EditProps;
  scheduleObj: React.RefObject<ScheduleComponent>;
  customers: {
    value: string;
    label: string;
  }[];
  services: {
    value: string;
    label: string;
  }[];
  setEvent: React.Dispatch<React.SetStateAction<EditData | null>>;
  event: EditData | null;
}) {
  const format = "HH:mm";

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 px-5">
      <TimePicker.RangePicker
        defaultValue={[
          dayjs(new Date(props.StartTime).toISOString()),
          dayjs(new Date(props.EndTime).toISOString()),
        ]}
        format={format}
        popupStyle={{ color: "black" }}
        onChange={(values, formatString) => {
          event &&
            setEvent({
              ...event,
              StartTime: dayjs(values?.[0]).toISOString(),
              EndTime: dayjs(values?.[1]).toISOString(),
            });
        }}
        className="w-10/12"
      />
      <Select
        showSearch
        size="large"
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={customers}
        onSelect={(e, option) => {
          event && setEvent({ ...event, customer: option });
        }}
        value={event?.customer}
        className="w-10/12"
      />

      <Select
        showSearch
        size="large"
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={services}
        onSelect={(e, option) => {
          event && setEvent({ ...event, service: option });
        }}
        value={event?.service}
        className="w-10/12"
      />
      <TextArea
        rows={4}
        placeholder="maxLength is 255"
        className="focus:bg-white bg-white !important w-10/12"
        maxLength={255}
        onChange={(e) => {
          const {
            target: { value },
          } = e;
          event && setEvent({ ...event, description: value });
        }}
      />
    </div>
  );
}

export default EditFormField;
