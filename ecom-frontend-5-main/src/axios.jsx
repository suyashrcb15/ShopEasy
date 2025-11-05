import axios from "axios";

const API = axios.create({
  baseURL: "https://shopeasy8-0.onrender.com/api",
});

export default API;
