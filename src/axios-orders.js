import axios from "axios";

const instance = axios.create({
  baseURL: "https://myburger-builder-app.firebaseio.com/"
});

export default instance;
