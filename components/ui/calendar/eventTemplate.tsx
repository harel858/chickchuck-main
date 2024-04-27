import React from "react";
import dayjs from "dayjs";

function eventTemplate(props: any) {
  const getTimeString = (value: any) => {
    return dayjs(value).format("h:mm");
  };
  return (
    <div className="template-wrap" style={{ background: props.SecondaryColor }}>
      <div
        className="subject flex flex-row-reverse flex-wrap justify-center gap-2 items-center"
        style={{ background: props.PrimaryColor }}
      >
        <p className="font-semibold text-xl">
          - {props?.ExtendedProperties?.private?.customerName || ""}{" "}
        </p>
        <p className="font-semibold text-xl">
          {getTimeString(props.StartTime)} -{getTimeString(props.EndTime)}
        </p>
      </div>
    </div>
  );
}
export default eventTemplate;
