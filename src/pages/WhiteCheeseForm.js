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

export const WhiteCheeseForm = () => {
  const [data, setData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { setPageTitle, setUserAccess } = useContext(GlobalStateContext);
  const { useStyles } = useContext(StylesContext);
  setPageTitle("Цех сирене");
  const styles = useStyles();

  useEffect(() => {
    API("read", "cehSireneRead").then(function(response) {
      setData(response.data.records);
    });
    // eslint-disable-next-line
  }, []);

  const razfasofkiObj = [
    {
      label: "тенекия 7-15кг",
      value: "7-15"
    },
    {
      label: "Кутия 5-9 кг",
      value: "5-9"
    },
    { label: "400 гр", value: "0.400" },
    { label: "800 гр", value: "0.800" }
  ];

  const vidObj = [
    {
      label: "Краве",
      value: "Краве"
    },
    {
      label: "Биволско",
      value: "Биволско"
    },
    {
      label: "Овче",
      value: "Овче"
    },
    {
      label: "Козе",
      value: "КозеКозе"
    }
  ];

  const markiObj = [
    {
      label: "Милкком",
      value: "Милкком"
    },
    {
      label: "Грънчаров",
      value: "Грънчаров"
    },
    { label: "БДС", value: "БДС" }
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
      name: "vid",
      label: "Вид",
      type: "select",
      options: vidObj
    },
    {
      name: "marka",
      label: "Марка",
      type: "select",
      options: markiObj
    },
    { name: "broiki", label: "Бройки", type: "tel" },
    { label: "Съставки", type: "heading" },
    { name: "mlyako", label: "Мляко", type: "tel" },
    { name: "fosKis", label: "Фосфорна киселина", type: "tel" },
    { name: "limKis", label: "Лимонена киселна", type: "tel" },
    { name: "sol", label: "Сол", type: "tel" },
    { name: "maya", label: "Мая", type: "tel" },
    { name: "maslo", label: "масло", type: "tel" }
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
    broiki: Yup.number()
      .required("Моля въведете количество")
      .typeError("Моля въведете само цифри"),
    razfasovka: Yup.number()
      .required("Моля въведете разфасовка")
      .typeError("Моля въведете само цифри"),
    mlyako: Yup.number().typeError("Моля въведете само цифри"),
    fosKis: Yup.number().typeError("Моля въведете само цифри"),
    limKis: Yup.number().typeError("Моля въведете само цифри"),
    sol: Yup.number().typeError("Моля въведете само цифри"),
    maya: Yup.number().typeError("Моля въведете само цифри"),
    maslo: Yup.number().typeError("Моля въведете само цифри")
  });

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
              "cehSireneWrite"
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
