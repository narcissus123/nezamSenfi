import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const CreateCancellationRequest = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestCansellation/CreateCancellationRequest`,
    data
  );
};

const UploadCancellationDocsByUserApplicant = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestCansellation/UploadCancellationDocsByUserApplicant`,
    data
  );
};


export const useCreateCancellationRequest = () => {
  return useMutation(CreateCancellationRequest, {});
};

export const useUploadCancellationDocsByUserApplicant = () => {
  return useMutation(UploadCancellationDocsByUserApplicant, {});
};
