import React, { useState, useContext, useEffect } from "react";

import { Button } from "@material-ui/core";
import { Formik } from "formik";

import * as Yup from "yup";

import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { StylesContext } from "../providers/GlobalStylesProvider";
import Paper from "@material-ui/core/Paper";

import { API } from "../providers/API";
import { SetUpInitialValues } from "../components/setUpInitialValues";
import { TableDisplay } from "../components/tableDisplay";
import { RenderForm } from "../components/renderForm";
import Fade from "../components/Fade";
import Notification from "../components/Notification";
import { formSubmitAction } from "../components/FormSubmitAction";
import { Link } from "react-router-dom";

export const LabForm = () => {
  const [data, setData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { setPageTitle, setUserAccess } = useContext(GlobalStateContext);
  const { useStyles } = useContext(StylesContext);
  setPageTitle("Лаборатория");
  const styles = useStyles();

  useEffect(() => {
    API("read", "labRead").then(function(response) {
      setData(response.data.records);
    });
    // eslint-disable-next-line
  }, []);

  const formFields = [
    { name: "shofiorIme", label: "Име на шофьор", type: "text" },
    { name: "kamionNomer", label: "Номер на камион", type: "tel" },
    { name: "kolichestvoPrieto", label: "Прието количество", type: "tel" },
    { name: "voda", label: "Вода", type: "tel" },
    { name: "kiselinnost", label: "Киселинност", type: "tel" },
    { name: "maslenost", label: "Масленост", type: "tel" },
    { name: "plutnost", label: "Плътност", type: "tel" },
    { name: "krchislo", label: "Кр Число", type: "tel" },

    { name: "zakvaska", label: "Закваска", type: "tel" },
    { name: "salatin", label: "Салатин", type: "tel" },
    { name: "suhoMlyako", label: "Сухо мляко", type: "tel" },
    { name: "lipsi", label: "Липси", type: "tel" },

    { label: "Количества за цехове", type: "heading" },
    { name: "cehSirene", label: "Сирене", type: "tel" },
    { name: "cehPrMlyako", label: "Прясно мляко", type: "tel" },
    { name: "cehKisMlyako", label: "Кисело мляко", type: "tel" },
    { name: "cehKashkaval", label: "Кашкавал", type: "tel" },
    { name: "cehDrugi", label: "Други", type: "tel" }
  ];

  const initialValues = SetUpInitialValues(formFields);

  const ValidationSchema = Yup.object().shape({
    shofiorIme: Yup.string().required("Моля въведете име на шофьора"),
    kamionNomer: Yup.number()
      .required("Моля въведете номер на камиона")
      .typeError("Моля въведете само цифри"),
    kolichestvoPrieto: Yup.number()
      .required("Моля въведете количество")
      .typeError("Моля въведете само цифри"),
    voda: Yup.number()
      .required("Моля въведете количество")
      .typeError("Моля въведете само цифри"),
    zakvaska: Yup.number().typeError("Моля въведете само цифри"),
    salatin: Yup.number().typeError("Моля въведете само цифри"),
    suhoMlyako: Yup.number().typeError("Моля въведете само цифри"),
    lipsi: Yup.number().typeError("Моля въведете само цифри"),
    cehSirene: Yup.number()
      .required("Моля въведете количество")
      .typeError("Моля въведете само цифри"),
    cehPrMlyako: Yup.number()
      .required("Моля въведете количество")
      .typeError("Моля въведете само цифри"),
    cehKisMlyako: Yup.number()
      .required("Моля въведете количество")
      .typeError("Моля въведете само цифри"),
    cehKashkaval: Yup.number()
      .required("Моля въведете количество")
      .typeError("Моля въведете само цифри"),
    cehDrugi: Yup.number()
      .required("Моля въведете количество")
      .typeError("Моля въведете само цифри")
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
              "labWrite"
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
