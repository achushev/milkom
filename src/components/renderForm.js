import React from "react";
import { DateField, InputField, SelectField } from "./CustomFormFields";

export const RenderForm = ({ formFields }) => {
  return formFields.map((item, index) =>
    item.type === "heading" ? (
      <h2 key={index}>{item.label}</h2>
    ) : item.type === "datepicker" ? (
      <div key={index}>
        <DateField name={item.name} label={item.label} />
      </div>
    ) : item.type === "select" ? (
      <div key={index}>
        <SelectField
          name={item.name}
          label={item.label}
          options={item.options}
        />
      </div>
    ) : (
      <div key={index}>
        <InputField name={item.name} type={item.type} label={item.label} />
      </div>
    )
  );
};
