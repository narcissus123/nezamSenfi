import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const SetPaymentTypeRole = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/PaymentType/SetPaymentTypeRole`,
    data
  );
};

const GetAllPayableValueOfMainLocation = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/MainLocationPayable/GetAllPayableValueOfMainLocation`,
    data
  );
};

const GetCurrentMaximumValue = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/PaymentType/GetCurrentMaximumValue`,
    data
  );
};

const NewInspectionInspectionType = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/InspectionTable/NewInspectionInspectionType`,
    data
  );
};

const GetInspectionInspectionTypeValues = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/InspectionTable/GetInspectionInspectionTypeValues`,
    data
  );
};

const GetAllPayableValues = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/PaymentType/GetAllPayableValues`,
    data
  );
};

const SetMaximumPayableValue = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/PaymentType/SetMaximumPayableValue`,
    data
  );
};

const SetPayableValueType = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/PaymentType/SetPayableValueType`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const GetPayableValueOfRole = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/PaymentType/GetPayableValueOfRole`,
    data
  );
};

const GetAllJobCategoryTariffs = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/JobCategoryTariff/GetAllJobCategoryTariffs`,
    data
  );
};

const SetJobCategoryTariff = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/JobCategoryTariff/SetJobCategoryTariff`,
    data
  );
};

const GetAllPayableTypeMaximum = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/PaymentType/GetAllPayableTypeMaximum`,
    data
  );
};

const SetMainLocationPayableValue = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/MainLocationPayable/SetMainLocationPayableValue`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const GetPayableTypesForSetToRoles = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    `${MainUrl}/api/PaymentType/GetPayableTypesForSetToRoles`
  );
};

const GetActiveTariff = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    `${MainUrl}/api/Tariff/GetActiveTariff`
  );
};

const GetPayableTypesThatShouldDefineMaximumValue = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    `${MainUrl}/api/PaymentType/GetPayableTypesThatShouldDefineMaximumValue`
  );
};

const GetInspectionInspectionTypeLandAreaModel = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    `${MainUrl}/api/InspectionTable/GetInspectionInspectionTypeLandAreaModel`
  );
};


const GetPaymentType = async (
  userRoleOfFinancialPayableValue: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PaymentType/GetPaymentType?userRoleOfFinancialPayableValue=${userRoleOfFinancialPayableValue}`
  );
};

export const useSetPaymentTypeRole = () => {
  return useMutation(SetPaymentTypeRole, {});
};

export const useSetMainLocationPayableValue = () => {
  return useMutation(SetMainLocationPayableValue, {});
};

export const useGetAllPayableValueOfMainLocation = () => {
  return useMutation(GetAllPayableValueOfMainLocation, {});
};

export const useNewInspectionInspectionType = () => {
  return useMutation(NewInspectionInspectionType, {});
};


export const useGetInspectionInspectionTypeValues = () => {
  return useMutation(GetInspectionInspectionTypeValues, {});
};

export const useGetAllPayableValues = () => {
  return useMutation(GetAllPayableValues, {});
};

export const useSetMaximumPayableValue = () => {
  return useMutation(SetMaximumPayableValue, {});
};

export const useGetCurrentMaximumValue = () => {
  return useMutation(GetCurrentMaximumValue, {});
};

export const useGetAllPayableTypeMaximum = () => {
  return useMutation(GetAllPayableTypeMaximum, {});
};

export const useSetPayableValueType = () => {
  return useMutation(SetPayableValueType, {});
};

export const useGetPayableValueOfRole = () => {
  return useMutation(GetPayableValueOfRole, {});
};

export const useSetJobCategoryTariff = () => {
  return useMutation(SetJobCategoryTariff, {});
};

export const useGetAllJobCategoryTariffs = () => {
  return useMutation(GetAllJobCategoryTariffs, {});
};

export const useGetPayableTypesForSetToRoles = () => {
  return useQuery("GetPayableTypesForSetToRoles", () =>
    GetPayableTypesForSetToRoles()
  );
};

export const useGetPayableTypesThatShouldDefineMaximumValue = () => {
  return useQuery("GetPayableTypesThatShouldDefineMaximumValue", () =>
    GetPayableTypesThatShouldDefineMaximumValue()
  );
};

export const useGetPaymentType = (userRoleOfFinancialPayableValue: number) => {
  return useQuery("GetPaymentType", () => GetPaymentType(userRoleOfFinancialPayableValue));
};

export const useGetInspectionInspectionTypeLandAreaModel = () => {
  return useQuery("GetInspectionInspectionTypeLandAreaModel", () => GetInspectionInspectionTypeLandAreaModel());
};

export const useGetActiveTariff = () => {
  return useQuery("GetActiveTariff", () => GetActiveTariff());
};
