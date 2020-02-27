import React, { useContext, useState } from "react";

import { Button } from "@material-ui/core";
import { SetUpInitialValues } from "../components/setUpInitialValues";
import { Formik } from "formik";
import * as Yup from "yup";

import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { StylesContext } from "../providers/GlobalStylesProvider";
import Paper from "@material-ui/core/Paper";

import { API } from "../providers/API";

import { RenderForm } from "../components/renderForm";
import Fade from "../components/Fade";
import Notification from "../components/Notification";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Моля въведете email"),
  password: Yup.string().required("Моля въведете паролата си"),
  firstName: Yup.string().required("Моля въведете името си"),
  lastName: Yup.string().required("Моля въведете фамилията си"),
  access: Yup.string().required("Моля задайте ниво на достъп")
});

export const Register = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { setPageTitle } = useContext(GlobalStateContext);
  const { useStyles } = useContext(StylesContext);
  setPageTitle("Регистрация");
  const styles = useStyles();

  const formFields = [
    { name: "firstName", label: "Име", type: "text" },
    { name: "lastName", label: "Фамилия", type: "text" },
    { name: "email", label: "E-mail", type: "text" },
    { name: "password", label: "Парола", type: "password" },
    {
      name: "access",
      label: "Достъп",
      type: "select",
      options: [
        {
          label: "Доставка",
          value: "0"
        },
        {
          label: "Лаборатория",
          value: "1"
        },
        {
          label: "Прясно мляко",
          value: "2"
        },
        {
          label: "Кисело мляко",
          value: "3"
        },
        {
          label: "Сирене",
          value: "4"
        },
        {
          label: "Кашкавал",
          value: "5"
        },
        {
          label: "Салати",
          value: "6"
        },
        {
          label: "Вакуум",
          value: "7"
        },
        {
          label: "Администратор",
          value: "9"
        }
      ]
    }
  ];

  const initialValues = SetUpInitialValues(formFields);

  return (
    <>
      <Paper className={styles.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={(values, actions) => {
            API(
              "other",
              "http://milkom.factotums.eu/api/users/register.php",
              values
            ).then(function() {
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
              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: "20px" }}
              >
                Регистрация
              </Button>
              <Fade show={showSuccess}>
                <Notification
                  text="Профила ви е регистриран успешно!"
                  type="success"
                />
              </Fade>
            </form>
          )}
        </Formik>
      </Paper>
    </>
  );
};
