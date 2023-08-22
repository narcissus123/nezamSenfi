import methods from "../interceptors/http.interceptor";
import { useQueryClient, useMutation } from "react-query";
import { ICreateMachineType, IUpdateMachineType } from "./../../models";
import { showToast } from "./../../utils";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetAllMachineManufacturerByFilterUrl =
  MainUrl + "/api/MachineData/GetAllMachineManufacturerByFilter";
const CreateMachineManufacturerUrl =
  MainUrl + "/api/MachineData/CreateMachineManufacturer";
const EditMachineManufacturerUrl =
  MainUrl + "/api/MachineData/EditMachineManufacturer";
const DeleteMachineManufacturerByIdUrl =
  MainUrl +
  "/api/MachineData/DeleteMachineManufacturerById?machineManufacturerId=";
// ---------------------------- Api(get) --------------------------------------

const GetAllMachineManufacturerByFilter = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.post(GetAllMachineManufacturerByFilterUrl, value);
  return data.data.result;
};

// ---------------------------- Api(create) --------------------------------------

const CreateMachineManufacturer = async (
  value: ICreateMachineType
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(CreateMachineManufacturerUrl, value);
};

// ---------------------------- Api(update) --------------------------------------

const EditMachineManufacturer = async (
  value: IUpdateMachineType
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(EditMachineManufacturerUrl, value);
};

// ---------------------------- Api(delete) --------------------------------------

const DeleteMachineManufacturerById = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(DeleteMachineManufacturerByIdUrl + id);
};

// ---------------------------- Queries(create) --------------------------------------
export const useCreateMachineManufacturer = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateMachineManufacturer, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AllMachineManufacturer]");
    },
  });
};

// ---------------------------- Queries(update) --------------------------------------
export const useEditMachineManufacturer = () => {
  const queryClient = useQueryClient();
  return useMutation(EditMachineManufacturer, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AllMachineManufacturer]");
    },
  });
};

// ---------------------------- Queries(delete) --------------------------------------
export const useDeleteMachineManufacturerById = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteMachineManufacturerById, {
    onSuccess: (value: any) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AllMachineManufacturer]");
    },
  });
};

// ---------------------------- Queries(get) --------------------------------------
export const useGetAllMachineManufacturerByFilter = () => {
  return useMutation(GetAllMachineManufacturerByFilter);
};
