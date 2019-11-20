import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React from "react";

export const TableDisplay = ({ data, formFields }) => (
  <DataTable value={data} responsive={true} autoLayout={true}>
    {formFields.map((item, index) => {
      if (item.type !== "heading") {
        return <Column key={index} field={item.name} header={item.label} />;
      }
    })}
  </DataTable>
);
