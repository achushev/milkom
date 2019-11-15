import React from 'react'
import { useField } from "formik";
import { TextField } from "@material-ui/core";

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