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
  endpoint,
  setTankirano
) => {
  API("other", "http://milkom.factotums.eu/api/users/validate_token.php", {
    jwt: ls.get("loginCredentials")
  }).then(function(jwtResponse) {
    if (jwtResponse.data.data) {
      API("write", endpoint, values).then(function() {
        data !== null ? setData([...data, values]) : setData([values]);

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
        actions.resetForm();

        setTankirano !== undefined && (
            API("read", "labRead").then(function(response) {
             setTankirano(response.data.tankirane[0].tankirano)
            })
        )

      });
    } else {
      setShowError(true);
      ls.remove("userAccess");
      ls.remove("loginCredentials");
      setUserAccess(null);
    }
  });
};
