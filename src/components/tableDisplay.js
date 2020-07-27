import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React from "react";

export const TableDisplay = ({ data, formFields }) => (
  <div style={{ width: "100%", overflowX: "auto" }}>
    <DataTable value={data} responsive={true}>
      {// eslint-disable-next-line array-callback-return
      formFields.map((item, index) => {
        if (item.type !== "heading" && item.name !== "tankirano") {
          return (
            <Column
              key={index}
              field={item.name}
              header={item.label}
              style={{ width: "120px" }}
            />
          );
        }
      })}
    </DataTable>
  </div>
);
