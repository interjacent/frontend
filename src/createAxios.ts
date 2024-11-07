import axios from "axios";

export const createAxios = () =>
  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
