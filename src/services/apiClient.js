import axios from "axios";
import API, { defaultHeaders } from "../config/api";
import env from "../config/env";

const apiClient = axios.create({
  baseURL: API.BASE_URL,
  timeout: env.REQUEST_TIMEOUT,
  headers: defaultHeaders,
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers["X-Requested-With"] = "XMLHttpRequest";

    if (env.ENABLE_LOGS) {
      console.log(
        `%cAPI Request`,
        "color:#2563eb;font-weight:bold",
        config.method?.toUpperCase(),
        config.url
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong.";

    if (error.code === "ECONNABORTED") {
      message = "Request timeout.";
    } else if (!error.response) {
      message = "Unable to connect to server.";
    } else if (error.response.status === 404) {
      message = "Endpoint not found.";
    } else if (error.response.status === 500) {
      message = "Internal server error.";
    } else if (error.response.data?.detail) {
      message = error.response.data.detail;
    }

    return Promise.reject({
      status: error.response?.status,
      message,
    });
  }
);

export default apiClient;