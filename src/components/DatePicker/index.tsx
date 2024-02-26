import React from "react";
import { format } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";
import { cn } from "@/libs/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../shared/PopOver/PopOver";

import { Calendar } from "../Calendar";

interface DatePickerProps {
  onChange: SelectSingleEventHandler;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
}
const DatePicker = ({ onChange, value, placeholder }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "w-max rounded-md bg-highlight-black text-white py-2 px-4"
          )}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {value ? (
            format(value, "PPP")
          ) : (
            <span>{placeholder || "Pick a date"}</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
