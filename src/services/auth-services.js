import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/cms/api/v1/auth`;

const LoginService = (username, password) => {
  return axios.post(API_URL + "/signin", {
    username,
    password,
  });
};

export { LoginService };
