import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@ui/Button";
import { useForm } from "react-hook-form";
import { Form } from "@ui/form";
import { Input } from "@components/input";
import { Label } from "@components/label";
import {
  customerDetailsValidation,
  TCustomerDetailsValidation,
} from "@lib/validators/customerValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@lib/utils";
import { message } from "antd";
import { createNewCustomer } from "actions/createCustomer";
import { Business } from "@prisma/client";
import { useTranslations } from "next-intl";

function AddCustomer({
  business,
  handleCancel,
  isHidden,
}: {
  business: Business;
  handleCancel?: () => void;
  isHidden: boolean;
}) {
  const t = useTranslations("plusButton");

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TCustomerDetailsValidation>({
    resolver: zodResolver(customerDetailsValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const submitForm = async (e: { Name: string; Phone: string }) => {
    setIsLoading(true);
    try {
      const { Name, Phone } = e;
      const res = await createNewCustomer({
        name: Name,
        phoneNumber: Phone,
        bussinesId: business.id,
      });
      message.success(`${Name} ${t("added")}`);
      if (res) {
        handleCancel && handleCancel();
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      message.error("internal error");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="w-full"
    >
      <Form {...form}>
        <form className="flex flex-col items-center gap-4 mt-4 w-full relative">
          <h2 className={`text-slate-900 font-normal font-serif text-2xl`}>
            {t("addCustomer")}
          </h2>
          <div className="flex flex-col items-center gap-4 mt-4 w-10/12 max-2xl:w-full pb-5">
            <div
              key={"Name"}
              className="flex flex-col justify-center items-center gap-2"
            >
              <Label htmlFor={"Name"}>{t("fullName")}</Label>
              <Input
                style={{ width: "15rem" }} // Set the specific width here
                {...register("Name")}
                className={cn({
                  "focus-visible:ring-red-500": errors["Name"],
                })}
                /*                 placeholder={"Enter Name"}
                 */
              />
              {errors?.["Name"] && (
                <p className="text-sm text-red-500">
                  {errors["Name"]?.message}
                </p>
              )}
            </div>
            <div
              key={"Phone"}
              className="flex flex-col justify-center items-center gap-2"
            >
              <Label htmlFor={"Phone"}>{t("phoneNumber")}</Label>
              <Input
                style={{ width: "15rem" }} // Set the specific width here
                {...register("Phone")}
                className={cn({
                  "focus-visible:ring-red-500": errors["Phone"],
                })}
                /*                 placeholder={"Enter Phone"}
                 */
              />
              {errors?.["Phone"] && (
                <p className="text-sm text-red-500">
                  {errors["Phone"]?.message}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="default"
            className="w-max bg-sky-600 hover:bg-slate-900 dark:bg-sky-800 text-xl rounded-lg max-2xl:w-11/12 tracking-widest"
            isLoading={isLoading}
            type="button"
            onClick={handleSubmit(submitForm)}
          >
            {t("confirm")}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}

export default AddCustomer;
