"use client";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BusinessDetailsValidation,
  TBusinessDetailsValidation,
} from "@lib/validators/business-details-validation";
import FormField from "./FormField";
import { Form } from "@ui/form";
import { Button } from "@ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@styles/components/ui/command";
import debounce from "lodash.debounce";
import { useTranslations } from "next-intl";
import { Input } from "@components/input";
import { FaSearch } from "react-icons/fa";
import { Label } from "@components/label";

export interface FieldType {
  label: string;
  name: "businessName" | "businessPhone" | "businessAddress";
}

const BusinessDetailsForm = ({
  next,
  setBusinessDetails,
  locale,
}: {
  locale: string;
  next: () => void;
  setBusinessDetails: React.Dispatch<
    React.SetStateAction<TBusinessDetailsValidation | null>
  >;
}) => {
  const t = useTranslations("businessDetailsForm");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const form = useForm<TBusinessDetailsValidation>({
    resolver: zodResolver(BusinessDetailsValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = form;

  const onSubmit = async (data: TBusinessDetailsValidation) => {
    try {
      setBusinessDetails(data);
      next();
    } catch (err: any) {
      console.log("err", err);
    }
  };

  const formType: FieldType[] = [
    { label: t("businessName"), name: "businessName" },
    { label: t("businessPhone"), name: "businessPhone" },
    { label: t("businessAddress"), name: "businessAddress" },
  ];

  const fetchSuggestions = async (query: string): Promise<string[]> => {
    const response = await fetch(`/api/getAddress?query=${query}`);
    const data = await response.json();
    console.log("data", data);

    const typedData = data as string[];
    return typedData.map((prediction) => prediction);
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query) {
        const results = await fetchSuggestions(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  const handleSearch = (query: string) => {
    setSelectedAddress(query); // Update the input value as the user types
    debouncedFetchSuggestions(query);
  };

  const handleSelect = (address: string) => {
    setSelectedAddress(address);
    setValue("businessAddress", address); // Update the form state
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-5">
      <h1 className="text-3xl font-sans font-medium text-black">
        {t("header")}
      </h1>
      <h2 className="text-xl font-sans font-light text-gray-700">
        {t("subheader")}
      </h2>
      <div className="flex flex-col justify-center items-center w-full">
        <Form {...form}>
          <form
            className="flex flex-col justify-center items-center gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col justify-center items-center gap-x-4 gap-y-4 w-full">
              {formType.map(({ label, name }) =>
                name === "businessAddress" ? (
                  <div
                    key={name}
                    className="flex flex-col justify-center items-center gap-2"
                  >
                    {" "}
                    <Label htmlFor={name}>{label}</Label>
                    <Command
                      className="rounded-lg border shadow-md"
                      key={label}
                    >
                      <div className="relative w-full">
                        <Input
                          {...register("businessAddress")}
                          placeholder="Business street address"
                          value={selectedAddress}
                          onChange={(e) => handleSearch(e.target.value)}
                          style={{ width: "15rem" }} // Set the specific width here
                          className="pl-10" // Add padding to the left to make space for the icon
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <CommandList>
                        {/*  {selectedAddress && suggestions.length === 0 && (
                        <CommandEmpty>{t("noresults")}</CommandEmpty>
                      )} */}
                        {selectedAddress && suggestions.length > 0 && (
                          <CommandGroup heading="Suggestions">
                            {suggestions.map((suggestion, index) => (
                              <CommandItem
                                className={`hover:bg-slate-100 cursor-pointer ${
                                  selectedAddress === suggestion
                                    ? "bg-slate-100 text-slate-900"
                                    : ""
                                }`}
                                key={index}
                                onSelect={() => handleSelect(suggestion)}
                              >
                                {suggestion}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                        <CommandSeparator />
                      </CommandList>
                    </Command>
                  </div>
                ) : (
                  <FormField
                    locale={locale}
                    errors={errors}
                    register={register}
                    control={control}
                    name={name}
                    label={label}
                    key={label}
                  />
                )
              )}
            </div>
            <Button className="bg-slate-950 w-full" type="submit" size="lg">
              {t("next")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;
