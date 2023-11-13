import React, { useCallback, useEffect, useState, useTransition } from "react";
import { message, Modal, Select } from "antd";
import { createCutomAppointment } from "actions/createCutomAppointment";
import { Button } from "@ui/Button";
import { BiUserPlus } from "react-icons/bi";
import AppointmentTitle from "./AppointmentTitle";
import CustomTreatment from "./CustomTreatment";
import { AvailableSlot, Business, Treatment, User } from "@prisma/client";

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
}

const SelectUser = ({
  user,
  service,
  setService,
  setDuration,
  duration,
  setTitle,
  title,
  date,
  slots,
  userId,
  customer,
}: {
  user: User & {
    Business: Business;
    Treatment: Treatment[];
  };
  userId: string;
  date: string;
  customer: string;
  slots: AvailableSlot[];
  title: string;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  service: string;
  setService: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isPending, startTransition] = useTransition();
  const [options, setOptions] = useState<UserValue[]>([]);
  const [modalOpen, setModaOpen] = useState(false);

  useEffect(() => {
    const data = user?.Treatment.map((treatment) => ({
      label: `${treatment.title} - ${treatment.duration}Min`,
      value: treatment.id,
    }));
    console.log("data", data);

    setOptions(data);
  }, []);
  const changeDuration = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {
        target: { value, name },
      } = e;

      // Ensure the value is a multiple of 5
      let newValue = Math.round(+value / 5) * 5; // Round to the nearest multiple of 5
      e.target.value = newValue.toString();
      setDuration(newValue);
    },
    []
  );
  const changeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {
        target: { value, name },
      } = e;
      setTitle(value);
    },
    []
  );
  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <Select
        title="Choose A Customer"
        value={service}
        onSearch={onSearch}
        showSearch
        filterOption={filterOption}
        placeholder="Select users"
        onChange={(newValue) => {
          setService(newValue as string);
        }}
        options={options}
        style={{ width: "100%" }}
      />
      <Button
        onClick={() => {
          setService("");
          setModaOpen(true);
        }}
        className="text-blue-500"
        variant={"link"}
      >
        Custom Service?
      </Button>
      <Modal
        title={
          <div className="flex flex-row justify-center items-start gap-2">
            <h3 className="font-sans text-2xl">Custom Service</h3>
            <BiUserPlus className="text-4xl p-0" />
          </div>
        }
        open={modalOpen}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setModaOpen(false);
        }}
        styles={{
          body: {
            background: "rgba(254,215,170,0.7)",
            borderRadius: "3em",
            padding: "5em",
            margin: "0 auto",
          },
        }}
      >
        <div className="pt-5 flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <AppointmentTitle changeTitle={changeTitle} title={title} />
            <CustomTreatment
              duration={duration}
              changeDuration={changeDuration}
            />
          </div>
          <Button
            onClick={() => {
              startTransition(() =>
                createCutomAppointment(
                  userId,
                  customer,
                  slots,
                  title,
                  user.businessId,
                  null,
                  date
                )
              );
              message.success("Appointment is created successfully");
            }}
            isLoading={isPending}
            variant={"default"}
            disabled={!title || !duration}
            className={"bg-blue-600 hover:bg-blue-500 text-white"}
          >
            Done
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SelectUser;
