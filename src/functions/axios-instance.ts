import axios from "axios";
import {
  accessTokenName,
  changeAccessTokenToLocalStorage,
} from "./local-storage";
import { DEFAULT_IS_TOKEN, setDataToken } from "./is-token";

export const axiosInstance = axios.create({
  baseURL: "https://test-assignment.emphasoft.com",
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(accessTokenName);
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      userLogout();
    } else if (error?.response?.status === 0) {
      console.error("Ошибка CORS:", error.message);
    }
  }
);

export const userLogout = () => {
  setDataToken(DEFAULT_IS_TOKEN);
  changeAccessTokenToLocalStorage("");
};
