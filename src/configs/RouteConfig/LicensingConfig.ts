import { lazy } from "react";
import { IAuthenticatedRoute } from ".";
import { UserRoles } from "../../core/enums";

export const LicensingConfig: Array<IAuthenticatedRoute> = [
  {
    path: "/License/New",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Applicant/NewLicense/New"
      ).then((module) => ({
        default: module.New,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/License/List",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Applicant/NewLicense/List"
      ).then((module) => ({
        default: module.List,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/MyLicense/",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Applicant/MyLicense/List/List"
      ).then((module) => ({
        default: module.List,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/License/Issued/:status",
    component: lazy(() =>
      import("../../screens/Requests/License/Issued").then((module) => ({
        default: module.Issued,
      }))
    ),
    exact: false,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  // {
  //   path: "/ManageLicense/AllRequests",
  //   component: lazy(() =>
  //     import(
  //       "../../screens/Requests/License/Issued/Management/AllRequests"
  //     ).then((module) => ({
  //       default: module.AllRequests,
  //     }))
  //   ),
  //   exact: false,
  //   roles: [UserRoles.UnionExpert],
  // },
  {
    path: "/ManageLicense/MyCartable",
    component: lazy(() =>
      import("../../screens/Requests/License/Issued/Management/Expert").then(
        (module) => ({
          default: module.Expert,
        })
      )
    ),
    exact: false,
    roles: [UserRoles.UnionExpert],
  },
  {
    path: "/ManageLicense/UnionManager/MyCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/UnionManager"
      ).then((module) => ({
        default: module.UnionManager,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionManager],
  },
  {
    path: "/ManageLicense/IssuingResponsible/AllRequests",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/AllRequests"
      ).then((module) => ({
        default: module.AllRequests,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/IssuingResponsible/MyCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/IssuingResponsible"
      ).then((module) => ({
        default: module.IssuingResponsible,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/IssuingManager/MyCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingManager"
      ).then((module) => ({
        default: module.IssuingManager,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingManager],
  },
  {
    path: "/ManageLicense/IssuingResponsible/Matching",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/Matching/Matching"
      ).then((module) => ({
        default: module.Matching,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/Secreteriat/AllRequests",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Secreteriat/AllRequests"
      ).then((module) => ({
        default: module.AllRequests,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageLicense/Secreteriat/MyCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Secreteriat/Secreteriat"
      ).then((module) => ({
        default: module.Secreteriat,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageLicense/Secreteriat/DetailsRequest/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Secreteriat/ManageRequest/RequestDetails"
      ).then((module) => ({
        default: module.RequestDetails,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageLicense/Secreteriat/Cartable/DetailsRequest/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Secreteriat/ManageRequest/Cartable/RequestDetails"
      ).then((module) => ({
        default: module.RequestDetails,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageLicense/IssuingManager/DetailsRequest/",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingManager/ManageRequest"
      ).then((module) => ({
        default: module.ManageRequest,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingManager],
  },
  {
    path: "/License/SetPrimaryInfo/Issued/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Expert/SetPrimaryInfoPage/SetPrimaryInfoPage"
      ).then((module) => ({
        default: module.SetPrimaryInfoPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionExpert],
  },
  {
    path: "/ManageLicense/Expert/RequestDetails/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Expert/DetailsPage"
      ).then((module) => ({
        default: module.DetailsPage,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionExpert],
  },
  {
    path: "/License/Land/",
    component: lazy(() =>
      import("../../screens/Requests/License/LandScreen").then((module) => ({
        default: module.LandScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionExpert],
  },
  {
    path: "/ManageLicense/IssuingResponsible/DetailsRequest/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/ManageRequest/RequestDetails"
      ).then((module) => ({
        default: module.RequestDetails,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/IssuingResponsible/Cartable/DetailsRequest/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/ManageRequest/Cartable"
      ).then((module) => ({
        default: module.RequestDetails,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/IssuingResponsible/ConfirmDocuments/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/ManageRequest/ConfirmDocumentsPage"
      ).then((module) => ({
        default: module.ConfirmDocumentsPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/IssuingResponsible/FacilityAndOperationLicense/:status/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/FacilityAndOperationLicense/FacilityAndOperationLicense"
      ).then((module) => ({
        default: module.FacilityAndOperationLicense,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingResponsible],
  },

  // JAHAD CENTER ROUTES

  {
    path: "/JahadCenter",
    component: lazy(() =>
      import("../../screens/JahadCenter/Manage").then((module) => ({
        default: module.Manage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/JahadCenter/Users/:id",
    component: lazy(() =>
      import("../../screens/JahadCenter/Users/Users").then((module) => ({
        default: module.Users,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/ManageLicense/JahadCenterManager/MyCartable",
    component: lazy(() =>
      import("../../screens/Requests/License/Issued/Management/Jahad").then(
        (module) => ({
          default: module.Jahad,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.JahadCenterManager],
  },
  {
    path: "/ManageLicense/JahadCenter/Cartable/DetailsRequest/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Jahad/DetailsPage"
      ).then((module) => ({
        default: module.DetailsPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.JahadCenterManager],
  },
  {
    path: "/ManageLicense/JahadCenter/Cartable/SendJahadIdea/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Jahad/SendJahadIdeaPage"
      ).then((module) => ({
        default: module.SendJahadIdeaPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.JahadCenterManager],
  },
  {
    path: "/ManageLicense/JahadCenter/Cartable/SendJahadIdea/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Jahad/SendJahadIdeaPage"
      ).then((module) => ({
        default: module.SendJahadIdeaPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.JahadCenterManager],
  },
  {
    path: "/ManageLicense/IssuingResponsible/SetDistrictResult/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/SetDistrictCourtResultPage"
      ).then((module) => ({
        default: module.SetDistrictCourtResultPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/UnionManager/DetailsRequest/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/UnionManager/DetailsPage"
      ).then((module) => ({
        default: module.DetailsPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionManager],
  },
  {
    path: "/ManageLicense/IssuingResponsible/PartCoordinates/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/ManageRequest/RequestDetails/PartCoordinates"
      ).then((module) => ({
        default: module.PartCoordinates,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/IssuingResponsible/IntersectionDetails/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/Matching/IntersectSectionMapPage"
      ).then((module) => ({
        default: module.IntersectSectionMapPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/IssuingResponsible/Sketching/:status/:req_id/",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/Matching/InspectionMatchingSketching/"
      ).then((module) => ({
        default: module.InspectionMatchingSketching,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/IssuingResponsible/LocationPlanning/:status/:req_id/:section_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/Matching/InspectionMatchingLocationPlan/"
      ).then((module) => ({
        default: module.InspectionMatchingLocationPlan,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ManageLicense/IssuingResponsible/FacilityPlanning/:status/:req_id/:section_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/Matching/InspectionMatchingFacilityPlan/InspectionMatchingFacilityPlan"
      ).then((module) => ({
        default: module.InspectionMatchingFacilityPlan,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionIssuingResponsible],
  },
];
