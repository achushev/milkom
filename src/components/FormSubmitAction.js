import { API } from "../providers/API";
import ls from "local-storage";

export const formSubmitAction = (
  values,
  actions,
  data,
  setData,
  setShowSuccess,
  setShowError,
  setUserAccess,
  endpoint
) => {
  API("other", "http://milkom.factotums.eu/api/users/validate_token.php", {
    jwt: ls.get("loginCredentials")
  }).then(function(jwtResponse) {
    if (jwtResponse.data.data) {
      API("write", endpoint, values).then(function() {
        setData([...data, values]);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
        actions.resetForm();
      });
    } else {
      setShowError(true);
      ls.remove("userAccess");
      ls.remove("loginCredentials");
      setUserAccess(null);
    }
  });
};
