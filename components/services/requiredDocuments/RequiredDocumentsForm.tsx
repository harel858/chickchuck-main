import React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import DocItem from "./DocItem";
import Form from "./Form";
import NoDocsExited from "./NoDocsExited";
import { RequiredDocument } from "@prisma/client";

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

  return (
    <div className="flex flex-col justify-around items-center gap-5">
      <Form businessId={businessId} />
      {docs.length <= 0 ? (
        <NoDocsExited title="No Existing Documents" />
      ) : (
        <Demo>
          <List dense={dense}>
            {docs.map((item) => (
              <DocItem key={item.id} item={item} businessId={businessId} />
            ))}
          </List>
        </Demo>
      )}
    </div>
  );
}

export default RequiredDocumentsForm;
