import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";

const Url = process.env.REACT_APP_PUBLIC_PATH;

export const GetAllUserClaims = async (): Promise<
  AxiosResponse<IAxiosResult> | any
> => {
  try {
    const result = await methods.get(Url + "/api/Account/GetAllUserClaims");
    return result.data.result;
  } catch (error) {
    return [];
  }
};
