export const SetUpInitialValues = formFields => {
  const initialValues = {};

  formFields.forEach(item => {
    if (item.name) {
      let value = "";
      if (item.type === "datepicker") {
        value = new Date(Date.now()).toLocaleDateString("en-CA");
      }
      initialValues[item.name] = value;
    }
  });

  return initialValues;
};
