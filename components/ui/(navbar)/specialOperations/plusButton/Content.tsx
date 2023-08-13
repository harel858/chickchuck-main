import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Customer from "./Customer";
import Appointment from "./appointment/Appointment";
import { BusinessData } from "types/types";
import {
  BsCalendarPlusFill,
  BsFillPersonPlusFill,
  BsJournalPlus,
} from "react-icons/bs";

export default function Content({
  businessData,
}: {
  businessData: BusinessData;
}) {
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
                  Customer <BsFillPersonPlusFill className="text-xl" />
                </h4>
              }
              value="1"
            />
            <Tab
              label={
                <h4 className="flex justify-center items-center gap-2">
                  Appointment <BsCalendarPlusFill className="text-xl" />
                </h4>
              }
              value="2"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Customer bussinesId={businessData.business.id} />
        </TabPanel>
        <TabPanel value="2">
          <Appointment businessData={businessData} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
