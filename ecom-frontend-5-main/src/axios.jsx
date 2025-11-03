import axios from "axios";

const API = axios.create({
    baseURL: "https://shopeasy8-0.onrender.com/api",
});

delete API.defaults.headers.common["Authorization"];

export default API;
