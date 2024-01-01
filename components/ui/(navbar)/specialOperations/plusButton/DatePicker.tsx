import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Button } from "@ui/Button";
import { cn } from "@lib/utils";
import { Calendar } from "@ui/calendar";
import { Input } from "@components/input";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export function DatePickerDemo({
  placeholder,
  register,
  errors,
}: {
  placeholder: string;
  register: UseFormRegister<{
    Service: string;
    Date: string;
    Client: string;
  }>;
  errors: FieldErrors<{
    Service: string;
    Client: string;
    Date: string;
  }>;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <>
          {" "}
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
          {errors?.["Date"] && (
            <p className="text-sm text-red-500">{errors["Date"]?.message}</p>
          )}
        </>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
