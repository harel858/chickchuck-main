"use client";
import React, { lazy, Suspense, useCallback } from "react";
import ServiceFile from "./ServiceFile";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { BiEdit } from "react-icons/bi";
import { Button } from "@ui/Button";
import { RequiredDocument, Treatment } from "@prisma/client";

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
export default function DetailsButton({
  treatment,
}: {
  treatment: Treatment & {
    RequiredDocument: RequiredDocument[];
  };
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
      <Button
        onClick={handleClickOpen}
        className="group-hover:bg-slate-100 group-hover:text-black"
      >
        <BiEdit className="text-2xl" />
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Customer Details
        </BootstrapDialogTitle>
        <DialogContent className="bg-slate-100" dividers>
          <Suspense fallback={<>loading...</>}>
            <ServiceFile treatment={treatment} />
          </Suspense>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </>
  );
}
