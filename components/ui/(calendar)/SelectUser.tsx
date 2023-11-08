import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import { ScheduleProps } from "types/types";
import { Button } from "@ui/Button";
import { BiUserPlus } from "react-icons/bi";
import Customer from "../(navbar)/specialOperations/plusButton/Customer";

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
}

const SelectUser = ({
  business,
  customer,
  setCustomer,
}: {
  business: ScheduleProps["business"];
  customer: string;
  setCustomer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [options, setOptions] = useState<UserValue[]>([]);
  const [modalOpen, setModaOpen] = useState(false);

  useEffect(() => {
    const data = business?.Customers.map((customer) => ({
      label: `${customer.name} - ${customer.phoneNumber}`,
      value: customer.id,
    }));
    console.log("data", data);

    setOptions(data);
  }, []);
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
        value={customer}
        onSearch={onSearch}
        showSearch
        filterOption={filterOption}
        placeholder="Select users"
        onChange={(newValue) => {
          setCustomer(newValue as string);
        }}
        options={options}
        style={{ width: "100%" }}
      />
      <Button
        onClick={() => setModaOpen(true)}
        className="text-blue-500"
        variant={"link"}
      >
        New Customer?
      </Button>
      <Modal
        title={
          <div className="flex flex-row justify-center items-start gap-2">
            <h3 className="font-sans text-2xl">Create User</h3>
            <BiUserPlus className="text-4xl p-0" />
          </div>
        }
        className="pt-5"
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
            padding: "2em",
            margin: "0 auto",
          },
        }}
      >
        <Customer bussinesId={business?.id} />
      </Modal>
    </>
  );
};

export default SelectUser;
