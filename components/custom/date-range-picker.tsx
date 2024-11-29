"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useGlobalActions } from "@plasmicapp/host";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateRangePicker({
  className,
  from = new Date(Date.now()),
  to = addDays(new Date(Date.now()), 20),
}: {
  className: string;
  from: Date | string;
  to: Date | string;
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(from),
    to: new Date(to),
  });
  const globalActions = useGlobalActions();
  const setFromDate = globalActions["GlobalVariablesContext.setFromDate"];
  const setToDate = globalActions["GlobalVariablesContext.setToDate"];
  const onSelectHandler = (value: DateRange | undefined) => {
    setDate({
      from: value?.from,
      to: value?.to,
    });
    setFromDate(value?.from);
    setToDate(value?.to);
  };
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelectHandler}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
