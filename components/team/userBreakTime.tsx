import React, { useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { BreakTime } from "@prisma/client";
import dayjs from "dayjs";
type RequiredDocument = {
  id: string;
  name: string;
  businessId: string;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, selectedNames: string[], theme: Theme) {
  return {
    fontWeight: selectedNames.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function UserBreakTime({
  allBreakTimes,
  userBreakTime,
  setBreaks,
}: {
  allBreakTimes: BreakTime[];
  userBreakTime: BreakTime[];
  setBreaks: React.Dispatch<React.SetStateAction<BreakTime[]>>;
}) {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  useEffect(() => {
    if (userBreakTime) {
      const initValue = userBreakTime.map(
        (item) => `${item.StartTime} - ${item.EndTime}`
      );
      setPersonName(initValue);
    }
  }, [userBreakTime]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    setPersonName(selectedValues);

    const newValue = allBreakTimes.filter((item) =>
      selectedValues.some((selected) => {
        const [start, end] = selected.split(" - ");
        return start === item.StartTime && end === item.EndTime;
      })
    );
    console.log("newValue", newValue);
    setBreaks(newValue);
  };

  return (
    <React.StrictMode>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Break Times</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            variant="outlined"
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {allBreakTimes.map((time) => (
              <MenuItem
                key={time.id}
                value={`${time.StartTime} - ${time.EndTime}`}
                style={getStyles(
                  `${time.StartTime} - ${time.EndTime}`,
                  personName,
                  theme
                )}
              >
                {`${time.StartTime} - ${time.EndTime}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </React.StrictMode>
  );
}
