import classes from "./style.module.css";
import React from "react";
import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { AppointmentEvent, ScheduleProps } from "../../../types/types";
import CalendarPagination from "./CalendarPagination";
import ToggleView from "./ToggleView";
import { Button } from "@ui/Button";

const scaleSpringTransition = {
  type: "spring",
  stiffness: 750,
  damping: 10,
};
function ListNav({
  scheduleProps,
  selectedValue,
  onSelect,
  setCurrentView,
  currentView,
}: {
  scheduleProps: ScheduleProps;
  selectedValue: dayjs.Dayjs;
  onSelect: (newValue: Dayjs) => void;
  currentView: "list" | "calendar";
  setCurrentView: React.Dispatch<React.SetStateAction<"list" | "calendar">>;
}) {
  const [eventsByDate, setEventsByDate] = React.useState<AppointmentEvent[]>(
    []
  );
  const currentDate = dayjs(selectedValue).format("MMMM D, YYYY");

  return (
    <nav
      className={`flex flex-row-reverse content-center justify-center items-center bg-orange-200 dark:bg-orange-300/75 font-extralight rounded-tr-3xl rounded-tl-3xl  w-full relative top-0 py-3 gap-5`}
    >
      <ToggleView setCurrentView={setCurrentView} currentView={currentView} />
      <div className="flex justify-center self-center items-center gap-1">
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={scaleSpringTransition}
        >
          <BsArrowLeftCircle
            className="text-4xl rounded-full hover:bg-white/70 cursor-pointer"
            onClick={() => onSelect(selectedValue.subtract(1, "day"))}
          />
        </motion.div>
        {currentView === "list" ? (
          <h2 className={`w-max font-light text-4xl`}>{currentDate}</h2>
        ) : (
          <Button
            variant={"ghost"}
            className="rounded-3xl"
            onClick={() => onSelect(dayjs())}
          >
            Today
          </Button>
        )}
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={scaleSpringTransition}
        >
          <BsArrowRightCircle
            className="text-4xl rounded-full hover:bg-white/70 cursor-pointer"
            onClick={() => onSelect(selectedValue.add(1, "day"))}
          />
        </motion.div>
      </div>
      {/*       <CalendarPagination scheduleProps={scheduleProps} />
       */}
    </nav>
  );
}

export default ListNav;
