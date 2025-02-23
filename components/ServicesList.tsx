import React from "react";
import { List, Typography } from "antd";
import LargeHeading from "@ui/LargeHeading";
import { ActivityDays, Treatment } from "@prisma/client";
import { Button } from "@ui/Button";

function ServicesList({
  services,
  onSelectedService,
  selectedService,
}: {
  services: Treatment[];
  selectedService: Treatment | null;
  onSelectedService: (service: Treatment) => void;
}) {
  console.log("selectedService", selectedService);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="w-full flex justify-center items-center">
        <h2 className="text-center text-xl font-bold">:בחר/י שירות</h2>
      </div>
      <div className="w-full p-2 gap-5 flex flex-row flex-wrap items-center justify-center">
        {services.map((service) => {
          const isUserSelected = selectedService?.id === service.id;

          const buttonClass = isUserSelected
            ? "bg-orange-200 text-black"
            : "bg-slate-950 text-white";

          return (
            <Button
              key={service.id}
              variant={"default"}
              className={`${buttonClass} w-max hover:bg-orange-200 hover:text-black rounded-lg border border-black/50`}
              onClick={() => onSelectedService(service)}
              type={"button"}
            >
              {service.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default ServicesList;
