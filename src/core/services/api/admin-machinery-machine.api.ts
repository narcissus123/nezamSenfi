import methods from "../interceptors/http.interceptor";
import { useQueryClient, useMutation } from "react-query";
import { ICreateMachine, IUpdateMachine } from "./../../models";
import { showToast } from "./../../utils";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetAllMachineUrl = MainUrl + "/api/MachineData/GetAllMachinesByFilter";
const CreateMachineUrl = MainUrl + "​/api/MachineData/CreateMachine";
const EditMachineUrl = MainUrl + "/api/MachineData/EditMachine";
const DeleteMachineByIdUrl =
  MainUrl + "/api/MachineData/DeleteMachineById?machineId=";

// ---------------------------- Api(get) --------------------------------------

export const GetAllMachine = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.post(GetAllMachineUrl, value);
  return data.data.result;
};


export const GetAllMachineByProductionFactorId = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(
    `${MainUrl}/api/MachineData/GetAllMachineByProductionFactorId?productionFactorId=${value.id}`
  );
  return data.data.result;
};

export const GetAgriculturalMechanizationServiceOfProductionFactorMachineByExpert =
  async (value: any): Promise<AxiosResponse<IAxiosResult>> => {
    const data = await methods.get(
      `${MainUrl}/api/LicenseRequestGet/GetAgriculturalMechanizationServiceOfProductionFactorMachineByExpert?licenseRequestId=${value.licenseRequestId}&productionFactorMachineId=${value.productionFactorMachineId}`
    );
    return data.data.result;
  };

export const GetOwnToolsOfProductionFactorIdByExpert = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const data = await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetOwnToolsOfProductionFactorIdByExpert?productionFactorId=${value.productionFactorId}`
  );
  return data.data.result;
};
  

// ---------------------------- Api(create) --------------------------------------

const CreateMachine = async (
  value: ICreateMachine
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(CreateMachineUrl, value);
};

// ---------------------------- Api(update) --------------------------------------

const EditMachine = async (
  value: IUpdateMachine
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(EditMachineUrl, value);
};

// ---------------------------- Api(delete) --------------------------------------

const DeleteMachineById = async (id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(DeleteMachineByIdUrl + id);
};

// ---------------------------- Queries(create) --------------------------------------
export const useCreateAdminMachine = () => {
  // const queryClient = useQueryClient();
  return useMutation(CreateMachine, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
    },
  });
};

// ---------------------------- Queries(update) --------------------------------------
export const useEditMachine = () => {
  const queryClient = useQueryClient();
  return useMutation(EditMachine, {
    onSuccess: (value) => {
      showToast(value.data.message, "success");
    },
  });
};

// ---------------------------- Queries(delete) --------------------------------------
export const useDeleteMachineById = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteMachineById, {
    onSuccess: (value: any) => {
      showToast(value.data.message, "success");
    },
  });
};

// ---------------------------- Queries(get) --------------------------------------

export const useGetAllAdminMachine = () => {
  return useMutation(GetAllMachine, {});
};

export const useGetAllMachineByProductionFactorId = () => {
  return useMutation(GetAllMachineByProductionFactorId, {});
};

export const useGetAgriculturalMechanizationServiceOfProductionFactorMachineByExpert = () => {
  return useMutation(GetAgriculturalMechanizationServiceOfProductionFactorMachineByExpert, {});
};

export const useGetOwnToolsOfProductionFactorIdByExpert = () => {
  return useMutation(GetOwnToolsOfProductionFactorIdByExpert, {});
};