import dayjs from "dayjs";
import React from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { AppointmentEvent } from "../../../../../types";

function AppointmentList({
  eventsByDate,
  selectedValue,
}: {
  eventsByDate: AppointmentEvent[];
  selectedValue: any;
}) {
  return (
    <div className="bg-white/20 min-w-full rounded-3xl flex-1 relative ">
      <nav className="flex justify-around bg-white rounded-t-3xl w-full absolute top-0 py-6">
        <div className="w-fit flex">
          <BsFillArrowLeftCircleFill className="text-2xl" />
          <BsFillArrowRightCircleFill className="text-2xl" />
        </div>
        <h3>{dayjs(selectedValue).format("MMMM D, YYYY")}</h3>
      </nav>
      <ul>
        {eventsByDate.map((event, i) => (
          <li key={i}>{event.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
