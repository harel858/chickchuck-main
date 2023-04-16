import classes from "./style.module.css";
import React from "react";
import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const scaleSpringTransition = {
  type: "spring",
  stiffness: 750,
  damping: 10,
};
function ListNav({
  selectedValue,
  onSelect,
}: {
  selectedValue: dayjs.Dayjs;
  onSelect: (newValue: Dayjs) => void;
}) {
  const currentDate = dayjs(selectedValue).format("MMMM D, YYYY");

  return (
    <nav
      className={`flex justify-around ${classes.primaryColor} font-semibold rounded-tr-3xl w-full relative top-0 py-3`}
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
        <h2 className={`${classes.roboto} w-max font-normal  text-4xl`}>
          {currentDate}
        </h2>
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
