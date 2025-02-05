import axios from "axios";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Allows Axios to send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
