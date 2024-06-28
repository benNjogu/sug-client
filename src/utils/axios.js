import axios from "axios";

import { BASE_URL } from "./../config";

let token = localStorage.getItem("token");
console.log("first, token", token);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  // },
});

axios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data.message) || "Something went wrong"
    )
);

export default axiosInstance;
