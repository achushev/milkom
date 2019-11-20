import React, { useState, useContext, useEffect } from "react";

import { Button } from "@material-ui/core";
import { SetUpInitialValues } from "../components/setUpInitialValues";
import { Formik } from "formik";
import * as Yup from "yup";

import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { StylesContext } from "../providers/GlobalStylesProvider";
import Paper from "@material-ui/core/Paper";

import { API } from "../providers/API";
import { TableDisplay } from "../components/tableDisplay";
import { RenderForm } from "../components/renderForm";

const ValidationSchema = Yup.object().shape({
  kamionNomer: Yup.number()
    .required("Моля въведете номер на камиона")
    .typeError("Моля въведете само цифри"),
  shofiorIme: Yup.string().required("Моля въведете име на шофьора"),
  ferma: Yup.string().required("Моля въведете име на фермата"),
  kolichestvo: Yup.number()
    .required("Моля въведете количество")
    .typeError("Моля въведете само цифри")
});

export const DeliveryForm = () => {
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

  const formFields = [
    { name: "shofiorIme", label: "Име на шофьор", type: "text" },
    { name: "kamionNomer", label: "Номер на камион", type: "tel" },
    { name: "ferma", label: "Ферма", type: "text" },
    { name: "kolichestvo", label: "Количество", type: "tel" },
    { name: "dostavkaData", label: "Дата", type: "datepicker" }
  ];

  const initialValues = SetUpInitialValues(formFields);

  return (
    <>
      <Paper className={styles.paper}>
        <Formik
          initialValues={initialValues}
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
              <RenderForm formFields={formFields} />
              <Button variant="contained" type="submit">
                Запази данните
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
      <Paper className={styles.paper}>
        <TableDisplay data={data} formFields={formFields} />
      </Paper>
    </>
  );
};
