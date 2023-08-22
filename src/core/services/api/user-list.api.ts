import { useMutation } from "react-query";
import Http from "../interceptors/http.interceptor";
import { IRealUsersListFilter } from "../../models";
import { IAxiosResult } from "../../models/axios-result.model";
import { AxiosResponse } from "axios";

const Url = process.env.REACT_APP_PUBLIC_PATH;

export const getRealUsersList = async (
  value: IRealUsersListFilter
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await Http.post(`${Url}/api/Account/GetRealUsersList`, value);
  return data;
};

export const useGetRealUsersList = () => {
  return useMutation(getRealUsersList);
};
