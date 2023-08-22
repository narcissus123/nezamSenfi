import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import Http from "../interceptors/http.interceptor";
import { ILegalUsersListFilter } from "./../../models";

const Url = process.env.REACT_APP_PUBLIC_PATH;

export const getLegalUsersList = async (
  value: ILegalUsersListFilter
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await Http.post(`${Url}/api/Account/GetLegalUsersList`, value);
  return data.data.result;
};

export const useGetLegalUsersList = () => {
  return useMutation(getLegalUsersList);
};
