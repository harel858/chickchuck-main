import React, { useTransition } from "react";
import { RequiredDocument } from "@prisma/client";
import { deleteDocs } from "actions/addNewDocs";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoMdDocument } from "react-icons/io";
import { Loader2 } from "lucide-react";

function DocItem({
  item,
  businessId,
}: {
  item: RequiredDocument;
  businessId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [secondary, setSecondary] = React.useState(false);

  return (
    <ListItem
      key={item.id}
      onClick={(e) => startTransition(() => deleteDocs(businessId, item.id))}
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
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
          <IoMdDocument />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${item.name}`}
        secondary={secondary ? "Secondary text" : null}
      />
    </ListItem>
  );
}

export default DocItem;
