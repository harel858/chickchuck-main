"use client";
import React from "react";
import { motion } from "framer-motion";

function SearchClient({
  onSearchChange,
  searchQuery,
}: {
  onSearchChange: (value: string) => void;
  searchQuery: string;
}) {
  return (
    <motion.input
      transition={{ type: "spring", stiffness: 750, damping: 10 }}
      whileHover={{ scale: 1.05 }}
      type="text"
      placeholder="חיפוש"
      value={searchQuery}
      onChange={(e) => {
        onSearchChange(e.target.value);
      }}
      className="dark:text-white px-2 py-1 text-xl rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default SearchClient;
