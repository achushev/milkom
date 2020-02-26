import axios from "axios";

axios.defaults.baseURL = "http://milkom.factotums.eu/api/";

export const API = (operation, endpoint, data) => {
  const dataString = JSON.stringify(data);

  if (operation === "read") {
    return axios.get("read/" + endpoint + ".php");
  } else if (operation === "write") {
    return axios.post("write/" + endpoint + ".php", dataString);
  } else {
    return axios.post(endpoint, dataString);
  }
};
