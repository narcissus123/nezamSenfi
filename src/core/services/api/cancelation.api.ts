import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const AddcancellationReason = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/cancellation/AddcancellationReason`, data);
};

const UploadMyLicenseRequestCancellationReasonFile = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/LicenseRequestCansellation/UploadMyLicenseRequestCancellationReasonFile`, data);
};

const GetCnacellationResultByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/cancellation/GetCnacellationResultByFilter`, data);
};

const UpdateCanceletionReason = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/cancellation/UpdatecancellationReason`, data);
};
const DeleteCancellationReason = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/cancellation/DeletecancellationReason?cancellationReasonId=${id}`
  );
};


const RejectDocumentCancellationByIsuuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestCansellation/RejectDocumentCancellationByIsuuingResponsible`,
    data
  );
};



const RejectCancellationByIsuuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestCansellation/RejectCancellationByIsuuingResponsible`, data
  );
};
const ConfirmCancellationByIssuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestCansellation/ConfirmCancellationByIssuingResponsible`,
    data
  );
};
const ConfirmCancellationByIsuuingManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestCansellation/ConfirmCancellationByIssuingManager`,
    data
  );
};
const RejectCancellationByIsuuingManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestCansellation/RejectCancellationByIssuingManager`,
    data
  );
};
const SetNumberAndDateOfCancellation = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestCansellation/SetNumberAndDateOfCancellation`,
    data
  );
};
const GetLicenseRequestCansellationRate = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestCansellation/GetLicenseRequestCansellationRate?licenseRequestId=${id}`
  );
};
const GetMyAllCancellationReasonByLicenecnseRequestId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestCansellation/GetMyAllCancellationReasonByLicenecnseRequestId?licenseRequestId=${id}`
  );
};
const GetAllCancellationReasonByLicenecnseRequestIdByIsuingRespondible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestCansellation/GetAllCancellationReasonByLicenecnseRequestIdByIsuingRespondible?licenseRequestId=${id}`
  );
};
const GetAllCancellationReasonByLicenecnseRequestIdByIsuingManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestCansellation/GetAllCancellationReasonByLicenecnseRequestIdByIsuingManager?licenseRequestId=${id}`
  );
};


const GetAllcancellationReasonForDropdown = async (
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/cancellation/GetAllcancellationReasonForDropdown`
  );
};
const GetMyUnUsedLicenseRequestCancellationReason = async (
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestCansellation/GetMyUnUsedLicenseRequestCancellationReason`
  );
};

const GetMyLicenseRequestCancellationReason = async (
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestCansellation/GetMyLicenseRequestCancellationReason`
  );
};

export const useAddCancellationReason = () => {
  return useMutation(AddcancellationReason, {});
};
export const useUpdateCanceletionReason = () => {
  return useMutation(UpdateCanceletionReason, {});
};
export const useDeleteCanceletionReason = () => {
  return useMutation(DeleteCancellationReason, {});
};



export const useUploadMyLicenseRequestCancellationReasonFile = () => {
  return useMutation(UploadMyLicenseRequestCancellationReasonFile, {});
};



export const useRejectDocumentCancellationByIsuuingResponsible = () => {
  return useMutation(RejectDocumentCancellationByIsuuingResponsible, {});
};
export const useRejectCancellationByIsuuingResponsible = () => {
  return useMutation(RejectCancellationByIsuuingResponsible, {});
};
export const useConfirmCancellationByIssuingResponsible = () => {
  return useMutation(ConfirmCancellationByIssuingResponsible, {});
};
export const useSetNumberAndDateOfCancellation = () => {
  return useMutation(SetNumberAndDateOfCancellation, {});
};
export const useConfirmCancellationByIsuuingManger = () => {
  return useMutation(ConfirmCancellationByIsuuingManger, {});
};
export const useRejectCancellationByIsuuingManager = () => {
  return useMutation(RejectCancellationByIsuuingManager, {});
};

export const useGetCnacellationResultByFilter = () => {
  return useMutation(GetCnacellationResultByFilter, {});
};
export const useGetAllcancellationReasonForDropdown = () => {
  return useQuery("GetAllcancellationReasonForDropdown", () =>
    GetAllcancellationReasonForDropdown()
  );
};
export const useGetMyUnUsedLicenseRequestCancellationReason = () => {
  return useQuery("GetMyUnUsedLicenseRequestCancellationReason", () =>
  GetMyUnUsedLicenseRequestCancellationReason()
  );
};
export const useGetMyLicenseRequestCancellationReason = () => {
  return useQuery("GetMyLicenseRequestCancellationReason", () =>
    GetMyLicenseRequestCancellationReason()
  );
};
export const useGetLicenseRequestCansellationRate = (value: number) => {
  return useQuery("GetLicenseRequestCansellationRate", () =>
  GetLicenseRequestCansellationRate(value)
  );
};
export const useGetMyAllCancellationReasonByLicenecnseRequestId = (value: number) => {
  return useQuery("GetMyAllCancellationReasonByLicenecnseRequestId", () =>
    GetMyAllCancellationReasonByLicenecnseRequestId(value)
  );
};
export const useGetAllCancellationReasonByLicenecnseRequestIdByIsuingRespondible = (value: number) => {
  return useQuery("GetAllCancellationReasonByLicenecnseRequestIdByIsuingRespondible", () =>
    GetAllCancellationReasonByLicenecnseRequestIdByIsuingRespondible(value)
  );
};export const useGetAllCancellationReasonByLicenecnseRequestIdByIsuingManager = (value: number) => {
  return useQuery("GetAllCancellationReasonByLicenecnseRequestIdByIsuingManager", () =>
    GetAllCancellationReasonByLicenecnseRequestIdByIsuingManager(value)
  );
};