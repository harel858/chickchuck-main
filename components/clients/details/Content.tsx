import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CustomerFile from "./CustomerFile";
import Operations from "./Operations";
import { CustomerItem } from "types/types";
import { BsCalendarPlusFill, BsFillPersonPlusFill } from "react-icons/bs";
import History from "./History";
import { FaHistory } from "react-icons/fa";
import LargeHeading from "@ui/LargeHeading";

export default function Content({ customer }: { customer: CustomerItem }) {
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
                  Customer File <BsFillPersonPlusFill className="text-xl" />
                </h4>
              }
              value="1"
            />
            <Tab
              label={
                <h4 className="flex justify-center items-center gap-2">
                  History <FaHistory className="text-xl" />
                </h4>
              }
              value="2"
            />
            <Tab
              label={
                <h4 className="flex justify-center items-center gap-2">
                  Operations <BsCalendarPlusFill className="text-xl" />
                </h4>
              }
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CustomerFile customer={customer} />
        </TabPanel>
        <TabPanel value="2">
          <History appointments={customer.appointments} />
        </TabPanel>
        <TabPanel value="3">
          <Operations customer={customer} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
