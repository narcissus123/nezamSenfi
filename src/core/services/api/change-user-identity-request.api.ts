import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetAllIdentityChangeRequestByIssuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ChangeUserIdentityRequest/GetAllIdentityChangeRequestByIssuingResponsible`,
    data
  );
};

const GetAllIdentityChangeRequestByUnionManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ChangeUserIdentityRequest/GetAllIdentityChangeRequestByUnionManger`,
    data
  );
};

const ChangePassword = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ChangeUserIdentityRequest/ChangePassword`,
    data
  );
};

const GetUserLegalIdentityChangeInformationById = async (  id: number ): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return methods.get(
    `${MainUrl}/api/ChangeUserIdentityRequest/GetUserLegalIdentityChangeInformationById?id=${id}`
  );
};

const ReadyAfterUploadDocument = async (  id: number ): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return methods.get(
    `${MainUrl}/api/ChangeUserIdentityRequest/ReadyAfterUploadDocument?id=${id}`
  );
};

const GetUserRealIdentityChangeInformationById = async ( id: number): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return methods.get(
    `${MainUrl}/api/ChangeUserIdentityRequest/GetUserRealIdentityChangeInformationById?id=${id}`
  );
};

export const useGetUserLegalIdentityChangeInformationById = (id:number) => {
  return useQuery("GetUserLegalIdentityChangeInformationById", () => GetUserLegalIdentityChangeInformationById(id));
};
export const useGetUserRealIdentityChangeInformationById = (id:number) => {
  return useQuery("GetUserRealIdentityChangeInformationById", () =>
    GetUserRealIdentityChangeInformationById(id)
  );
};
export const useGetAllIdentityChangeRequestByIssuingResponsible = () => {
  return useMutation(GetAllIdentityChangeRequestByIssuingResponsible, {});
};
export const useGetAllIdentityChangeRequestByUnionManger = () => {
  return useMutation(GetAllIdentityChangeRequestByUnionManger, {});
};
export const useReadyAfterUploadDocument = () => {
  return useMutation(ReadyAfterUploadDocument, {});
};
export const useChangePassword = () => {
  return useMutation(ChangePassword, {});
};