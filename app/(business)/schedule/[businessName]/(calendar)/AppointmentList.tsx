import React from "react";
import classes from "./style.module.css";
import { motion } from "framer-motion";
import {
  DateCalendar,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { FaRegCalendarTimes } from "react-icons/fa";
import { AppointmentEvent } from "../../../../../types";
import { Fade } from "react-awesome-reveal";

function AppointmentList({
  value,
  onSelect,
  eventsByDate,
  selectedValue,
}: {
  value: dayjs.Dayjs;
  onSelect: (newValue: Dayjs) => void;
  eventsByDate: AppointmentEvent[];
  selectedValue: dayjs.Dayjs;
}) {
  return (
    <div
      className={` flex-1 bg-white/20 rounded-3xl ${classes.roboto}   overflow-hidden min-h-full  p-0`}
    >
      <nav
        className={`flex justify-around  ${classes.listNav} font-bold  rounded-tr-3xl w-full relative top-0 py-3`}
      >
        <div className="w-fit flex justify-center items-center content-center gap-2">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{
              type: "spring",
              stiffness: 750,
              damping: 10,
            }}
          >
            <BsArrowLeftCircle
              className="text-3xl rounded-full hover:bg-white/90 hover:text-gray-800 cursor-pointer"
              onClick={() => onSelect(selectedValue.subtract(1, "day"))}
            />
          </motion.div>
          <h2 className={`${classes.roboto} w-max font-bold  text-xl`}>
            {dayjs(selectedValue).format("MMMM D, YYYY")}
          </h2>
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 750, damping: 10 }}
          >
            <BsArrowRightCircle
              className="text-3xl rounded-full hover:bg-white/90 hover:text-gray-800 cursor-pointer"
              onClick={() => onSelect(selectedValue.add(1, "day"))}
            />
          </motion.div>
        </div>
      </nav>
      <div className="flex w-full justify-center max-sm:flex-col">
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={value}
              onChange={(e) => e && onSelect(e)}
              className="bg-white/70 max-sm:hidden relative top-0 left-0 border-gray-800 rounded-b-3xl"
              defaultValue={dayjs()}
            />
            <MobileDatePicker
              className="hidden bg-white/70 max-sm:flex text-center "
              value={value}
              closeOnSelect={true}
              onChange={(e) => e && onSelect(e)}
              defaultValue={dayjs()}
            />
          </LocalizationProvider>
        </div>
        {eventsByDate.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex flex-1 flex-col gap-10 justify-center content-center items-center relative top-20"
          >
            <Fade
              delay={250}
              cascade
              damping={0.02}
              className={`text-3xl max-sm:text-lg ${classes.robotoBold}`}
            >
              No Appointments For Today
            </Fade>
            <FaRegCalendarTimes className="text-9xl" />
          </motion.div>
        ) : (
          <ul
            className={`${classes.ul} flex flex-1  flex-col pb-14 justify-start content-center items-start overflow-y-scroll max-h-full rounded-b-3xl`}
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
                  <p className="font-normal">
                    {dayjs(event.end).format("h:mm A")}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AppointmentList;
