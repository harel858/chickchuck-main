import React from "react";
import { motion } from "framer-motion";
import { BsArrowLeftCircle } from "react-icons/bs";

const scaleSpringTransition = {
  type: "spring",
  stiffness: 750,
  damping: 10,
  duration: 0.3,
};

function LeftArrow({ onClickHandler }: { onClickHandler: () => void }) {
  return (
    <motion.div
      key="arrowLeft"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      transition={scaleSpringTransition}
    >
      <BsArrowLeftCircle
        className="text-3xl text-black rounded-full hover:bg-white/70 cursor-pointer"
        onClick={onClickHandler}
      />
    </motion.div>
  );
}

export default LeftArrow;
