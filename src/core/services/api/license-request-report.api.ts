import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetLicenseCountByFilterByMainLocationManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestReport/GetLicenseCountByFilterByMainLocationManger`,
    data
  );
};

const GetAllPointByFilterByMainLocationManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestReport/GetAllPointByFilterByMainLocationManager`,
    data
  );
};

export const useGetLicenseCountByFilterByMainLocationManger = () => {
  return useMutation(GetLicenseCountByFilterByMainLocationManger, {});
};
export const useGetAllPointByFilterByMainLocationManager = () => {
  return useMutation(GetAllPointByFilterByMainLocationManager, {});
};