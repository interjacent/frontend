import axios from "axios";

export const createAxios = () =>
  axios.create({
    baseURL: "/api/v1",
  });
