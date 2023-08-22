import methods from "../interceptors/http.interceptor";
import { IDocumentCategory } from "../../models/document-category.model";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const addDocumentCategory = async (
  documentCategory: IDocumentCategory
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/Document/CreateDocumentCategory`,
    documentCategory
  );
};

const addDocument = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(`${MainUrl}/api/Document/CreateDocument`, document);
};

const postDeleteDocumentCategoryById = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.delete(
    `${MainUrl}/api/Document/DeleteDocumentCategoryById?categoryId=${id}`
  );
};

const deleteDocumentById = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.delete(
    `${MainUrl}/api/Document/DeleteDocumentById?documetId=${id}`
  );
};

const getAllDocumentCategory = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return methods.get(`${MainUrl}/api/Document/GetAllDocumentCategory`);
};

const getAllDocument = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(`${MainUrl}/api/Document/GetAllDocumentByFilter`, obj);
};

const getAllUnUsedDocument = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(`${MainUrl}/api/Document/GetAllUnUsedDocument`);
};

const getAllDocumentByCategoryId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Document/GetAllDocumentByCategoryId?categoryId=${id}`
  );
};

export const useDeleteDocumentCategoryById = () => {
  return useMutation(postDeleteDocumentCategoryById, {});
};

export const useDeleteDocumentById = () => {
  return useMutation(deleteDocumentById, {});
};

export const useAddDocumentCategoryData = () => {
  return useMutation(addDocumentCategory, {});
};

export const useAddDocument = () => {
  return useMutation(addDocument, {});
};

export const useAllDocumentCategory = () => {
  return useQuery("getJobInfoData", getAllDocumentCategory, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    enabled: false,
  });
};

export const useAllDocument = () => {
  return useMutation(getAllDocument, {});
};

export const useAllUnUsedDocument = () => {
  return useQuery("useAllUnUsedDocument", getAllUnUsedDocument, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    enabled: false,
  });
};
export const useAllDocumentByCategoryId = () => {
  return useMutation(getAllDocumentByCategoryId, {});
};
