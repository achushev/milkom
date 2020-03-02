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
import { formSubmitAction } from "../components/FormSubmitAction";
import { Link } from "react-router-dom";

export const SaladsForm = () => {
  const [data, setData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { setPageTitle, setUserAccess } = useContext(GlobalStateContext);
  const { useStyles } = useContext(StylesContext);
  setPageTitle("Цех салати");
  const styles = useStyles();

  useEffect(() => {
    API("read", "cehSalatiRead").then(function(response) {
      setData(response.data.records);
    });
    // eslint-disable-next-line
  }, []);

  const vidObj = [
    {
      label: "Снежанка",
      value: "Снежанка"
    },
    {
      label: "Салатина",
      value: "Салатина"
    },
    {
      label: "Топено сирене",
      value: "Топено сирене"
    },
    {
      label: "Катък с чушка",
      value: "Катък с чушка"
    }
  ];

  const vlojenProduktObj = [
    {
      label: "Шунка",
      value: "Шунка"
    },
    {
      label: "Салам",
      value: "Салам"
    }
  ];

  const ValidationSchema = Yup.object().shape({
    lotNomer: Yup.number()
      .required("Моля въведете номер на партида")
      .typeError("Моля въведете само цифри"),
    dataProizvodstvo: Yup.string().required(
      "Моля въведете дата на производство"
    ),
    srokGodnost: Yup.string().required("Моля въведете срок на годност"),
    vid: Yup.string().required("Моля въведете вид"),
    broiki: Yup.number()
      .required("Моля въведете количество")
      .typeError("Моля въведете само цифри"),
    etiketi: Yup.number()
      .required("Моля въведете етикети")
      .typeError("Моля въведете само цифри"),
    kashoni: Yup.number()
      .required("Моля въведете кашони")
      .typeError("Моля въведете само цифри"),
    vlojenProdukt: Yup.string().required("Моля въведете вложен продукт"),
    kolVlojenProdukt: Yup.number()
      .required("Моля въведете количество вложен продукт")
      .typeError("Моля въведете само цифри"),
    chushki: Yup.number().typeError("Моля въведете само цифри"),
    kisKrastavici: Yup.number().typeError("Моля въведете само цифри"),
    krastavici: Yup.number().typeError("Моля въведете само цифри"),
    podpravki: Yup.number().typeError("Моля въведете само цифри"),
    shunka: Yup.number().typeError("Моля въведете само цифри"),
    izvara: Yup.number().typeError("Моля въведете само цифри")
  });

  const formFields = [
    { name: "lotNomer", label: "Партида", type: "text" },
    {
      name: "dataProizvodstvo",
      label: "Дата производство",
      type: "datepicker"
    },
    { name: "srokGodnost", label: "Срок на годност", type: "datepicker" },
    {
      name: "vid",
      label: "Вид",
      type: "select",
      options: vidObj
    },
    { name: "broiki", label: "Бройки", type: "tel" },
    { name: "etiketi", label: "Етикети", type: "tel" },
    { name: "kashoni", label: "Кашони", type: "tel" },
    {
      name: "vlojenProdukt",
      label: "Вложен продукт",
      type: "select",
      options: vlojenProduktObj
    },
    {
      name: "kolVlojenProdukt",
      label: "Количество вложен продукт",
      type: "tel"
    },
    { label: "Добавки", type: "heading" },
    { name: "chushki", label: "Чушки", type: "tel" },
    { name: "kisKrastavici", label: "Кисели краставици", type: "tel" },
    { name: "krastavici", label: "Краставици", type: "tel" },
    { name: "podpravki", label: "Подправки", type: "tel" },
    { name: "shunka", label: "Шунка", type: "tel" },
    { name: "izvara", label: "Извара", type: "tel" }
  ];

  const initialValues = SetUpInitialValues(formFields);

  return (
    <>
      <Paper className={styles.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={(values, actions) => {
            formSubmitAction(
              values,
              actions,
              data,
              setData,
              setShowSuccess,
              setShowError,
              setUserAccess,
              "cehSalatiWrite"
            );
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <RenderForm formFields={formFields} />
              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: "20px" }}
              >
                Запази данните
              </Button>
              <Fade show={showSuccess}>
                <Notification
                  text="Данните са записани успешно!"
                  type="success"
                />
              </Fade>
              <Fade show={showError}>
                <Notification type="error">
                  Потребителската ви сесия е изтекла! Моля{" "}
                  <Link to="/login">впишете се в системата тук</Link>
                </Notification>
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
