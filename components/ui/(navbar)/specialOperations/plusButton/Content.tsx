import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Customer from "./Customer";
import Appointment from "./appointment/Appointment";
import { BusinessData } from "types/types";

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
            <Tab label="Customer" value="1" />
            <Tab label="Appointment" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Customer />
        </TabPanel>
        <TabPanel value="2">
          <Appointment businessData={businessData} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
