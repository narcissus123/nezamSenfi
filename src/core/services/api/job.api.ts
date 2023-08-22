import { ToastTypes } from "../../enums";
import { useMutation, useQuery } from "react-query";
import { showToast } from "../../utils";
import methods from "../interceptors/http.interceptor";
import { IAxiosResult } from "../../models/axios-result.model";
import { AxiosResponse } from "axios";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

interface ICreateJobSetion {
  title: string;
  code: string;
}

interface IGetJobSection {
  page: number;
  pageSize: number;
  title: string | null;
  code: string | null;
}

interface ICreateProductionUnit {
  title: string;
  abbreviation: string;
}

interface IEditProductUnit {
  title: string;
  abbreviation: string;
  id: number;
}

interface IGetProductUnitByFilter {
  page: number;
  pageSize: number;
  title: string | null;
  abbreviation: string | null;
}

interface ICreateActivityMeasurementUnit {
  title: string;
  code: string;
  viewOrder: number;
}
interface IGetActivityMeasurementUnitByFilter {
  page: number;
  pageSize: number;
  title: string | null;
  code: string | null;
}

interface IEditActivityMeasurementUnit {
  title: string;
  code: string;
  viewOrder: number;
  id: number;
}

interface IGetJobProductionFactorByFilter {
  page: number;
  pageSize: number;
  title: string | null;
  code: string | null;
  status: boolean | null;
  viewOrder: number | null;
  typeOfDependence: number | null;
  possibilityOfRepetition: number | null;
  jobId: number | null;
}

interface IGetJobProductByFilter {
  page: number;
  pageSize: number;
  title: string | null;
  code: string | null;
  status: boolean | null;
  viewOrder: number | null;
  productUnitId: number | null;
  productCategoryId: number | null;
}

interface ICreateJobProductionFactor {
  title: string;
  code: string;
  description: string;
  jobId: number;
  activityMeasurementUnitId: number;
  productionFactorProductItems: {
    productId: number;
    maximumCapacity: string;
  }[];
  productionEstablishment: number;
}

interface IEditJobProductionFactor {
  id: number;
  title: string;
  code: string;
  description: string;
  jobId: number;
  activityMeasurementUnitId: number;
  productionFactorProductItems: {
    productId: number;
    maximumCapacity: string;
  }[];
  productionEstablishment: number;
}

const CreateJobSection = async (
  obj: ICreateJobSetion
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Job/CreateJobSection`, obj);
};

const GetJobSectionByFilter = async (
  obj: IGetJobSection
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Job/GetJobSectionByFilter`, obj);
};

const CreateProductUnit = async (
  obj: ICreateProductionUnit
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Job/CreateProductUnit`, obj);
};

const GetProductUnitByFilter = async (
  obj: IGetProductUnitByFilter
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Job/GetProductUnitByFilter`, obj);
};

const EditProductUnit = async (
  obj: IEditProductUnit
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Job/EditProductUnit`, obj);
};

const GetIssuingJobRequireDocumentHistory = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Job/GetIssuingJobRequireDocument`,
    obj
  );
};

const getIssuingJobRequireDocument = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Job/GetIssuingJobRequireDocument?JobCategoryType=${id}`
  );
};

const GetCancellationJobRequireDocumentHistory = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Job/GetCancellationJobRequireDocument`,
    obj
  );
};

const GetMaxProductCode = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Job/GetMaxProductCode?ProductCategoryId=${obj.ProductCategoryId}`
  );
};

const GetMaxFigureCode = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Job/GetMaxFigureCode?ProductId=${obj.ProductCategoryId}`
  );
};

const GetCancellationJobRequireDocument = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Job/GetCancellationJobRequireDocument?JobCategoryType=${id}`
  );
};

const SetProductCategory = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Job/SetProductCategory`, obj);
};
const GetProductCategoryByFilter = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Job/GetProductCategoryByFilter`,
    obj
  );
};
const DeleteProductCategory = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/DeleteProductCategory?ProductCategoryId=${id}`
  );
};
const SetIssuingJobRequireDocument = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Job/SetIssuingJobRequireDocument`,
    obj
  );
};

const SetCancellationJobRequireDocument = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Job/SetCancellationJobRequireDocument`,
    obj
  );
};

const DeleteProductUnit = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/DeleteProductUnit?productUnitId=${id}`
  );
};

const GetAllUnUsedDocumentForJobInIsuuing = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetAllUnUsedDocumentForJobInIsuuing?jobId=${id}`
  );
};

const GetAllUnUsedDocumentForJobInCancellation = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetAllUnUsedDocumentForJobInCancellation?jobId=${id}`
  );
};

const GetAllJobByUseTypeForDropDown = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetAllJobByUseTypeForDropDown?useTypeId=${id}`
  );
};

const GetAllJobsWithUseTypeOfLicenseRequestPrimaryInfo = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetAllJobsWithUseTypeOfLicenseRequestPrimaryInfo?licenseRequestId=${id}`
  );
};









const GetAllUnionUseTypes = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Union/GetAllUnionUseTypes?UnionId=${id}`
  );
};
const GetJobsByUnionUseTypes = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Union/GetJobsByUnionUseTypes`,
    obj
  );
};








const CreateActivityMeasurementUnit = async (
  obj: ICreateActivityMeasurementUnit
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Job/CreateActivityMeasurementUnit`,
    obj
  );
};

const CreateJobProductionFactor = async (
  obj: ICreateJobProductionFactor
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Job/CreateJobProductionFactor`,
    obj
  );
};
const SetProductionFactorDependency = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Job/SetProductionFactorDependency`,
    obj
  );
};
const GetAvailableProductionFactorBasedOnEstablishment = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Job/GetAvailableProductionFactorBasedOnEstablishment`,
    obj
  );
};
const GetAllJobProductionFactorByJobsId = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Job/GetAllJobProductionFactorByJobsId`,
    obj
  );
};
const GetAllJobByUseTypesForDropDown = async (obj: {
  useTypesId: number[];
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Job/GetAllJobByUseTypesForDropDown`,
    obj
  );
};
const GetAllAgriculturalToolsAndServiceByTypesID = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/AgriculturalToolsData/GetAllAgriculturalToolsAndServiceByTypesID?${obj}`
  );
};

const GetJobProductionFactorDependencyDetailsByProductionFactorId = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetJobProductionFactorDependencyDetailsByProductionFactorId?jobProductionFactorId=${obj}`
  );
};

const CreateJobFigure = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Job/CreateJobFigure`, obj, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const EditJobFigure = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Job/EditJobFigure`, obj, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const EditJobProduct = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Job/EditJobProduct`, obj, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const GetActivityMeasurementUnitByFilter = async (
  obj: IGetActivityMeasurementUnitByFilter
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Job/GetActivityMeasurementUnitByFilter`,
    obj
  );
};

const GetAllActivityMeasurementUnit = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(`${MainUrl}/api/Job/GetAllActivityMeasurementUnit`);
};
const GetAllProductCategory = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(`${MainUrl}/api/Job/GetAllProductCategory`);
};

const GetJobProductionFactorDetailsById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetJobProductionFactorDetailsById?jobProductionFactorId=${id}`
  );
};

const GetAllJobProductByProductCategoryId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetAllJobProductByProductCategoryId?productCategoryId=${id}`
  );
};

const GetAllProductUnitId = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/Job/GetAllproductUnitId`, obj);
};

const EditActivityMeasurementUnit = async (
  obj: IEditActivityMeasurementUnit
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Job/EditActivityMeasurementUnit`,
    obj
  );
};

const EditJobProductionFactor = async (
  obj: IEditJobProductionFactor
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Job/EditJobProductionFactor`, obj);
};

const CreateJobProduct = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Job/CreateJobProduct`, obj);
};

const GetJobFigureByFilter = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Job/GetJobFigureByFilter`, obj);
};

const DeleteActivityMeasurementUnit = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/DeleteActivityMeasurementUnit?activityMeasurementUnitId=${id}`
  );
};

const DeleteJobProductionFactor = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    `${MainUrl}/api/Job/DeleteJobProductionFactor?productionFactorId=${id}`
  );
};

const DeleteJobFigure = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    `${MainUrl}/api/Job/DeleteJobFigure?figureId=${id}`
  );
};

const DeleteJobProduct = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(
    `${MainUrl}/api/Job/DeleteJobProduct?productId=${id}`
  );
};

const GetAllJobProductionFactorByJobId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetAllJobProductionFactorByJobId?jobId=${id}`
  );
};

const GetAllJobProductionFactorByTypeOfDependence = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetAllJobProductionFactorByTypeOfDependence?TypeOfDependence=${id}`
  );
};

const GetAllJobProductByProductionFactorId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetAllJobProductByProductionFactorId?productionFactorId=${id}`
  );
};

const GetProductCategoryDetailsById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetProductCategoryDetailsById?productCategoryId=${id}`
  );
};

const GetAllProductCategoryByCPCCode = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetAllProductCategoryByCPCCode?cPCCode=${id}`
  );
};

const GetAllJobFigureByProductId = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Job/GetAllJobFigureByProductId?productId=${id}`
  );
};

const GetJobProductionFactorByFilter = async (
  obj: IGetJobProductionFactorByFilter
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Job/GetJobProductionFactorByFilter`,
    obj
  );
};

const GetJobProductByFilter = async (
  obj: IGetJobProductByFilter
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Job/GetJobProductByFilter`, obj);
};

export const useGetJobProductionFactorByFilter = () => {
  return useMutation(GetJobProductionFactorByFilter, {});
};

export const useGetAllJobByUseTypeForDropDown = () => {
  return useMutation(GetAllJobByUseTypeForDropDown, {});
};

export const useGetAllJobsWithUseTypeOfLicenseRequestPrimaryInfo = () => {
  return useMutation(GetAllJobsWithUseTypeOfLicenseRequestPrimaryInfo, {});
};

export const useGetAllUnionUseTypes = () => {
  return useMutation(GetAllUnionUseTypes, {});
};

export const useGetJobsByUnionUseTypes = () => {
  return useMutation(GetJobsByUnionUseTypes, {});
};

export const useDeleteJobProductionFactor = () => {
  return useMutation(DeleteJobProductionFactor, {});
};

export const useDeleteJobFigure = () => {
  return useMutation(DeleteJobFigure, {});
};

export const useDeleteJobProduct = () => {
  return useMutation(DeleteJobProduct, {});
};

export const useEditJobProductionFactor = () => {
  return useMutation(EditJobProductionFactor, {});
};

export const useEditJobProduct = () => {
  return useMutation(EditJobProduct, {});
};

export const useCreateJobProduct = () => {
  return useMutation(CreateJobProduct, {});
};

export const useGetAllJobProductionFactorByJobId = () => {
  return useMutation(GetAllJobProductionFactorByJobId, {});
};

export const useGetJobProductByFilter = () => {
  return useMutation(GetJobProductByFilter, {});
};

export const useGetJobSectionByFilter = () => {
  return useMutation(GetJobSectionByFilter, {});
};

export const useCreateJobSection = () => {
  return useMutation(CreateJobSection, {});
};

export const useGetJobFigureByFilter = () => {
  return useMutation(GetJobFigureByFilter, {});
};

export const useGetAllJobProductByProductionFactorId = () => {
  return useMutation(GetAllJobProductByProductionFactorId, {});
};

export const useGetProductCategoryDetailsById = () => {
  return useMutation(GetProductCategoryDetailsById, {});
};

export const useGetAllProductCategoryByCPCCode = () => {
  return useMutation(GetAllProductCategoryByCPCCode, {});
};

export const useGetAllJobFigureByProductId = () => {
  return useMutation(GetAllJobFigureByProductId, {});
};

export const useGetMaxProductCode = () => {
  return useMutation(GetMaxProductCode, {});
};

export const useGetMaxFigureCode = () => {
  return useMutation(GetMaxFigureCode, {});
};

export const useCreateProductUnit = () => {
  return useMutation(CreateProductUnit, {});
};

export const useCreateJobProductionFactor = () => {
  return useMutation(CreateJobProductionFactor, {});
};

export const useCreateJobFigure = () => {
  return useMutation(CreateJobFigure, {});
};

export const useEditJobFigure = () => {
  return useMutation(EditJobFigure, {});
};

export const useGetProductUnitByFilter = () => {
  return useMutation(GetProductUnitByFilter, {});
};

export const useDeleteProductUnit = () => {
  return useMutation(DeleteProductUnit, {});
};

export const useGetAllUnUsedDocumentForJobInIsuuing = (id: number) => {
  return useQuery("GetAllUnUsedDocumentForJobInIsuuing", () =>
    GetAllUnUsedDocumentForJobInIsuuing(id)
  );
};

export const useGetAllUnUsedDocumentForJobInCancellation = (id: number) => {
  return useQuery("GetAllUnUsedDocumentForJobInCancellation", () =>
    GetAllUnUsedDocumentForJobInCancellation(id)
  );
};

export const useEditProductUnit = () => {
  return useMutation(EditProductUnit, {});
};

export const useGetIssuingJobRequireDocumentHistory = () => {
  return useMutation(GetIssuingJobRequireDocumentHistory, {});
};

export const useGetIssuingJobRequireDocument = () => {
  return useMutation(getIssuingJobRequireDocument, {});
};
export const useGetCancellationJobRequireDocumentHistory = () => {
  return useMutation(GetCancellationJobRequireDocumentHistory, {});
};

export const useGetCancellationJobRequireDocument = () => {
  return useMutation(GetCancellationJobRequireDocument, {});
};
export const useSetIssuingJobRequireDocument = () => {
  return useMutation(SetIssuingJobRequireDocument, {});
};

export const useSetCancellationJobRequireDocument = () => {
  return useMutation(SetCancellationJobRequireDocument, {});
};

export const useCreateActivityMeasurementUnit = () => {
  return useMutation(CreateActivityMeasurementUnit, {});
};
export const useGetActivityMeasurementUnitByFilter = () => {
  return useMutation(GetActivityMeasurementUnitByFilter, {});
};
export const useEditActivityMeasurementUnit = () => {
  return useMutation(EditActivityMeasurementUnit, {});
};
export const useDeleteActivityMeasurementUnit = () => {
  return useMutation(DeleteActivityMeasurementUnit, {});
};
export const useGetAllJobProductionFactorByTypeOfDependence = () => {
  return useMutation(GetAllJobProductionFactorByTypeOfDependence, {});
};
export const useGetAllJobProductByProductCategoryId = () => {
  return useMutation(GetAllJobProductByProductCategoryId, {});
};
export const useSetProductCategory = () => {
  return useMutation(SetProductCategory, {});
};
export const useGetProductCategoryByFilter = () => {
  return useMutation(GetProductCategoryByFilter, {});
};
export const useDeleteProductCategory = () => {
  return useMutation(DeleteProductCategory, {});
};

export const useGetAllActivityMeasurementUnit = () => {
  return useQuery(
    "GetAllActivityMeasurementUnit",
    GetAllActivityMeasurementUnit
  );
};
export const useGetAllProductCategory = () => {
  return useQuery("GetAllProductCategory", GetAllProductCategory);
};
export const useGetJobProductionFactorDetailsById = (id: number) => {
  return useQuery("GetJobProductionFactorDetailsById", () =>
    GetJobProductionFactorDetailsById(id)
  );
};
export const useGetAllProductUnitId = () => {
  return useQuery("GetAllProductUnitId", GetAllProductUnitId);
};








export const useSetProductionFactorDependency = () => {
  return useMutation(SetProductionFactorDependency, {});
};
export const useGetAvailableProductionFactorBasedOnEstablishment = () => {
  return useMutation(GetAvailableProductionFactorBasedOnEstablishment, {});
};
export const useGetAllJobProductionFactorByJobsId = () => {
  return useMutation(GetAllJobProductionFactorByJobsId, {});
};
export const useGetAllJobByUseTypesForDropDown = () => {
  return useMutation(GetAllJobByUseTypesForDropDown, {});
};
export const useGetAllAgriculturalToolsAndServiceByTypesID = () => {
  return useMutation(GetAllAgriculturalToolsAndServiceByTypesID, {});
};

export const useGetJobProductionFactorDependencyDetailsByProductionFactorId = (id: any) => {
  return useQuery("GetJobProductionFactorDependencyDetailsByProductionFactorId",() => GetJobProductionFactorDependencyDetailsByProductionFactorId(id));
};
