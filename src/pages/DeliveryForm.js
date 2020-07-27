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

const ValidationSchema = Yup.object().shape({
  kamionNomer: Yup.number()
    .required("Моля въведете номер на камиона")
    .typeError("Моля въведете само цифри"),
  shofiorIme: Yup.string().required("Моля въведете име на шофьора"),
  ferma: Yup.string().required("Моля въведете име на фермата"),
  cisterna1: Yup.number()
      .required("Моля въведете количество за цистерна 1")
      .typeError("Моля въведете само цифри"),
  cisterna2: Yup.number()
      .required("Моля въведете количество за цистерна 2")
      .typeError("Моля въведете само цифри"),
  cisterna3: Yup.number()
      .required("Моля въведете количество за цистерна 3")
      .typeError("Моля въведете само цифри")
});

export const DeliveryForm = () => {
  const [data, setData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { setPageTitle, setUserAccess } = useContext(GlobalStateContext);
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
    { name: "cisterna1", label: "Цистерна 1", type: "tel" },
    { name: "cisterna2", label: "Цистерна 2", type: "tel" },
    { name: "cisterna3", label: "Цистерна 3", type: "tel" },
    { name: "ferma", label: "Ферма", type: "text" },
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
            formSubmitAction(
              values,
              actions,
              data,
              setData,
              setShowSuccess,
              setShowError,
              setUserAccess,
              "dostavkiWrite"
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
