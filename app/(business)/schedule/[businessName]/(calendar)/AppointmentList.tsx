import classes from "./style.module.css";
import React from "react";
import ToolTip from "./ToolTip";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import NoAppointments from "./NoAppointments";
import { motion } from "framer-motion";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { AppointmentEvent } from "../../../../../types";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    margin: "0",
    padding: "0",
    borderRadius: "1.5rem",
  },
}));

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
  console.log(eventsByDate);

  const noAppointmens = eventsByDate.length === 0;
  const currentDate = dayjs(selectedValue).format("MMMM D, YYYY");
  const scaleSpringTransition = {
    type: "spring",
    stiffness: 750,
    damping: 10,
  };
  return (
    <div
      className={`flex-1 bg-white/20 rounded-3xl ${classes.roboto}   overflow-hidden max-h-full  p-0`}
    >
      <nav
        className={`flex justify-around ${classes.primaryColor} font-semibold rounded-tr-3xl w-full relative top-0 py-3`}
      >
        <div className="flex justify-center items-center gap-5">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={scaleSpringTransition}
          >
            <BsArrowLeftCircle
              className="text-4xl rounded-full hover:bg-white/70 cursor-pointer"
              onClick={() => onSelect(selectedValue.subtract(1, "day"))}
            />
          </motion.div>
          <h2 className={`${classes.roboto} w-max font-normal  text-4xl`}>
            {currentDate}
          </h2>
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={scaleSpringTransition}
          >
            <BsArrowRightCircle
              className="text-4xl rounded-full hover:bg-white/70 cursor-pointer"
              onClick={() => onSelect(selectedValue.add(1, "day"))}
            />
          </motion.div>
        </div>
      </nav>
      <div className="flex w-full items-stretch max-xl:items-center justify-center max-h-full max-xl:flex-col">
        <div className="max-xl:w-full max-xl:py-5 flex justify-center">
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
                  background: `#F4B183`,
                  borderRight: `1px solid #9ca3af`,
                  borderBottomLeftRadius: `1.5rem`,
                  borderBottomRightRadius: `1.5rem`,
                }}
                defaultValue={dayjs()}
              />
            </div>
            <div className="hidden max-xl:flex justify-center ">
              <DatePicker
                value={value}
                closeOnSelect={true}
                className="w-full "
                onChange={(e) => e && onSelect(e)}
                defaultValue={dayjs()}
              />
            </div>
          </LocalizationProvider>
        </div>
        {noAppointmens ? (
          <NoAppointments />
        ) : (
          <ul
            className={`${classes.ul} flex flex-1 w-full flex-col justify-start content-center items-start overflow-y-auto overflow-x-hidden rounded-b-3xl max-h-[27.5rem]`}
          >
            {eventsByDate.map((event, i) => (
              <HtmlTooltip key={event.id} title={<ToolTip event={event} />}>
                <motion.li
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{
                    duration: 0.5,
                    easeInOut: [0, 0.71, 0.2, 1.01],
                  }}
                  className={`w-full bg-black/80 hover:bg-white/90 hover:text-black cursor-pointer text-white relative px-16 py-7 border-b border-white/50 flex justify-between ${classes.roboto} `}
                >
                  <span
                    className={`absolute h-2/3 w-1 bottom-4 left-6 ${event.color} font-extrabold rounded-full`}
                  ></span>
                  <div className="flex flex-col gap-1 justify-center items-start ">
                    <h3 className="font-normal text-lg">
                      {event.treatment.title}
                    </h3>
                    <h4 className="font-light text-lg">
                      {event.customer.name}
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <p className="font-normal text-lg">
                      {dayjs(event.start).format("h:mm A")}
                    </p>
                    <p className="font-light text-lg">
                      {dayjs(event.end).format("h:mm A")}
                    </p>
                  </div>
                </motion.li>
              </HtmlTooltip>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
const MemoizedAppointmentList = React.memo(AppointmentList);

export default MemoizedAppointmentList;
