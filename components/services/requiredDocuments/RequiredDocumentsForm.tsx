import React, { useCallback } from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoMdDocument } from "react-icons/io";
import Form from "./Form";
import NoDocsExited from "./NoDocsExited";
import { RequiredDocument } from "@prisma/client";
import { deleteDocs } from "actions/addNewDocs";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
function RequiredDocumentsForm({
  businessId,
  docs,
}: {
  businessId: string;
  docs: RequiredDocument[];
}) {
  console.log(docs);

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const generate = useCallback((element: React.ReactElement) => {
    return docs.map((value) =>
      React.cloneElement(element, {
        value,
      })
    );
  }, []);

  return (
    <div className="flex flex-col justify-around items-center gap-5">
      <Form businessId={businessId} />
      {docs.length <= 0 ? (
        <NoDocsExited title="No Existing Documents" />
      ) : (
        <Demo>
          <List dense={dense}>
            {docs.map((item) => (
              <ListItem
                onClick={(e) => deleteDocs(businessId, item.id)}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
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
            ))}
          </List>
        </Demo>
      )}
    </div>
  );
}

export default RequiredDocumentsForm;
