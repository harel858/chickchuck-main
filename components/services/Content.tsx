import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import Form from "./Form/Form";

export default function Content({ businessId }: { businessId: string }) {
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
            <Tab
              label={
                <h4 className="flex justify-center items-center gap-2">
                  Advance Settings <CiCircleMore className="text-xl" />
                </h4>
              }
              value="2"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Form businessId={businessId} />
        </TabPanel>
        <TabPanel value="2">
          <Form businessId={businessId} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
