import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetGeometryById = async (
  geometryId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Geometry/GetGeometryById?geometryId=${geometryId}`
  );
};

const SaveGeometry = async (obj: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Geometry/SaveGeometry`, obj);
};

export const useGetGeometryById = () => {
  return useMutation(GetGeometryById, { retry: 0 });
};

export const useSaveGeometry = () => {
  return useMutation(SaveGeometry, { retry: 0 });
};
