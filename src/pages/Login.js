import React, { useContext } from "react";

import { Button } from "@material-ui/core";
import { SetUpInitialValues } from "../components/setUpInitialValues";
import { Formik } from "formik";
import * as Yup from "yup";

import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { StylesContext } from "../providers/GlobalStylesProvider";
import Paper from "@material-ui/core/Paper";

//import { API } from "../providers/API";

import { RenderForm } from "../components/renderForm";

const ValidationSchema = Yup.object().shape({
  username: Yup.number()
    .required("Моля въведете потребителското си име"),
  password: Yup.string().required("Моля въведете паролата си")
});

export const Login = () => {

  const { setPageTitle/*, setIsLogged*/ } = useContext(GlobalStateContext);
  const { useStyles } = useContext(StylesContext);
  setPageTitle("Вход");
  //setIsLogged(true)
  const styles = useStyles();



  const formFields = [
    { name: "username", label: "Име", type: "text" },
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
            console.log('asd')
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <RenderForm formFields={formFields} />
              <Button variant="contained" type="submit">
                Вход
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </>
  );
};
