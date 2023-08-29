import React from "react";
import ServiceFile from "./ServiceFile";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { Treatment } from "@prisma/client";

export default function Content({ treatment }: { treatment: Treatment }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label={
                <h4 className="flex justify-center items-center gap-2">
                  Service Settings <BsFillPersonBadgeFill className="text-xl" />
                </h4>
              }
              value="1"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          {/*           <ServiceFile businessId={treatment.businessId} />
           */}{" "}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
