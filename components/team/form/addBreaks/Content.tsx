import React from "react";
import Form from "./Form";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import NoBreaksExist from "./NoBreaksExist";
import { NotificationPlacement } from "antd/es/notification/interface";
import { TeamPageParams } from "types/types";
import BreakItem from "./BreakTimeItem";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
function Content({
  business,
  successNotification,
}: {
  business: TeamPageParams;
  successNotification: (placement: NotificationPlacement) => void;
}) {
  const { BreakTime } = business;
  return (
    <div className="flex flex-col justify-around items-center gap-5">
      <Form
        successNotification={successNotification}
        businessId={business.id}
      />
      {BreakTime.length <= 0 ? (
        <NoBreaksExist title="No Existing Documents" />
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          {BreakTime.map((item) => (
            <List
              className="w-10/12 bg-white/70 gap-2 rounded-xl"
              dense={false}
            >
              <BreakItem key={item.id} item={item} businessId={business.id} />
            </List>
          ))}
        </div>
      )}
    </div>
  );
}

export default Content;
