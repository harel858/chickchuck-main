import React from "react";
import Typography from "@mui/material/Typography";

function ToolTip() {
  return (
    <React.Fragment>
      <Typography color="inherit">Tooltip with HTML</Typography>
      <em>{"And here's"}</em> <b>{"some"}</b> <u>{"amazing content"}</u>.{" "}
      {"It's very engaging. Right?"}
    </React.Fragment>
  );
}

export default ToolTip;
