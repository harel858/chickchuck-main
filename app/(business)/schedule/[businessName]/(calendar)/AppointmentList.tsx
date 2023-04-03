import React from "react";
import { motion } from "framer-motion";
import classes from "./style.module.css";
import dayjs, { Dayjs } from "dayjs";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
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
    <div className="bg-white/20  rounded-bl-3xl rounded-tr-3xl  rounded-br-3xl  flex-1 ">
      <nav
        className={`flex justify-around bg-yellow-200 rounded-tr-3xl w-full relative top-0 py-3`}
      >
        <div className="w-fit flex justify-center items-center content-center gap-2">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <BsArrowLeftCircle
              className="text-3xl rounded-full hover:bg-white/90 hover:text-gray-800 cursor-pointer"
              onClick={() => onSelect(selectedValue.subtract(1, "day"))}
            />
          </motion.div>
          <h2 className={`${classes.roboto} font-medium text-2xl`}>
            {dayjs(selectedValue).format("MMMM D, YYYY")}
          </h2>
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <BsArrowRightCircle
              className="text-3xl rounded-full hover:bg-white/90 hover:text-gray-800 cursor-pointer"
              onClick={() => onSelect(selectedValue.add(1, "day"))}
            />
          </motion.div>
        </div>
      </nav>
      <ul
        className={`flex flex-col justify-start content-center items-start max-h-full overflow-y-scroll rounded-b-3xl ${classes.ul}`}
      >
        {eventsByDate.map((event, i) => (
          <motion.li
            key={event.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={`w-full bg-white/90 relative p-5 border-b-2 border-gray-800/10 flex justify-between ${classes.roboto} `}
          >
            <span className="absolute h-2/3 w-1 bottom-4 left-1 bg-green-500 font-extrabold rounded-full"></span>
            <h3 className="font-bold">{event.text}</h3>
            <div>
              <p className="font-semibold">
                {dayjs(event.start).format("h:mm A")}
              </p>
              <p className="font-normal">{dayjs(event.end).format("h:mm A")}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
