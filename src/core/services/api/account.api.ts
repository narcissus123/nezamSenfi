import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const getUserByNationalCode = async (
  nationalCode: string
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Account/GetUserByNationalCode?nationalCode=${nationalCode}`
  );
};

export const useGetUserByNationalCode = () => {
  return useMutation(getUserByNationalCode, { retry: 0 });
};
