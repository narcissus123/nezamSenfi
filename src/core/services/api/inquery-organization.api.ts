import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const postCreateOrganization = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Organization/CreateOrganization`,
    data
  );
};
const postEditOrganization = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Organization/EditOrganization`,
    data
  );
};
const postGetAllOrganizationByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Organization/GetAllOrganizationByFilter`,
    data
  );
};
const deleteOrganization = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    `${MainUrl}/api/Organization/DeleteOrganization?organizationId=${id}`
  );
};

const getAllOrganization = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/Organization/GetAllOrganization`);
};

export const usePostCreateOrganization = () => {
  return useMutation(postCreateOrganization, {});
};
export const usePostEditOrganization = () => {
  return useMutation(postEditOrganization, {});
};
export const usePostGetAllOrganizationByFilter = () => {
  return useMutation(postGetAllOrganizationByFilter, {});
};
export const useDeleteOrganization = () => {
  return useMutation(deleteOrganization, {});
};

export const useGetAllOrganization = () => {
  return useQuery("useGetAllOrganization", getAllOrganization);
};
