import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
const url = MainUrl + "/api/Document/GetAllUserDocument";
const postUrl = MainUrl + "/api/Document/CreateUserDocument";

const getUserDocuments = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(url);
};

const GetAllUserDocumentByUserId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Document/GetAllUserDocumentByUserId?userId=${id}`
  );
};

const GetUserLicenseRequestCancellationReasonByUserId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestCansellation/GetUserLicenseRequestCancellationReasonByUserId?id=${id}`
  );
};

const getAllDocumentFileByUserDocumentId = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Document/GetAllDocumentFileByUserDocumentId?userDocId=${id}`
  );
};

const GetAllUserLicenseDocumentFileByUserDocumentId = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Document/GetAllUserLicenseDocumentFileByUserDocumentId?userLicenseDocumentId=${id}`
  );
};
const GetDocumentByDocumentCategoryTypeEnum = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Document/GetDocumentByDocumentCategoryTypeEnum?type=${id}`
  );
};

const postUploadUserDocument = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(postUrl, data);
};

const deleteUserDocumentByUserDocId = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.delete(
    `${MainUrl}/api/Document/DeleteUserDocumentByUserDocId?userDocId=${id}`
  );
};

const DeleteUserLicenseDocument = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.delete(
    `${MainUrl}/api/Document/DeleteUserLicenseDocument?userDocId=${id}`
  );
};

export const useUserDocuments = () => {
  return useQuery("useUserDocuments", getUserDocuments, {
    retry: 0,
    refetchOnWindowFocus: false,
  });
};

export const useGetAllUserDocumentByUserId = (id: number) => {
  return useQuery(
    "GetAllUserDocumentByUserId",
    () => GetAllUserDocumentByUserId(id),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetUserLicenseRequestCancellationReasonByUserId = (id: number) => {
  return useQuery(
    "GetUserLicenseRequestCancellationReasonByUserId",
    () => GetUserLicenseRequestCancellationReasonByUserId(id),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
};

export const usePostUploadUserDocument = () => {
  return useMutation(postUploadUserDocument, {});
};

export const useGetAllDocumentFileByUserDocumentId = () => {
  return useMutation(getAllDocumentFileByUserDocumentId, {});
};

export const useGetAllUserLicenseDocumentFileByUserDocumentId = () => {
  return useMutation(GetAllUserLicenseDocumentFileByUserDocumentId, {});
};
export const useGetDocumentByDocumentCategoryTypeEnum = () => {
  return useMutation(GetDocumentByDocumentCategoryTypeEnum, {});
};

export const useDeleteUserDocumentByUserDocId = () => {
  return useMutation(deleteUserDocumentByUserDocId, {});
};

export const useDeleteUserLicenseDocument = () => {
  return useMutation(DeleteUserLicenseDocument, {});
};
