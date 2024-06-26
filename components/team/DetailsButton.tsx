/* import React, { useState } from "react";
import { Modal } from "antd";
import { Button } from "@ui/Button";
import { BreakTime, Treatment, User } from "@prisma/client";
import { BiEdit } from "react-icons/bi";
import UserDetails from "./UserDetails";

export default function DetailsButton({
  user,
  allServices,
  allBreakTimes,
  bussinesClosingTime,
  bussinesOpeningTime,
}: {
  user: User & {
    Treatment: Treatment[];
    BreakTime: BreakTime[];
  };
  bussinesOpeningTime: number;
  bussinesClosingTime: number;
  allBreakTimes: BreakTime[];
  allServices: Treatment[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        className="group-hover:bg-slate-100 hover:scale-125 transition-all ease-in-out duration-200 group-hover:text-black rounded-full"
      >
        <BiEdit className="text-2xl" />
      </Button>
      <Modal
        title={
          <div className="flex flex-row justify-center items-center gap-2">
            <h3 className="font-sans text-2xl">Edit {user.name}</h3>
            <BiEdit className="text-4xl" />
          </div>
        }
        className="pt-5"
        centered
        open={modalOpen}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setModalOpen(false);
          setCurrent(0);
        }}
        styles={{
          body: {
            background: "rgba(254,215,170,0.7)",
            borderRadius: "3em",
            padding: "2em",
            margin: "0 auto",
          },
        }}
      >
        <UserDetails
          setModalOpen={setModalOpen}
          allServices={allServices}
          user={user}
          allBreakTimes={allBreakTimes}
          bussinesOpeningTime={bussinesOpeningTime}
          bussinesClosingTime={bussinesClosingTime}
        />
      </Modal>
    </>
  );
}
 */

export {};
