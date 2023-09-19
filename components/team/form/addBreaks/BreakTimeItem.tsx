import React, { useTransition } from "react";
import { BreakTime } from "@prisma/client";
import { deleteBreak } from "actions/break";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoMdClock } from "react-icons/io";
import { Loader2 } from "lucide-react";

function BreakItem({
  item,
  businessId,
}: {
  item: BreakTime;
  businessId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [secondary, setSecondary] = React.useState(false);
  console.log("item");

  return (
    <ListItem
      key={item.id}
      secondaryAction={
        <IconButton
          onClick={(e) =>
            startTransition(() => deleteBreak(businessId, item.id))
          }
          edge="end"
          aria-label="delete"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <IoMdClock />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${item.StartTime}-${item.EndTime}`}
        secondary={secondary ? "Secondary text" : null}
      />
    </ListItem>
  );
}

export default BreakItem;
