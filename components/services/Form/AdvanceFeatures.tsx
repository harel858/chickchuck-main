import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DisplayInput from "./DisplayInput";
import { ErrorData, ServiceFormData } from "types/types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RequiredDocument } from "@prisma/client";

function AdvanceFeatures({
  handleChange,
  errors,
  serviceFormData,
  initOpen,
  bussinesDocs,
  treatmentDocs,
}: {
  initOpen?: string;
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | RequiredDocument[]
  ) => void;
  errors: ErrorData;
  serviceFormData: ServiceFormData;
  treatmentDocs?: RequiredDocument[];
  bussinesDocs: RequiredDocument[];
}) {
  const [expanded, setExpanded] = React.useState<string | false>(
    initOpen || false
  );

  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      className="bg-orange-200/50 w-full flex flex-col justify-center items-center"
      expanded={expanded === "panel1"}
      onChange={handleAccordion("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className="font-bold font-serif text-xl  flex flex-row justify-center items-center gap-2">
          Advance Features
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="flex flex-row flex-wrap justify-center items-center gap-4 w-full max-2xl:w-full pb-5">
        <DisplayInput
          data={["advance Payment", "document Name"]}
          handleChange={handleChange}
          errors={errors}
          serviceFormData={serviceFormData}
          treatmentDocs={treatmentDocs}
          bussinesDocs={bussinesDocs}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default AdvanceFeatures;
