import { lazy } from "react";
import { IAuthenticatedRoute } from ".";
import { UserRoles } from "../../core/enums";

export const LicenseCancellationConfig: Array<IAuthenticatedRoute> = [
  {
    path: "/MyLicense/Cancellation/CancellationReason/New/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Cancellation/Applicant/SelectCancellationReasonNew/SelectCancellationReasonNew"
      ).then((module) => ({
        default: module.SelectCancellationReasonNew,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/MyLicense/Cancellation/CancellationReason/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Cancellation/Applicant/SelectCancellationReason/SelectCancellationReason"
      ).then((module) => ({
        default: module.SelectCancellationReason,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/License/Cancellation/IssuingManager/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Cancellation/IssuingManager/IssuingManager"
      ).then((module) => ({
        default: module.IssuingManager,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionIssuingManager],
  },
  {
    path: "/License/Cancellation/Secretariat/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Cancellation/Secretariat/Secretariat"
      ).then((module) => ({
        default: module.Secretariat,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/License/Cancellation/List",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Cancellation/Applicant/CancellationList/CancellationList"
      ).then((module) => ({
        default: module.CancelltionList,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/License/Cancellation/PayRate/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Cancellation/Applicant/CancellationPay/CancellationPay"
      ).then((module) => ({
        default: module.CancellationPay,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageLicense/IssuingResponsible/Cartable/Cancellation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Cancellation/IssuingResponsible/IssuingResponsible"
      ).then((module) => ({
        default: module.IssuingResponsible,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionIssuingResponsible],
  },
];
