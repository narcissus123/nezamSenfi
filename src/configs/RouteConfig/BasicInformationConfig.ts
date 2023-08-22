import { lazy } from "react";
import { IAuthenticatedRoute } from ".";
import { UserRoles } from "../../core/enums";

export const BasicInformationConfig: Array<IAuthenticatedRoute> = [
  {
    path: "/BasicInformation/MachineryTools/MachineTypes",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminMachineryInfo/AdminMacineTypes/AdminMacineTypes"
      ).then((module) => ({
        default: module.AdminMacineTypes,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/MachineryTools/MachineManufacturer",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminMachineryInfo/AdminMachineManufacturer/AdminMachineManufacturer"
      ).then((module) => ({
        default: module.AdminMachineManufacturer,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/MachineryTools/Insurance",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminMachineryInfo/AdminInsurance/AdminInsurance"
      ).then((module) => ({
        default: module.AdminInsurance,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/MachineryTools/Machine",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminMachineryInfo/AdminMachineTools/AdminMachineTools"
      ).then((module) => ({
        default: module.AdminMachineTools,
      }))
    ),
    exact: true,
    status: 1,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/DocumentManagement",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/DocumentManagement/DocumentManagement"
      ).then((module) => ({
        default: module.DocumentManagement,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/ServicesTools/ServicesTypes",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminServicesInfo/AdminServicesTypes/AdminServicesTypes"
      ).then((module) => ({
        default: module.AdminServicesTypes,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/FieldJob/Sections",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminJobInfo/AdminJobSection/AdminJobSection"
      ).then((module) => ({
        default: module.AdminJobSection,
      }))
    ),
    exact: true,
    status: 0,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/FieldJob/Document",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminJobInfo/AdminJobDocument"
      ).then((module) => ({
        default: module.AdminJobDocument,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/ServicesTools/ServicesName",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminServicesInfo/AdminServicesName/AdminServicesName"
      ).then((module) => ({
        default: module.AdminServicesName,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/FieldJob/Job",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminJobInfo/AdminJob/AdminJob"
      ).then((module) => ({
        default: module.AdminJob,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },

  {
    path: "/BasicInformation/FieldJob/Job/:id",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminJobInfo/AdminJob/AdminJobEdit/AdminJobEdit"
      ).then((module) => ({
        default: module.AdminJobEdit,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductsFactor",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/AdminProductsFactors/AdminProductsFactors"
      ).then((module) => ({
        default: module.AdminProductsFactors,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductsFactor/:id",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/AdminProductsFactors/AdminProductsFactorsEdit/AdminProductsFactorsEdit"
      ).then((module) => ({
        default: module.EditProductFactor,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductsFactor/DependencyType/:id",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/AdminDependencyType/AdminDependencyType"
      ).then((module) => ({
        default: module.AdminDependencyType,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductsTools",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/AdminProducts/AdminProducts"
      ).then((module) => ({
        default: module.AdminProducts,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductsTools/:id",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/AdminProducts/AdminProductsEdit/AdminProductsEdit"
      ).then((module) => ({
        default: module.AdminProductsEdit,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductsItems",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/AdminProductItem/AdminProductItem"
      ).then((module) => ({
        default: module.AdminProductItem,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductsCategory",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/AdminProductCategory/AdminProductCategory"
      ).then((module) => ({
        default: module.AdminProductCategory,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductsCategory/:id",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/AdminProductCategory/AdminProductCategoryEdit"
      ).then((module) => ({
        default: module.AdminProductCategoryEdit,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/SeedlingPreparationCenter",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/AdminSeedlingPreparationCenter/"
      ).then((module) => ({
        default: module.AdminSeedlingPreparationCenter,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductsItems/:id",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/AdminProductItem/AdminProductItemEdit/AdminProductItemEdit"
      ).then((module) => ({
        default: module.AdminProductItemEdit,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/FieldJob/SubSection",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminJobInfo/AdminJobSubSection"
      ).then((module) => ({
        default: module.AdminJobSubSection,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/FieldJob/Field",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminJobInfo/AdminJobField/AdminJobField"
      ).then((module) => ({
        default: module.AdminJobField,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/FieldJob/Category",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminJobInfo/AdminJobCategory/AdminJobCategory"
      ).then((module) => ({
        default: module.AdminJobCategory,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/FieldJob/Class",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminJobInfo/AdminJobClass"
      ).then((module) => ({
        default: module.AdminJobClass,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/FieldJob/SubClass",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminJobInfo/AdminJobSubClass"
      ).then((module) => ({
        default: module.AdminJobSubClass,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductsTree",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/ProductTree/ProductTree"
      ).then((module) => ({
        default: module.ProductTree,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ProductUnit",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/ProductUnit"
      ).then((module) => ({
        default: module.ProductUnit,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Products/ActivityMeasurementUnit",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminProductsInfo/ActivityMeasurementUnit/ActivityMeasurementUnit"
      ).then((module) => ({
        default: module.ActivityMeasurementUnit,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Facilities/LandAdjacentType",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminFacilitiesInfo/LandAdjacentType/LandAdjacentType"
      ).then((module) => ({
        default: module.LandAdjacentType,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Facilities/BuildingType",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminFacilitiesInfo/AdminBuildingType/AdminBuildingType"
      ).then((module) => ({
        default: module.AdminBuildingType,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Facilities/AdminWaterWellCoverage",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminFacilitiesInfo/AdminWaterWellCoverage/AdminWaterWellCoverage"
      ).then((module) => ({
        default: module.AdminWaterWellCoverage,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Facilities/MotorPower",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminFacilitiesInfo/AdminMotorPower/AdminMotorPower"
      ).then((module) => ({
        default: module.AdminMotorPower,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Facilities/MotorType",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminFacilitiesInfo/AdminMotorType"
      ).then((module) => ({
        default: module.AdminMotorType,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
];
