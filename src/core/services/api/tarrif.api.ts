import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const NewTarrif = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/Tariff/NewTariff`,
    data
  );
};

const GetAllTarrif = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/Tariff/GetAllTariff`,
    data
  );
};


export const useNewTarrif = () => {
  return useMutation(NewTarrif, {});
};
export const useGetAllTarrif = () => {
  return useMutation(GetAllTarrif, {});
};