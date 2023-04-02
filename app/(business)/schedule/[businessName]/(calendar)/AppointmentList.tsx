import React from "react";
import { motion } from "framer-motion";
import classes from "./style.module.css";
import dayjs, { Dayjs } from "dayjs";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { AppointmentEvent } from "../../../../../types";

function AppointmentList({
  onSelect,
  eventsByDate,
  selectedValue,
}: {
  onSelect: (newValue: Dayjs) => void;
  eventsByDate: AppointmentEvent[];
  selectedValue: dayjs.Dayjs;
}) {
  return (
    <div className="bg-white/20 rounded-tr-3xl min-h-screen flex-1 ">
      <nav className="flex justify-around bg-orange-500 rounded-tr-3xl w-full relative top-0 py-3">
        <div className="w-fit flex gap-2">
          <BsFillArrowLeftCircleFill
            className="text-2xl"
            onClick={() => onSelect(selectedValue.subtract(1, "day"))}
          />
          <h3 className={`${classes.poppins}`}>
            {dayjs(selectedValue).format("MMMM D, YYYY")}
          </h3>
          <BsFillArrowRightCircleFill
            className="text-2xl"
            onClick={() => onSelect(selectedValue.add(1, "day"))}
          />
        </div>
      </nav>
      <ul className="flex flex-col justify-start content-center items-start">
        {eventsByDate.map((event, i) => (
          <li
            className={`w-full bg-white/90 relative p-5 border-b-2 border-gray-800/10 flex justify-between ${classes.poppins} `}
          >
            <span className="absolute h-2/3 w-1 bottom-4 left-1 bg-green-500 font-extrabold rounded-full"></span>
            <h3 className="font-bold">{event.text}</h3>
            <div>
              <p className="font-semibold">
                {dayjs(event.start).format("h:mm A")}
              </p>
              <p className="font-normal">{dayjs(event.end).format("h:mm A")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
