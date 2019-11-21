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
import Fade from "../components/Fade";
import Notification from "../components/Notification";

export const YellowCheeseForm = () => {
  const [data, setData] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const { setPageTitle } = useContext(GlobalStateContext);
  const { useStyles } = useContext(StylesContext);
  setPageTitle("Цех кисело мляко");
  const styles = useStyles();

  useEffect(() => {
    API("read", "cehKashkavalRead").then(function(response) {
      setData(response.data.records);
    });
    // eslint-disable-next-line
  }, []);

  const razfasofkiObj = [
    {
      label: "500мл",
      value: "0.5"
    },
    {
      label: "750мл",
      value: "0.75"
    },
    { label: "1л", value: "1" },
    { label: "1.5л", value: "1.5" }
  ];

  const markiObj = [
    {
      label: "Марка 1",
      value: "marka_1"
    },
    {
      label: "Марка 2",
      value: "marka_2"
    },
    { label: "Марка 3", value: "marka_3" }
  ];

  const formFields = [
    { name: "lotNomer", label: "Партида", type: "text" },
    {
      name: "dataProizvodstvo",
      label: "Дата производство",
      type: "datepicker"
    },
    { name: "srokGodnost", label: "Срок на годност", type: "datepicker" },
    {
      name: "razfasovka",
      label: "Разфасовка",
      type: "select",
      options: razfasofkiObj
    },
    {
      name: "marka",
      label: "Марка",
      type: "select",
      options: markiObj
    },
    { name: "broiki", label: "Бройки", type: "tel" }
  ];

  const initialValues = SetUpInitialValues(formFields);

  const ValidationSchema = Yup.object().shape({
    lotNomer: Yup.number()
      .required("Моля въведете номер на партида")
      .typeError("Моля въведете само цифри"),
    dataProizvodstvo: Yup.string().required(
      "Моля въведете дата на производство"
    ),
    srokGodnost: Yup.string().required("Моля въведете срок на годност"),
    marka: Yup.string().required("Моля въведете марка"),
    broiki: Yup.number()
      .required("Моля въведете количество")
      .typeError("Моля въведете само цифри"),
    razfasovka: Yup.number()
      .required("Моля въведете разфасовка")
      .typeError("Моля въведете само цифри")
  });

  return (
    <>
      <Paper className={styles.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={(values, actions) => {
            API("write", "cehKashkavalWrite", values).then(function() {
              setData([...data, values]);
              setShowSuccess(true);
              setTimeout(() => {
                setShowSuccess(false);
              }, 5000);
              actions.resetForm();
            });
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <RenderForm formFields={formFields} />
              <Button variant="contained" type="submit">
                Запази данните
              </Button>
              <Fade show={showSuccess}>
                <Notification
                  text="Данните са записани успешно!"
                  type="success"
                />
              </Fade>
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
