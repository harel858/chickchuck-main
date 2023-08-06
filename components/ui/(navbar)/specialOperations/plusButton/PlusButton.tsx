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
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2em",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function PlusButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  return (
    <div>
      <Button
        variant={"ghost"}
        className={`transition-all ease-in-out duration-300 hover:scale-125 w-fit h-fit cursor-pointer m-0 p-0 flex flex-row-reverse justify-center gap-2 items-center text-base hover:bg-slate-100`}
        onClick={handleClickOpen}
      >
        <BsPlusSquare className="text-3xl m-0 p-0" />
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
          Create A Client/Appointment
        </BootstrapDialogTitle>
        <DialogContent className="bg-slate-100" dividers>
          <Suspense fallback={<>loading...</>}>
            <Content handleClose={handleClose} />
          </Suspense>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </div>
  );
}
