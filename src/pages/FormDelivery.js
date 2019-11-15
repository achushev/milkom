import React, { useState, useContext } from "react";

import {
  Button
} from "@material-ui/core";
import { InputField } from "../components/CustomFormFields";
import { Formik } from "formik";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as Yup from "yup";

import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { StylesContext } from "../providers/GlobalStylesProvider";
import Paper from "@material-ui/core/Paper";

const initialData = [
  {
    truck_n: "123123",
    driver: "driver 1",
    farm: "farm 1",
    amount: "10"
  },
  {
    truck_n: "123123",
    driver: "driver 2",
    farm: "farm 2",
    amount: "20"
  },
  {
    truck_n: "123123",
    driver: "driver 3",
    farm: "farm 3",
    amount: "30"
  }
];

const ValidationSchema = Yup.object().shape({
  truck_n: Yup.number()
    .required("Моля въведете номер на камиона")
    .typeError("Моля въведете само цифри"),
  driver: Yup.string()
    .required("Моля въведете име на шофьора"),
  farm: Yup.string()
    .required("Моля въведете име на фермата"),
  amount: Yup.number()
    .required("Моля въведете количество")
    .typeError("Моля въведете само цифри")
});


export const FormDelivery = () => {
  const [data, setData] = useState(initialData);
  const { setPageTitle } = useContext(GlobalStateContext);
  const { useStyles } = useContext(StylesContext);
  setPageTitle("Доставка");
  const styles = useStyles();

  return (
    <>
      <Paper className={styles.paper}>
        <Formik
          initialValues={{
            truck_n: "",
            driver: "",
            farm: "",
            amount: ""
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values, actions) => {
            setData([...data, values]);
            actions.resetForm();
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <InputField name="truck_n" type="number" label="Номер на камион"/>
              </div>
              <div>
                <InputField name="driver" type="text" label="Име на шофьор"/>
              </div>
              <div>
                <InputField name="farm" type="text" label="Име на ферма"/>
              </div>
              <div>
                <InputField name="amount" type="number" label="Количество"/>
              </div>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
      <Paper className={styles.paper}>
        <DataTable
          value={data}
          responsive={true}
          autoLayout={true}
        >
          <Column field="truck_n" header="Камион"/>
          <Column field="driver" header="Шофьор"/>
          <Column field="farm" header="Ферма"/>
          <Column field="amount" header="Количество"/>
        </DataTable>
      </Paper>
    </>
  );
};
