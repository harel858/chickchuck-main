import SignInSteps from "@components/memberSignIn/signinmembers";
import { Button } from "@ui/Button";
import { Modal } from "antd";
import React, { useCallback, useState } from "react";
import { RiTeamFill } from "react-icons/ri";
import CutomerSignInSteps from "./CutomerSignInSteps";

function CustomerSignIn() {
  const [open, setOpen] = useState(false);
  const handleOk = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="absolute right-0 -top-10 flex justify-center items-center gap-2"
        aria-label="Edit Gallery"
      >
        <span>.כדי לצפות בתורים שלך, התחבר/י כאן</span>
      </Button>
      <Modal
        open={open}
        onOk={handleOk}
        className="z-0"
        okButtonProps={{ className: "hidden" }}
        cancelButtonProps={{ className: "hidden" }}
        confirmLoading={true}
        onCancel={handleCancel}
      >
        <CutomerSignInSteps />
      </Modal>
    </>
  );
}

export default CustomerSignIn;
