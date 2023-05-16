import classes from "./style.module.css";
import React from "react";
import NoAppointments from "./NoAppointments";
import {
  LocalizationProvider,
  MobileDatePicker,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import Event from "./Event";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { AppointmentEvent } from "../../../types/types";
import { motion } from "framer-motion";

function AppointmentList({
  value,
  onSelect,
  eventsByDate,
}: {
  value: dayjs.Dayjs;
  onSelect: (newValue: Dayjs) => void;
  eventsByDate: AppointmentEvent[];
}) {
  console.log(eventsByDate);

  const noAppointmens = eventsByDate.length === 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          easeInOut: [0, 0.71, 0.2, 1.01],
        }}
        className="flex w-full items-stretch max-xl:items-center justify-center max-h-max max-xl:flex-col"
      >
        <div className="max-xl:w-full flex justify-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="max-xl:hidden">
              <StaticDatePicker
                value={value}
                slotProps={{
                  toolbar: { toolbarFormat: "ddd DD MMMM", hidden: false },
                }}
                displayStaticWrapperAs="desktop"
                onChange={(e) => e && onSelect(e)}
                sx={{
                  borderRight: `1px solid rgb(107 114 128)`,
                  borderBottomLeftRadius: `1.5rem`,
                  background: "rgb(254 215 170)",
                }}
                className="dark:bg-orange-300/75"
                defaultValue={dayjs()}
              />
            </div>
            <div className="hidden relative max-xl:flex border border-gray-500 cursor-pointer justify-center items-center content-center w-full">
              <MobileDatePicker
                value={value}
                closeOnSelect={true}
                sx={{
                  width: "100%",
                  background: `#ff9650`,
                  textAlign: "center",
                }}
                onChange={(e) => e && onSelect(e)}
                defaultValue={dayjs()}
              ></MobileDatePicker>
            </div>
          </LocalizationProvider>
        </div>
        {noAppointmens ? (
          <NoAppointments />
        ) : (
          <ul
            className={`${classes.ul} flex flex-1 w-full flex-col justify-start content-center items-start overflow-y-auto overflow-x-hidden border-t border-gray-500 rounded-bl-3xl rounded-br-3xl max-h-[27.5rem] `}
          >
            {eventsByDate.map((event, i) => (
              <Event key={event.id} i={i} event={event} />
            ))}
          </ul>
        )}
      </motion.div>
    </>
  );
}
const MemoizedAppointmentList = React.memo(AppointmentList);

export default MemoizedAppointmentList;
