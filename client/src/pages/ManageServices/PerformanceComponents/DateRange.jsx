import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
//import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";

export default function DateRangeFieldValue() {
  const [value, setValue] = React.useState(() => [
    dayjs("2023-03-17"),
    dayjs("2023-03-21"),
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
        <DemoItem component="DateRangePicker">
          <DateRangePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
