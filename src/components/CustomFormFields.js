import React from "react";
import { useField, useFormikContext } from "formik";
import { TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      label={label}
      {...field}
      margin="normal"
      variant="outlined"
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export const DateField = ({ label, name, ...props }) => {
  const formik = useFormikContext();
  const [selectedDate, setSelectedDate] = React.useState(Date.now());

  const handleDateChange = date => {
    setSelectedDate(date);
    if (date !== null) {
      formik.setFieldValue(name, date.toLocaleDateString("en-CA"));
    }
  };
  const [field] = useField(props);
  //const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <KeyboardDatePicker
        {...field}
        autoOk="true"
        disableToolbar
        format="yyyy-MM-dd"
        margin="normal"
        label={label}
        name={name}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
};