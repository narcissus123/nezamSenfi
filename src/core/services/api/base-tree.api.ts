import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { useMutation } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const NewTree = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/BaseTree/New`,
    data
  );
};
const EditTree = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/BaseTree/Edit`,
    data
  );
};
const GetTreeList = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/BaseTree/GetItems`, data);
};

const GetAllBaseTree = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/BaseTree/GetAll?baseCategoryId=${data.id}`
  );
};

const DeleteTree = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    `${MainUrl}/api/BaseTree/Delete?id=${id}`
  );
};

export const useNewTree = () => {
  return useMutation(NewTree, {});
};
export const useEditTree = () => {
  return useMutation(EditTree, {});
};
export const useGetTreeList = () => {
  return useMutation(GetTreeList, {});
};
export const useDeleteTree = () => {
  return useMutation(DeleteTree, {});
};
export const useGetAllBaseTree = () => {
  return useMutation(GetAllBaseTree, {});
};