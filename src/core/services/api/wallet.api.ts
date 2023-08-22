import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

export interface IMyTransaction {
  page: number;
  pageSize: number;
  amount: number;
  description: string;
  status: number;
  type: number;
  transactionSection: number;
  positionRequestId?: number;
  licenseRequestId?: number;
  bankId?: number;
  unionId?: number;
  countyGuildroomId?: number;
  provinceGuildroomId?: number;
  userId?: number;
}

const GetMyWalletBalance = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(MainUrl + "/api/Financial/GetMyWalletBalance");
};

const ChargeMyWallet = async (
  amount: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl + "/api/Financial/ChargeMyWallet?amount=" + amount
  );
};

const GetProvinceGuildRoomPostionRequestRate = async (
  positionRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl +
      "/api/Financial/GetProvinceGuildRoomPostionRequestRate?positionRequestId=" +
      positionRequestId
  );
};
const GetCountyUnionPostionRequestRate = async (
  positionRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl +
      "/api/Financial/GetCountyUnionPostionRequestRate?positionRequestId=" +
      positionRequestId
  );
};
const GetMainLocationGuildRoomPostionRequestRate = async (
  positionRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl +
      "/api/Financial/GetMainLocationGuildRoomPostionRequestRate?positionRequestId=" +
      positionRequestId
  );
};
const GetCountyGuildRooomPostionRequestRate = async (
  positionRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl +
      "/api/Financial/GetCountyGuildRooomPostionRequestRate?positionRequestId=" +
      positionRequestId
  );
};

const GetMyTransactions = async (
  obj: IMyTransaction
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Financial/GetMyTransactions", obj);
};

const GetAllTransaction = async (
  obj: IMyTransaction
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl + "/api/Financial/GetAllTransaction", obj);
};

const GetUnionTransaction = async (
  obj: IMyTransaction
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl + "/api/Financial/GetUnionTransaction",
    obj
  );
};

const GetCountyTransaction = async (
  obj: IMyTransaction
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl + "/api/Financial/GetCountyGuildRoomTransaction",
    obj
  );
};
const GetProvinceGuildRoomTransaction = async (
  obj: IMyTransaction
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl + "/api/Financial/GetProvinceGuildRoomTransaction",
    obj
  );
};
const PayProvinceGuildRoomPostionRequestRate = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl + "/api/PositionRequestRate/PayProvinceGuildRoomPostionRequestRate",
    obj
  );
};
const PayCountyGuildRooomPostionRequestRate = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl + "/api/PositionRequestRate/PayCountyGuildRooomPostionRequestRate",
    obj
  );
};
const PayLicenseRequest = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl + "/api/LicenseRequest/PayLicenseRequest",
    obj
  );
};
const PayCountyUnionPostionRequestRate = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl + "/api/PositionRequestRate/PayCountyUnionPostionRequestRate",
    obj
  );
};
const PayMainLocationGuildRoomPostionRequestRate = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl +
      "/api/PositionRequestRate/PayMainLocationGuildRoomPostionRequestRate",
    obj
  );
};
const useGetMainLocationGuildRoomPostionRequestRate = (value: number) => {
  return useQuery("GetMainLocationGuildRoomPostionRequestRate", () =>
    GetMainLocationGuildRoomPostionRequestRate(value)
  );
};
const useGetProvinceGuildRoomPostionRequestRate = (value: number) => {
  return useQuery("GetProvinceGuildRoomPostionRequestRate", () =>
    GetProvinceGuildRoomPostionRequestRate(value)
  );
};
const useGetCountyUnionPostionRequestRate = (value: number) => {
  return useQuery("GetCountyUnionPostionRequestRate", () =>
    GetCountyUnionPostionRequestRate(value)
  );
};
const useGetCountyGuildRooomPostionRequestRate = (value: number) => {
  return useQuery("GetCountyGuildRooomPostionRequestRate", () =>
    GetCountyGuildRooomPostionRequestRate(value)
  );
};
const usePayMainLocationGuildRoomPostionRequestRate = () => {
  return useMutation(PayMainLocationGuildRoomPostionRequestRate, {});
};
const usePayCountyUnionPostionRequestRate = () => {
  return useMutation(PayCountyUnionPostionRequestRate, {});
};
const usePayCountyGuildRooomPostionRequestRate = () => {
  return useMutation(PayCountyGuildRooomPostionRequestRate, {});
};
const usePayLicenseRequest = () => {
  return useMutation(PayLicenseRequest, {});
};
const useGetProvinceGuildRoomTransaction = () => {
  return useMutation(GetProvinceGuildRoomTransaction, {});
};
const usePayProvinceGuildRoomPostionRequestRate = () => {
  return useMutation(PayProvinceGuildRoomPostionRequestRate, {});
};

const useGetCountyTransaction = () => {
  return useMutation(GetCountyTransaction, {});
};

const useGetUnionTransactions = () => {
  return useMutation(GetUnionTransaction, {});
};

const useGetAllTransactions = () => {
  return useMutation(GetAllTransaction, {});
};

const useGetMyTransactions = () => {
  return useMutation(GetMyTransactions, {});
};

const useChargeMyWallet = () => {
  return useMutation(ChargeMyWallet);
};

const useGetMyWalletBalance = () => {
  return useQuery("GetMyWalletBalance", GetMyWalletBalance, {
    refetchOnWindowFocus: false,
  });
};

export {
  useGetMyWalletBalance,
  useChargeMyWallet,
  useGetMyTransactions,
  useGetAllTransactions,
  usePayCountyGuildRooomPostionRequestRate,
  useGetUnionTransactions,
  useGetCountyGuildRooomPostionRequestRate,
  useGetCountyTransaction,
  useGetProvinceGuildRoomTransaction,
  useGetProvinceGuildRoomPostionRequestRate,
  usePayProvinceGuildRoomPostionRequestRate,
  useGetCountyUnionPostionRequestRate,
  usePayCountyUnionPostionRequestRate,
  usePayMainLocationGuildRoomPostionRequestRate,
  useGetMainLocationGuildRoomPostionRequestRate,
  usePayLicenseRequest,
};
