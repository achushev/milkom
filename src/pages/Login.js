import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { Button } from "@material-ui/core";
import { SetUpInitialValues } from "../components/setUpInitialValues";
import { Formik } from "formik";
import * as Yup from "yup";

import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { StylesContext } from "../providers/GlobalStylesProvider";
import Paper from "@material-ui/core/Paper";

import { API } from "../providers/API";
import ls from "local-storage";

import { RenderForm } from "../components/renderForm";
import Notification from "../components/Notification";
import Fade from "../components/Fade";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Моля въведете email"),
  password: Yup.string().required("Моля въведете паролата си")
});

export const Login = () => {
  const {
    setPageTitle,
    permissionsList,
    userAccess,
    setUserAccess
  } = useContext(GlobalStateContext);
  const { useStyles } = useContext(StylesContext);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [showError, setShowError] = useState(false);
  setPageTitle("Вход");

  const styles = useStyles();

  useEffect(() => {
    if (userAccess !== null) {
      setRedirectToHome(true);
    }
  }, [userAccess]);

  if (redirectToHome === true) {
    return <Redirect to={"/" + permissionsList[userAccess]} />;
  }

  const formFields = [
    { name: "email", label: "Email", type: "text" },
    { name: "password", label: "Парола", type: "password" }
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
              "http://milkom.factotums.eu/api/users/login.php",
              values
            ).then(function(response) {
              if (response.data.jwt) {
                ls.set("loginCredentials", response.data.jwt);

                API(
                  "other",
                  "http://milkom.factotums.eu/api/users/validate_token.php",
                  { jwt: response.data.jwt }
                ).then(function(jwtResponse) {
                  ls.set("userAccess", jwtResponse.data.data.access);
                  setUserAccess(jwtResponse.data.data.access);
                });
              } else {
                setShowError(true);
                setTimeout(() => {
                  setShowError(false);
                }, 5000);
              }
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
                Вход
              </Button>

              <Fade show={showError}>
                <Notification text="Невалидни email или парола!" type="error" />
              </Fade>
            </form>
          )}
        </Formik>
      </Paper>
    </>
  );
};
