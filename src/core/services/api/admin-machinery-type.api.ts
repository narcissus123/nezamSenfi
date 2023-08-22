import methods from "../interceptors/http.interceptor";
import { useQueryClient, useMutation } from "react-query";
import { ICreateMachineType, IUpdateMachineType } from "./../../models";
import { showToast } from "./../../utils";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetAllMachineTypesByFilterUrl =
  MainUrl + "/api/MachineData/GetAllMachineTypesByFilter";
const CreateMachineTypeUrl = MainUrl + "/api/MachineData/CreateMachineType";
const EditMachineTypeUrl = MainUrl + "/api/MachineData/EditMachineType";
const DeleteMachineTypeByIdUrl =
  MainUrl + "/api/MachineData/DeleteMachineTypeById?machineTypeId=";

const GetAllMachineTypesByFilter = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.post(GetAllMachineTypesByFilterUrl, value);
  return data.data.result;
};

// ---------------------------- Api(create) --------------------------------------

const CreateMachineType = async (
  value: ICreateMachineType
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(CreateMachineTypeUrl, value);
};

// ---------------------------- Api(update) --------------------------------------

const EditMachineType = async (
  value: IUpdateMachineType
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(EditMachineTypeUrl, value);
};

// ---------------------------- Api(delete) --------------------------------------

const DeleteMachineTypeById = async (id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(DeleteMachineTypeByIdUrl + id);
};

// ---------------------------- Queries(create) --------------------------------------
export const useCreateMachineType = () => {
  const queryClient = useQueryClient();
  return useMutation(CreateMachineType, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AllMachineTypes]");
    },
  });
};

// ---------------------------- Queries(update) --------------------------------------
export const useEditMachineType = () => {
  const queryClient = useQueryClient();
  return useMutation(EditMachineType, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AllMachineTypes]");
    },
  });
};

// ---------------------------- Queries(delete) --------------------------------------
export const useDeleteMachineTypeById = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteMachineTypeById, {
    onSuccess: (value: any) => {
      showToast(value.data.message, "success");
      queryClient.resetQueries("[AllMachineTypes]");
    },
  });
};

// ---------------------------- Queries(delete) --------------------------------------
export const useGetAllMachineTypesByFilter = () => {
  return useMutation(GetAllMachineTypesByFilter, {
    onSuccess: (value: any) => {},
  });
};
