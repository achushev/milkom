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

export const Vakuum = () => {
  const [data, setData] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const { setPageTitle } = useContext(GlobalStateContext);
  const { useStyles } = useContext(StylesContext);
  setPageTitle("Вакуум");
  const styles = useStyles();

  useEffect(() => {
    API("read", "cehVakuumRead").then(function(response) {
      setData(response.data.records);
    });
    // eslint-disable-next-line
  }, []);

  const formFields = [
    { name: "sirene", label: "Сирене", type: "text" },
    { name: "kashkaval", label: "Кашкавал", type: "tel" },
    { name: "razfasovka", label: "Разфасовка", type: "tel" },
    { name: "kashoni", label: "Кашони", type: "tel" },
    { name: "broiki", label: "Бройки", type: "tel" },
    { name: "maslo", label: "Масло", type: "tel" },
    { name: "rolkiEtiketi", label: "Ролки етикети", type: "tel" },
    { name: "tenekii", label: "Тенекии", type: "tel" }
  ];

  const initialValues = SetUpInitialValues(formFields);

  Yup.addMethod(Yup.number, "requiredIf", function(list, message) {
    return this.test("requiredIf", message, function(value) {
      const { path, createError } = this;

      // check if any in list contain value
      // true : one or more are contains a value
      // false: none contain a value
      var anyHasValue = list.some(value => {
        // return `true` if value is not empty, return `false` if value is empty
        return Boolean(document.querySelector(`input[name="${value}"]`).value);
      });

      // returns `CreateError` current value is empty and no value is found, returns `false` if current value is not empty and one other field is not empty.
      return !value && !anyHasValue ? createError({ path, message }) : true;
    });
  });

  const ValidationSchema = Yup.object().shape({
    sirene: Yup.number()
      .typeError("Моля въведете само цифри")
      .requiredIf(
        ["kashkaval"],
        "Моля въведете количество Сирене или Кашкавал"
      ),
    kashkaval: Yup.number()
      .typeError("Моля въведете само цифри")
      .requiredIf(["sirene"], "Моля въведете количество Сирене или Кашкавал"),
    kashoni: Yup.number().typeError("Моля въведете само цифри"),
    broiki: Yup.number().typeError("Моля въведете само цифри"),
    rolkiEtiketi: Yup.number().typeError("Моля въведете само цифри"),
    tenekii: Yup.number().typeError("Моля въведете само цифри")
  });

  return (
    <>
      <Paper className={styles.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={(values, actions) => {
            API("write", "cehVakuumWrite", values).then(function() {
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
