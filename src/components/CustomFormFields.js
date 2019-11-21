import React from "react";
import { useField, useFormikContext } from "formik";
import { TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

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
      fullWidth
    />
  );
};

export const DateField = ({ label, name, ...props }) => {
  const formik = useFormikContext();
  const [selectedDate, setSelectedDate] = React.useState(Date(Date.now()));

  const handleDateChange = date => {
    setSelectedDate(date);
    if (date !== null) {
      formik.setFieldValue(name, date.toLocaleDateString("en-CA"));
    }
  };
  const [field] = useField(label, name, props);
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

export const SelectField = ({ label, name, options, ...props }) => {
  const formik = useFormikContext();
  const [value, setValue] = React.useState("");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setValue(event.target.value);
    formik.setFieldValue(name, event.target.value);
  };

  const [field, meta] = useField(name, options, props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  React.useEffect(() => {
    if (field.value === "") {
      setValue("");
      formik.setFieldValue(name, "");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      margin="normal"
      error={!!errorText}
    >
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        {label}
      </InputLabel>
      <Select
        {...field}
        id={name}
        value={value}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        {options.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};
