import React, { useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DocsOptions({
  bussinesDocs,
  treatmentDocs,
  onChange,
  name,
}: {
  name: string;
  treatmentDocs?: RequiredDocument[];
  bussinesDocs: RequiredDocument[];
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | RequiredDocument[]
  ) => void;
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  useEffect(() => {
    if (treatmentDocs) {
      const initValue = treatmentDocs.map((item) => item.name);
      setPersonName(initValue);
    }
  }, []);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    if (typeof value === "string") return;
    setPersonName(value);
    const newValue = bussinesDocs.filter((item) =>
      value.some((name) => item.name == name)
    );
    console.log("newValue", newValue);
    onChange(newValue);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Required Document</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          variant="standard"
          value={personName}
          name={name}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                console.log("value", value);

                return <Chip key={value} label={value} />;
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {bussinesDocs.map((doc) => {
            console.log("doc", doc);

            return (
              <MenuItem
                key={doc.id}
                value={doc.name}
                style={getStyles(doc.name, personName, theme)}
              >
                {doc.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
