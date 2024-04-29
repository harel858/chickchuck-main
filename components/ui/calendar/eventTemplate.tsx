import React from "react";
import dayjs from "dayjs";

function eventTemplate(props: any) {
  const getTimeString = (value: any) => {
    return dayjs(value).format("h:mm");
  };
  console.log("props", props);

  return (
    <div
      className="flex flex-col justify-start items-center w-full relative"
      style={{ background: props.SecondaryColor }}
    >
      <p className="absolute top-0 right-0 font-semibold text-base text-justify max-md:text-xs">
        {props?.Subject || ""}
      </p>

      <p className="absolute top-5 right-0 font-semibold text-base max-md:text-xs">
        {props?.ExtendedProperties?.private?.customerName || ""}
      </p>
      <p className="absolute top-10 right-0 font-semibold text-sm max-md:text-xs flex flex-wrap">
        <span>{getTimeString(props.StartTime)} - </span>
        <span> {getTimeString(props.EndTime)}</span>
      </p>
    </div>
  );
}
export default eventTemplate;
