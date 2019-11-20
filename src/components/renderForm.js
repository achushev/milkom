import React from "react";
import { DateField, InputField } from "./CustomFormFields";

export const RenderForm = ({ formFields }) =>
  formFields.map((item, index) =>
    item.type === "heading" ? (
      <h2 key={index}>{item.label}</h2>
    ) : item.type === "datepicker" ? (
      <div key={index}>
        <DateField name={item.name} label={item.label} />
      </div>
    ) : (
      <div key={index}>
        <InputField name={item.name} type={item.type} label={item.label} />
      </div>
    )
  );
