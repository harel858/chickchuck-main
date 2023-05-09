import classes from "./style.module.css";
import React from "react";
import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { ScheduleProps } from "../../../types/types";
import CalendarPagination from "./CalendarPagination";

const scaleSpringTransition = {
  type: "spring",
  stiffness: 750,
  damping: 10,
};
function ListNav({
  scheduleProps,
  selectedValue,
  onSelect,
}: {
  scheduleProps: ScheduleProps;
  selectedValue: dayjs.Dayjs;
  onSelect: (newValue: Dayjs) => void;
}) {
  const currentDate = dayjs(selectedValue).format("MMMM D, YYYY");

  return (
    <nav
      className={`flex flex-col justify-around bg-orange-300 dark:bg-orange-300/75 font-extralight rounded-tr-3xl w-full relative top-0 py-3 gap-2`}
    >
      <div className="flex justify-center items-center gap-5">
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
        <h2 className={`w-max font-extralight text-4xl`}>{currentDate}</h2>
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
    </nav>
  );
}

export default ListNav;
