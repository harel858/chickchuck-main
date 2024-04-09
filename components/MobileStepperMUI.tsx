import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function MobileStepperMUI({
  stepsLength,
  activeStep,
  handleBack,
  handleNext,
}: {
  stepsLength: number;
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
}) {
  const theme = useTheme();

  return (
    <MobileStepper
      variant="progress"
      steps={stepsLength}
      position="static"
      activeStep={activeStep}
      className="rounded-t-xl"
      sx={{ width: "100%", flexGrow: 1 }}
      nextButton={<Button size="small" disabled={true} />}
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
