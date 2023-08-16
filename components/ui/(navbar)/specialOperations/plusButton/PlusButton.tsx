"use client";
import React, { lazy, Suspense, useCallback } from "react";
import { Button } from "@ui/Button";
import { BsPlusSquare } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { BusinessData } from "types/types";
import { AiFillPlusCircle } from "react-icons/ai";

const Content = lazy(() => import("./Content"));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
export default function PlusButton({
  businessData,
}: {
  businessData: BusinessData;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  return (
    <>
      <AiFillPlusCircle
        onClick={handleClickOpen}
        className="z-50 fixed bottom-5 right-5 hover:scale-125 duration-200 transition-all ease-in-out cursor-pointer text-6xl m-0 p-0 text-blue-500 bg-transparent"
      />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Client/Appointment
        </BootstrapDialogTitle>
        <DialogContent className="bg-slate-100" dividers>
          <Suspense fallback={<>loading...</>}>
            <Content businessData={businessData} />
          </Suspense>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </>
  );
}
