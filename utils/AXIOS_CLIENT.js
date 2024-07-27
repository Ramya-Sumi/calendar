import axios from "axios";
import { deleteCookie } from ".";
import toast from "react-hot-toast";
import { BASE_URL, ACCESS_TOKEN } from "@/constants/ENVIRONMENT_VARIABLES";

export const AXIOS_CLIENT = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AXIOS_CLIENT.interceptors.request.use(
  (config) => {
    const token = ACCESS_TOKEN;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

AXIOS_CLIENT.interceptors.response.use(
  (response) => {
    if (
      !response.data.status &&
      response.data.message === "401 - Something Went Wrong ...!"
    ) {
      deleteCookie(ACCESS_TOKEN);
      toast.error("Logging out due to session out.");
      window.location = LOGIN_ROUTE;
    }
    return response;
  },
  (error) => {
    const config = error.config;
    if (!config) {
      // Handle the case where config is undefined
      console.error("Request configuration is undefined:", error);
      return Promise.reject(error);
    }
    if (axios.isCancel(error)) {
      // Handle canceled request
      console.log("Request canceled:", error.message);
    } else {
      // Handle other response errors
      console.error("API call failed:", error);
    }
    cancelTokens.delete(config.url);
    if (error.response.status === 401) {
      deleteCookie(ACCESS_TOKEN_KEY);
      toast.error(
        error.response.config.url.toUpperCase() + ": UnAuthorized API Call..."
      );

      toast.error("Logging out due to session out.");
      window.location = LOGIN_ROUTE;
    }
    if (error.response.status === 404) {
      toast.error(
        error.response.config.url.toUpperCase() + ": API Not Found..."
      );
    }

    if (error.response.status === 500) {
      toast.error(
        error.response.config.url.toUpperCase() + ": Something went wrong..."
      );
    }
    return error;
  }
);
