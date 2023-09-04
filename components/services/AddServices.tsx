"use client";
import React, { Suspense, useCallback } from "react";
import Form from "./Form/Form";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@ui/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RequiredDocument } from "@prisma/client";
import { message } from "antd";

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
export default function AddServices({
  businessId,
  bussinesDocs,
}: {
  businessId: string;
  bussinesDocs: RequiredDocument[];
}) {
  const [open, setOpen] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = useCallback(() => {
    messageApi.success("Hello, Ant Design!");
  }, [messageApi]);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen, open]);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  return (
    <>
      {contextHolder}
      <Button
        onClick={handleClickOpen}
        className="flex flex-row-reverse justify-center items-center gap-2 text-xl font-medium text-black bg-slate-100 hover:text-white"
      >
        New Service
        <AiOutlinePlusCircle className="text-3xl" />
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
          Create New Service
        </BootstrapDialogTitle>
        <DialogContent sx={{ background: "rgb(241,245,249)" }} dividers>
          <Suspense fallback={<>loading...</>}>
            <Form
              successMessage={successMessage}
              closeDialog={handleClose}
              businessId={businessId}
              bussinesDocs={bussinesDocs}
            />
          </Suspense>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </>
  );
}
