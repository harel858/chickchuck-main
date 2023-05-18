import React from "react";
import { BsFillCalendarWeekFill, BsCardList } from "react-icons/bs";
import { motion } from "framer-motion";
import { IconType } from "react-icons/lib";

const scaleSpringTransition = {
  type: "spring",
  stiffness: 750,
  damping: 30,
  duration: 300,
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
  duration: 300,
};

export default function ToggleView({
  currentView,
  setCurrentView,
}: {
  currentView: "list" | "calendar";
  setCurrentView: React.Dispatch<React.SetStateAction<"list" | "calendar">>;
}) {
  const handleChange = React.useCallback(() => {
    setCurrentView((prevView) => (prevView === "list" ? "calendar" : "list"));
  }, [setCurrentView]);

  const renderIcon = (IconComponent: IconType) => (
    <motion.div
      whileHover={{ scale: 1.2 }}
      transition={scaleSpringTransition}
      className="text-2xl"
    >
      <IconComponent />
    </motion.div>
  );

  return (
    <motion.div
      data-currentview={currentView}
      className="relative right-0 border-2 border-blue-700 cursor-pointer flex flex-row items-center justify-start gap-7 bg-white/40 rounded-full py-2 data-[currentview=calendar]:justify-end"
      onClick={handleChange}
    >
      <div className="ml-2">{renderIcon(BsCardList)}</div>
      <div className="mr-2">{renderIcon(BsFillCalendarWeekFill)}</div>
      <motion.div
        className="absolute p-5 bg-blue-500 rounded-full"
        layout
        transition={spring}
      />
    </motion.div>
  );
}
