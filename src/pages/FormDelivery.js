import React, { useState, useContext, useEffect } from "react";

import {
  Button
} from "@material-ui/core";
import { InputField, DateField } from "../components/CustomFormFields";
import { Formik } from "formik";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as Yup from "yup";

import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { StylesContext } from "../providers/GlobalStylesProvider";
import Paper from "@material-ui/core/Paper";

import { API } from "../providers/API";

const ValidationSchema = Yup.object().shape({
  kamionNomer: Yup.number()
    .required("Моля въведете номер на камиона")
    .typeError("Моля въведете само цифри"),
  shofiorIme: Yup.string()
    .required("Моля въведете име на шофьора"),
  ferma: Yup.string()
    .required("Моля въведете име на фермата"),
  kolichestvo: Yup.number()
    .required("Моля въведете количество")
    .typeError("Моля въведете само цифри")
});



export const FormDelivery = () => {
  const [data, setData] = useState();
  const { setPageTitle } = useContext(GlobalStateContext);
  const { useStyles } = useContext(StylesContext);
  setPageTitle("Доставка");
  const styles = useStyles();

  useEffect(() => {
    API("read", "dostavkiRead").then(function(response) {
      setData(response.data.records);
    });
    // eslint-disable-next-line
  }, []);




  return (
    <>
      <Paper className={styles.paper}>
        <Formik
          initialValues={{
            kamionNomer: "",
            shofiorIme: "",
            ferma: "",
            kolichestvo: "",
            dostavkaData: ""
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values, actions) => {
            API("write", "dostavkiWrite", values).then(function() {

              setData([...data, values]);
              actions.resetForm();
            });

          }}
        >
          {({ values, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <InputField name="kamionNomer" type="number" label="Номер на камион"/>
              </div>
              <div>
                <InputField name="shofiorIme" type="text" label="Име на шофьор"/>
              </div>
              <div>
                <InputField name="ferma" type="text" label="Име на ферма"/>
              </div>
              <div>
                <InputField name="kolichestvo" type="number" label="Количество"/>
              </div>
              <div>
                <DateField name="dostavkaData" label="Дата"/>
              </div>
              <Button variant="contained" type="submit">
                Запази данните
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
          <Column field="kamionNomer" header="Камион"/>
          <Column field="shofiorIme" header="Шофьор"/>
          <Column field="ferma" header="Ферма"/>
          <Column field="kolichestvo" header="Количество"/>
          <Column field="dostavkaData" header="Дата"/>
        </DataTable>
      </Paper>
    </>
  );
};
