import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ToastTypes } from "../../enums";
import {
  getAccessToken,
  logout,
} from "../authentication/authentication.service";
import { IsIncludes, showToast } from "./../../utils";

axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // console.log(error.config.url);

    try {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return axios(originalRequest);
      }
      if (error.response.status === 401 && originalRequest._retry) {
        localStorage.clear();
        logout();
        return;
      }
      // } catch (error) {}
      const errorStatus = error.response.status;
      const expectedError: boolean =
        error.response &&
        error.response.state >= 400 &&
        error.response.status < 500;
      if (!expectedError) {
        try {
          showToast(error.response.data.message, ToastTypes.error);
        } catch (er) {
          try {
            if (errorStatus === 403) {
              showToast(
                ["شما دسترسی به این قسمت را ندارید!"],
                ToastTypes.error
              );
            } else if (
              !IsIncludes(error.config.url, "/api/Message/GetMyUnreadTicket") &&
              !IsIncludes(error.config.url, "api/Upload/ServeProfilePicture") &&
              !IsIncludes(error.config.url, "api/Profile/GetMyProfilePicture")
            )
              showToast(
                ["لطفا مواردی که دارای مشکل هستند را بررسی کنید"],
                ToastTypes.error
              );
          } catch (er) {
            if (
              !IsIncludes(error.config.url, "/api/Message/GetMyUnreadTicket") &&
              !IsIncludes(error.config.url, "api/Upload/ServeProfilePicture") &&
              !IsIncludes(error.config.url, "api/Profile/GetMyProfilePicture")
            )
              showToast(
                ["لطفا مواردی که دارای مشکل هستند را بررسی کنید"],
                ToastTypes.error
              );
          }
        }
      }
    } catch (er) {}
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = getAccessToken();
    config.headers.Authorization =
      "Bearer " +
      (token
        ? token
        : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"); // set invalid token
    //config.headers.refreshToken = "Bearer ";
    return config;
  }
);

// export const setRefreshToHeader = (refreshToken: string): void => {
//   axios.interceptors.request.use(
//     (config: AxiosRequestConfig): AxiosRequestConfig => {
//       return config;
//     }
//   );
// };

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default methods;
