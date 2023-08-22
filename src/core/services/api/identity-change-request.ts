import { ISetLegalIdentityInfo, ISetRealIdentityInfo } from "./../../models";
import { showToast } from "./../../utils";
import { useMutation, useQuery } from "react-query";
import Http from "../interceptors/http.interceptor";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const Url = process.env.REACT_APP_PUBLIC_PATH;

const ChangeUserRealIdentityInformationRequest = async (
  value: ISetRealIdentityInfo
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(
    Url +
      "/api/ChangeUserIdentityRequest/ChangeUserRealIdentityInformationRequest",
    value
  );
};

const PayIdentityChange = async (
  value: ISetRealIdentityInfo
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(
    Url +
      "/api/ChangeUserIdentityRequest/Pay",
    value
  );
};

const GetIssuingResponsibleOfIdentitychangeRequest = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(
    `${Url}/api/ChangeUserIdentityRequest/GetIssuingResponsibleOfIdentitychangeRequest?requestId=${id}`
  );
};

const GetIdentityChangeRequestRate = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(
    `${Url}/api/ChangeUserIdentityRequest/GetIdentityChangeRequestRate?id=${id}`
  );
};

const GetUserLegalIdentityChangeInformationById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(
    `${Url}/api/ChangeUserIdentityRequest/GetUserLegalIdentityChangeInformationById?id=${id}`
  );
};
const GetUserRealIdentityChangeInformationById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.get(
    `${Url}/api/ChangeUserIdentityRequest/GetUserRealIdentityChangeInformationById?id=${id}`
  );
};

const ChangeIssuingResponsibleOfIdentitychangeRequest = async (
  value: ISetRealIdentityInfo
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(
    Url +
      "/api/ChangeUserIdentityRequest/ChangeIssuingResponsibleOfIdentitychangeRequest",
    value
  );
};
const ConfirmIdentityChangeRequestByIssuingResponsible = async (
  value: ISetRealIdentityInfo
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(
    Url +
      "/api/ChangeUserIdentityRequest/ConfirmIdentityChangeRequestByIssuingResponsible",
    value
  );
};
const RejectIdentityChangeRequestByIssuingResponsible = async (
  value: ISetRealIdentityInfo
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(
    Url +
      "/api/ChangeUserIdentityRequest/RejectIdentityChangeRequestByIssuingResponsible",
    value
  );
};
const ChangeUserLegalIdentityInformationRequest = async (
  value: ISetLegalIdentityInfo
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(
    Url +
      "/api/ChangeUserIdentityRequest/ChangeUserLegalIdentityInformationRequest",
    value
  );
};

const GetAllMyIdentityChangeRequest = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await Http.post(
    Url + "/api/ChangeUserIdentityRequest/GetAllMyIdentityChangeRequest",
    value
  );
};

export const useChangeUserRealIdentityInformationRequest = () =>
  useMutation(ChangeUserRealIdentityInformationRequest, {});

export const useChangeUserLegalIdentityInformationRequest = () =>
  useMutation(ChangeUserLegalIdentityInformationRequest, {});

export const useGetAllMyIdentityChangeRequest = () =>
    useMutation(GetAllMyIdentityChangeRequest, {});

export const useChangeIssuingResponsibleOfIdentitychangeRequest = () =>
    useMutation(ChangeIssuingResponsibleOfIdentitychangeRequest, {});

export const useGetIssuingResponsibleOfIdentitychangeRequest = () =>
    useMutation(GetIssuingResponsibleOfIdentitychangeRequest, {});
    
export const usePayIdentityChange = () =>
    useMutation(PayIdentityChange, {});

export const useConfirmIdentityChangeRequestByIssuingResponsible = () =>
    useMutation(ConfirmIdentityChangeRequestByIssuingResponsible, {});

export const useRejectIdentityChangeRequestByIssuingResponsible = () =>
    useMutation(RejectIdentityChangeRequestByIssuingResponsible, {});
    
export const useGetUserLegalIdentityChangeInformationById = (
  id: string | number
) => {
  return useQuery("GetUserLegalIdentityChangeInformationById", () =>
    GetUserLegalIdentityChangeInformationById(+id)
  );
};
export const useGetUserRealIdentityChangeInformationById = (
  id: string | number
) => {
  return useQuery("GetUserRealIdentityChangeInformationById", () =>
    GetUserRealIdentityChangeInformationById(+id)
  );
};
export const useGetIdentityChangeRequestRate = (id: string | number) => {
  return useQuery("GetIdentityChangeRequestRate", () =>
    GetIdentityChangeRequestRate(+id)
  );
};