import { lazy } from "react";
import { IAuthenticatedRoute } from ".";

import { UserRoles } from "../../core/enums";

export const AuthenticatedRoutesConfig: Array<IAuthenticatedRoute> = [
  {
    path: "/ManageRequests/SecretariatJobRequestslist/ConfirmProvince/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/SecretariatJobRequestsCheck/JobRequestConfirm/Province"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/Inspection",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Inspection/Inspection"
      ).then((module) => ({
        default: module.Inspection,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionExpert],
  },
  {
    path: "/Requests/EditJob",
    component: lazy(() =>
      import("../../screens/Requests/Job/JobFlow/EditJobFlow").then(
        (module) => ({
          default: module.EditJobFlow,
        })
      )
    ),
    exact: false,
    status: 4,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/Requests/Job",
    component: lazy(() =>
      import("../../screens/Requests/Job/JobFlow/JobFlow").then((module) => ({
        default: module.JobFlow,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageCartable/UnionJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/UnionSecretariatJobRequestListCartablePage/UnionSecretariatJobRequestListCartablePage"
      ).then((module) => ({
        default: module.UnionSecretariatJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageCartable/CountyJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/CountySecretariatJobRequestListCartablePage/CountySecretariatJobRequestListCartablePage"
      ).then((module) => ({
        default: module.CountySecretariatJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountySecretariat],
  },
  {
    path: "/ManageCartable/MainLocationJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/MainLocationSecretariatJobRequestListCartablePage/MainLocationSecretariatJobRequestListCartablePage"
      ).then((module) => ({
        default: module.MainLocationSecretariatJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/ManageCartable/ProvinceJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/ProvinceSecretariatJobRequestListCartablePage/ProvinceSecretariatJobRequestListCartablePage"
      ).then((module) => ({
        default: module.ProvinceSecretariatJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/Requests/UnionJobRequest",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Applicant/UnionJobRequest/UnionJobRequest"
      ).then((module) => ({
        default: module.UnionJobRequest,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/Requests/CountyJobRequest",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Applicant/CountyJobRequest/CountyJobRequest"
      ).then((module) => ({
        default: module.CountyJobRequest,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/",
    component: lazy(() =>
      import("../../screens/Dashboard/Dashboard").then((module) => ({
        default: module.Dashboard,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal, UserRoles.Admin],
  },
  {
    path: "/Beneficiari/MachineryEdit/:id",
    component: lazy(() =>
      import(
        "../../components/BeneficiariContainer/MachineryEdit/MachineryEdit"
      ).then((module) => ({
        default: module.MachineryEdit,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal, UserRoles.Admin],
  },
  {
    path: "/Beneficiari",
    component: lazy(() =>
      import("../../screens/Beneficiary/Beneficiary").then((module) => ({
        default: module.Beneficiary,
      }))
    ),
    exact: false,
    roles: [UserRoles.UserReal, UserRoles.UserLegal, UserRoles.Admin],
  },
  {
    path: "/PersonalInfo",
    component: lazy(() =>
      import(
        "../../screens/PersonalInformation/PersonalInfo/PersonalInfo"
      ).then((module) => ({
        default: module.PersonalInfo,
      }))
    ),
    exact: false,
    roles: [UserRoles.UserReal, UserRoles.UserLegal, UserRoles.Admin],
  },
  {
    path: "/UserList/RealUsersList",
    component: lazy(() =>
      import("../../screens/UsersList/RealUsersList/RealUsersList").then(
        (module) => ({
          default: module.RealUsersList,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/UserList/LegalUsersList",
    component: lazy(() =>
      import("../../screens/UsersList/LegalUserList/LegalUserList").then(
        (module) => ({
          default: module.LegalUserList,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Reports/LicenseCountReports",
    component: lazy(() =>
      import("../../screens/Reports/LicenseCount/LicenseCount").then(
        (module) => ({
          default: module.LicenseCount,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Reports/MapPoints",
    component: lazy(() =>
      import("../../screens/Reports/MapPoints/MapPoints").then((module) => ({
        default: module.MapPoints,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },

  {
    path: "/UserList/RealUsersList/:id",
    component: lazy(() =>
      import(
        "../../screens/PersonalInformation/PersonalInfoById/PersonalInfoById"
      ).then((module) => ({
        default: module.PersonalInfoById,
      }))
    ),
    exact: true,
    roles: [
      UserRoles.Admin,
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.CountyGuildRoomAdmin,
      UserRoles.UnionAdmin,
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.MainLocationGuildRoomViceManager,
      UserRoles.MainLocationGUildRoomExecutiveManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.ProvinceGuildRoomViceManager,
      UserRoles.ProvinceGuildRoomExecutiveManager,
      UserRoles.CountyGuildRoomManager,
      UserRoles.CountyGuildRoomViceManager,
      UserRoles.CountyGuildRoomExecutiveManager,
      UserRoles.UnionManager,
      UserRoles.UnionViceExecutiveManager,
      UserRoles.UnionViceManager,
      UserRoles.ITManger,
      UserRoles.MainLocationSecretariat,
      UserRoles.ProvinceSecretariat,
      UserRoles.CountySecretariat,
      UserRoles.UnionSecretariat,
      UserRoles.MainLocationTreasurer,
      UserRoles.ProvinceTreasurer,
      UserRoles.CountyTreasurer,
      UserRoles.UnionTreasurer,
      UserRoles.UnionExpert,
    ],
  },
  {
    path: "/UserList/LegalUsersList/:id",
    component: lazy(() =>
      import(
        "../../screens/PersonalInformation/PersonalInfoById/PersonalInfoById"
      ).then((module) => ({
        default: module.PersonalInfoById,
      }))
    ),
    exact: true,
    roles: [
      UserRoles.Admin,
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.CountyGuildRoomAdmin,
      UserRoles.UnionAdmin,
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.MainLocationGuildRoomViceManager,
      UserRoles.MainLocationGUildRoomExecutiveManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.ProvinceGuildRoomViceManager,
      UserRoles.ProvinceGuildRoomExecutiveManager,
      UserRoles.CountyGuildRoomManager,
      UserRoles.CountyGuildRoomViceManager,
      UserRoles.CountyGuildRoomExecutiveManager,
      UserRoles.UnionManager,
      UserRoles.UnionViceExecutiveManager,
      UserRoles.UnionViceManager,
      UserRoles.ITManger,
      UserRoles.MainLocationSecretariat,
      UserRoles.ProvinceSecretariat,
      UserRoles.CountySecretariat,
      UserRoles.UnionSecretariat,
      UserRoles.MainLocationTreasurer,
      UserRoles.ProvinceTreasurer,
      UserRoles.CountyTreasurer,
      UserRoles.UnionTreasurer,
      UserRoles.UnionExpert,
    ],
  },
  {
    path: "/UnionsMember/:id",
    component: lazy(() =>
      import(
        "../../screens/PersonalInformation/PersonalInfoById/PersonalInfoById"
      ).then((module) => ({
        default: module.PersonalInfoById,
      }))
    ),
    exact: true,
    roles: [
      UserRoles.Admin,
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.CountyGuildRoomManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.UnionManager,
    ],
  },

  {
    path: "/Wallet/ChargeWallet",
    component: lazy(() =>
      import("../../screens/Wallet/AddMoneyPage/AddMoneyPage").then(
        (module) => ({
          default: module.AddMoneyPage,
        })
      )
    ),
    exact: false,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  // {
  //   path: "/Wallet/Success",
  //   component: lazy(() =>
  //     import("../../screens/Wallet/SuccessPage/SuccessPage").then((module) => ({
  //       default: module.SuccessPage,
  //     }))
  //   ),
  //   exact: false,
  //   roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  // },
  // {
  //   path: "/Wallet/Fail",
  //   component: lazy(() =>
  //     import("../../screens/Wallet/FailPage/FailPage").then((module) => ({
  //       default: module.FailPage,
  //     }))
  //   ),
  //   exact: false,
  //   roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  // },
  {
    path: "/Wallet/UserTransactions",
    component: lazy(() =>
      import(
        "../../screens/Wallet/UserTransactionListPage/UserTransactionListPage"
      ).then((module) => ({
        default: module.UserTransactionListPage,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/Wallet/AllTransactions",
    component: lazy(() =>
      import(
        "../../screens/Wallet/AllTransactionListPage/AllTransactionListPage"
      ).then((module) => ({
        default: module.AllTransactionListPage,
      }))
    ),
    exact: false,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Wallet/UnionTransactions",
    component: lazy(() =>
      import(
        "../../screens/Wallet/UnionTransactionListPage/UnionTransactionListPage"
      ).then((module) => ({
        default: module.UnionTransactionListPage,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionManager],
  },
  {
    path: "/Wallet/CountyTransactions",
    component: lazy(() =>
      import(
        "../../screens/Wallet/CountyTransactionListPage/CountyTransactionListPage"
      ).then((module) => ({
        default: module.CountyTransactionListPage,
      }))
    ),
    exact: false,
    roles: [UserRoles.CountyGuildRoomManager],
  },
  {
    path: "/Wallet/ProvinceTransactions",
    component: lazy(() =>
      import(
        "../../screens/Wallet/ProvinceTransactionListPage/ProvinceTransactionListPage"
      ).then((module) => ({
        default: module.ProvinceTransactionListPage,
      }))
    ),
    exact: false,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/SecretariatJobRequestslist"
      ).then((module) => ({
        default: module.SecretariatJobRequestslistPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/SecretariatJobRequestsCheck/JobRequestDetails/County"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/MainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/SecretariatJobRequestsCheck/JobRequestDetails/MainLocation"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/SecretariatJobRequestsCheck/JobRequestDetails/Province"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/SecretariatJobRequestsCheck/JobRequestDetails/Union"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageRequests/ProvinceSecretariatJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/ProvinceSecretariatJobRequestListPage/ProvinceSecretariatJobRequestListPage"
      ).then((module) => ({
        default: module.ProvinceSecretariatJobRequestListPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/ManageRequests/MainLocationSecretariatJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/MainLocationSecretariatJobRequestListPage/MainLocationSecretariatJobRequestListPage"
      ).then((module) => ({
        default: module.MainLocationSecretariatJobRequestListPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/ManageRequests/CountySecretariatJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/CountySecretariatJobRequestListPage/CountySecretariatJobRequestListPage"
      ).then((module) => ({
        default: module.CountySecretariatJobRequestListPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountySecretariat],
  },
  {
    path: "/ManageRequests/UnionSecretariatJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/UnionSecretariatJobRequestListPage/UnionSecretariatJobRequestListPage"
      ).then((module) => ({
        default: module.UnionSecretariatJobRequestListPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/Requests/MainLocationJobRequest",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Applicant/MainLocationJobRequest/MainLocationJobRequest"
      ).then((module) => ({
        default: module.MainLocationJobRequest,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/Requests/ProvinceJobRequest",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Applicant/ProvinceJobRequest/ProvinceJobRequest"
      ).then((module) => ({
        default: module.ProvinceJobRequest,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/Inspection/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Inspection"
      ).then((module) => ({
        default: module.Inspection,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageRequests/MainLocationManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/MainLocationManagerJobRequestsListPage/MainLocationManagerJobRequestsListPage"
      ).then((module) => ({
        default: module.MainLocationManagerJobRequestsListPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/ManageRequests/MainLocationViceManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ViceManager/ViceManagerList/MainLocation"
      ).then((module) => ({
        default: module.MainLocationScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomViceManager],
  },
  {
    path: "/ManageRequests/MainLocationExecutiveManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ExecutiveManager/ExecutiveManagerList/MainLocation"
      ).then((module) => ({
        default: module.MainLocationScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGUildRoomExecutiveManager],
  },
  {
    path: "/ManageRequests/ProvinceManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ProvinceManagerJobRequestsListPage/ProvinceManagerJobRequestsListPage"
      ).then((module) => ({
        default: module.ProvinceManagerJobRequestsListPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/ManageRequests/ProvinceViceManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ViceManager/ViceManagerList/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/ManageRequests/ProvinceExecutiveManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ExecutiveManager/ExecutiveManagerList/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },
  {
    path: "/ManageRequests/CountyManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/CountyManagerJobRequestsListPage"
      ).then((module) => ({
        default: module.CountyManagerJobRequestsListPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomManager],
  },
  {
    path: "/ManageRequests/CountyViceManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ViceManager/ViceManagerList/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomViceManager],
  },
  {
    path: "/ManageRequests/CountyExecutiveManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ExecutiveManager/ExecutiveManagerList/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomExecutiveManager],
  },
  {
    path: "/ManageRequests/UnionManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/UnionManagerJobRequestsListPage"
      ).then((module) => ({
        default: module.UnionManagerJobRequestsListPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionManager],
  },
  {
    path: "/ManageRequests/UnionViceManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ViceManager/ViceManagerList/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionViceManager],
  },
  {
    path: "/ManageRequests/UnionExecutiveManagerJobRequestList",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ExecutiveManager/ExecutiveManagerList/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionViceExecutiveManager],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/ConfirmCounty/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/SecretariatJobRequestsCheck/JobRequestConfirm/County"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountySecretariat],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/ConfirmMainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/SecretariatJobRequestsCheck/JobRequestConfirm/MainLocation"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },

  {
    path: "/ManageRequests/SecretariatJobRequestslist/ConfirmUnion/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/JobRequestslist/SecretariatJobRequestsCheck/JobRequestConfirm/Union"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageRequests/TreasurerJobRequestslist/ConfirmUnion/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Treasurer/JobRequestsCheck/JobRequestConfirm/Union/Union"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionTreasurer],
  },
  {
    path: "/ManageRequests/TreasurerJobRequestslist/ConfirmCounty/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Treasurer/JobRequestsCheck/JobRequestConfirm/County/SecretariatJobRequestsCheck"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyTreasurer],
  },
  {
    path: "/ManageRequests/TreasurerJobRequestslist/ConfirmProvince/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Treasurer/JobRequestsCheck/JobRequestConfirm/Province/Province"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceTreasurer],
  },
  {
    path: "/ManageRequests/TreasurerJobRequestslist/ConfirmMainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Treasurer/JobRequestsCheck/JobRequestConfirm/MainLocation/MainLocation"
      ).then((module) => ({
        default: module.SecretariatJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationTreasurer],
  },
  {
    path: "/ManageCartable/UnionUpManagerJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/UnionManagerJobRequestListCartablePage"
      ).then((module) => ({
        default: module.UnionManagerJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomManager],
  },
  {
    path: "/ManageCartable/CountyUpManagerJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/CountyManagerJobRequestListCartablePage"
      ).then((module) => ({
        default: module.CountyManagerJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/ManageCartable/MainLocationManagerJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/MainLocationManagerJobRequestListCartablePage"
      ).then((module) => ({
        default: module.MainLocationManagerJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/ManageCartable/ProvinceUpManagerJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/ProvinceManagerJobRequestListCartablePage/ProvinceManagerJobRequestListCartablePage"
      ).then((module) => ({
        default: module.ProvinceManagerJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  // {
  //   path: "/ManageRequests/ManagerInquiry/:status/ConfirmCounty/:id",
  //   component: lazy(() =>
  //     import(
  //       "../../screens/Requests/Job/ManagerJobRequestsList/ManagerCartable/CountyManagerJobRequestListCartablePage/ConfirmInquiry"
  //     ).then((module) => ({
  //       default: module.ConfirmInquiry,
  //     }))
  //   ),
  //   exact: true,
  //   roles: [UserRoles.CountyGuildRoomManager],
  // },
  {
    path: "/ManageRequests/ManagerInquiry/:status/ConfirmCounty/:id/letter/:letter_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/CountyManagerJobRequestListCartablePage/InquiryLetterPage/InquiryLetterPage"
      ).then((module) => ({
        default: module.InquiryLetterPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomManager, UserRoles.CountySecretariat],
  },
  // {
  //   path: "/ManageRequests/ManagerInquiry/:status/ConfirmProvince/:id",
  //   component: lazy(() =>
  //     import(
  //       "../../screens/Requests/Job/ManagerJobRequestsList/ManagerCartable/ProvinceManagerJobRequestListCartablePage/ConfirmInquiry"
  //     ).then((module) => ({
  //       default: module.ConfirmInquiry,
  //     }))
  //   ),
  //   exact: true,
  //   roles: [UserRoles.ProvinceGuildRoomManager],
  // },
  {
    path: "/ManageRequests/ManagerInquiry/:status/ConfirmProvince/:id/letter/:letter_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/ProvinceManagerJobRequestListCartablePage/InquiryLetterPage/InquiryLetterPage"
      ).then((module) => ({
        default: module.InquiryLetterPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager, UserRoles.ProvinceSecretariat],
  },
  // {
  //   path: "/ManageRequests/ManagerInquiry/:status/ConfirmMainLocation/:id",
  //   component: lazy(() =>
  //     import(
  //       "../../screens/Requests/Job/ManagerJobRequestsList/ManagerCartable/MainLocationManagerJobRequestListCartablePage/ConfirmInquiry"
  //     ).then((module) => ({
  //       default: module.ConfirmInquiry,
  //     }))
  //   ),
  //   exact: true,
  //   roles: [UserRoles.MainLocationGuildRoomManager],
  // },
  {
    path: "/ManageRequests/ManagerInquiry/:status/ConfirmMainLocation/:id/letter/:letter_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/MainLocationManagerJobRequestListCartablePage/InquiryLetterPage/InquiryLetterPage"
      ).then((module) => ({
        default: module.InquiryLetterPage,
      }))
    ),
    exact: true,
    roles: [
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.MainLocationSecretariat,
    ],
  },
  // {
  //   path: "/ManageRequests/ManagerInquiry/:status/ConfirmUnion/:id",
  //   component: lazy(() =>
  //     import(
  //       "../../screens/Requests/Job/ManagerJobRequestsList/ManagerCartable/UnionManagerJobRequestListCartablePage/ConfirmInquiry/ConfirmInquiry"
  //     ).then((module) => ({
  //       default: module.ConfirmInquiry,
  //     }))
  //   ),
  //   exact: true,
  //   roles: [UserRoles.UnionManager],
  // },
  {
    path: "/ManageRequests/ManagerInquiry/:status/ConfirmUnion/:id/letter/:letter_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/UnionManagerJobRequestListCartablePage/InquiryLetterPage/InquiryLetterPage"
      ).then((module) => ({
        default: module.InquiryLetterPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionManager, UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageCartable/UnionTreasurerJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Treasurer/Cartable/UnionTreasurerJobRequestListCartablePage"
      ).then((module) => ({
        default: module.UnionTreasurerJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionTreasurer],
  },
  {
    path: "/ManageCartable/CountyTreasurerJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Treasurer/Cartable/CountyTreasurerJobRequestListCartablePage"
      ).then((module) => ({
        default: module.CountyTreasurerJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyTreasurer],
  },
  {
    path: "/ManageCartable/MainLocationTreasurerJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Treasurer/Cartable/MainLocationTreasurerJobRequestListCartablePage"
      ).then((module) => ({
        default: module.MainLocationTreasurerJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationTreasurer],
  },
  {
    path: "/ManageCartable/ProvinceTreasurerJobRequestCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Treasurer/Cartable/ProvinceTreasurerJobRequestListCartablePage"
      ).then((module) => ({
        default: module.ProvinceTreasurerJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceTreasurer],
  },
  {
    path: "/Requests/job/province/:status/EditResume/:req_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Treasurer/Cartable/ProvinceTreasurerJobRequestListCartablePage"
      ).then((module) => ({
        default: module.ProvinceTreasurerJobRequestListCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  // manager check
  {
    path: "/ManageRequests/ManagerJobRequestslist/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/County"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageRequests/ManagerJobRequestslist/MainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/MainLocation"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageRequests/ManagerJobRequestslist/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/Province"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/ManageRequests/ManagerJobRequestslist/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/Union"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  // vice manager check
  {
    path: "/ManageRequests/ViceManagerJobRequestslist/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/County"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomViceManager],
  },
  {
    path: "/ManageRequests/ViceManagerJobRequestslist/MainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/MainLocation"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomViceManager],
  },
  {
    path: "/ManageRequests/ViceManagerJobRequestslist/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/Province"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/ManageRequests/ViceManagerJobRequestslist/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/Union"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionViceManager],
  },
  // executive manager check
  {
    path: "/ManageRequests/ExecutiveManagerJobRequestslist/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/County"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomExecutiveManager],
  },
  {
    path: "/ManageRequests/ExecutiveManagerJobRequestslist/MainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/MainLocation"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGUildRoomExecutiveManager],
  },
  {
    path: "/ManageRequests/ExecutiveManagerJobRequestslist/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/Province"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },
  {
    path: "/ManageRequests/ExecutiveManagerJobRequestslist/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/ManagerJobRequestsList/ManagerJobRequestsCheck/Union"
      ).then((module) => ({
        default: module.ManagerJobRequestsCheck,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionViceExecutiveManager],
  },
  {
    path: "/Settings/Notification",
    component: lazy(() =>
      import("../../screens/Settings/Notification/Notification").then(
        (module) => ({
          default: module.Notification,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/Finance/Roles",
    component: lazy(() =>
      import("../../screens/Settings/Finance/Roles/").then((module) => ({
        default: module.Roles,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Finance/PayableValue",
    component: lazy(() =>
      import("../../screens/Settings/Finance/PayableValue").then((module) => ({
        default: module.PayableValue,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },

  {
    path: "/Finance/FixedPayableValue/MainLocation",
    component: lazy(() =>
      import(
        "../../screens/Settings/Finance/FixedPayableValueMainLocation"
      ).then((module) => ({
        default: module.FixedPayableValueMainLocation,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },

  {
    path: "/Finance/FixedPayableValue/Province",
    component: lazy(() =>
      import("../../screens/Settings/Finance/FixedPayableValueProvince").then(
        (module) => ({
          default: module.FixedPayableValueProvince,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomAdmin],
  },
  {
    path: "/Finance/FixedPayableValue/County",
    component: lazy(() =>
      import("../../screens/Settings/Finance/FixedPayableValueCounty").then(
        (module) => ({
          default: module.FixedPayableValueCounty,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },

  {
    path: "/Finance/MaxPayableValue",
    component: lazy(() =>
      import("../../screens/Settings/Finance/MaxPayableValue").then(
        (module) => ({
          default: module.MaxPayableValue,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Finance/ExpertiseCosts",
    component: lazy(() =>
      import("../../screens/Settings/Finance/InspectionType").then(
        (module) => ({
          default: module.InspectionType,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Finance/JobCategoryTariff",
    component: lazy(() =>
      import("../../screens/Settings/Finance/JobCategoryTariff").then(
        (module) => ({
          default: module.JobCategoryTariff,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Finance/Tarrif",
    component: lazy(() =>
      import("../../screens/Settings/Finance/Tarrif").then((module) => ({
        default: module.Tarrif,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Tickets/MyTickets",
    component: lazy(() =>
      import("../../screens/Tickets/MyTickets").then((module) => ({
        default: module.MyTickets,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/Tickets/MyTickets/:id",
    component: lazy(() =>
      import("../../screens/Tickets/TicketDetails").then((module) => ({
        default: module.TicketDetails,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/InqueryLetters/Organization",
    component: lazy(() =>
      import("../../screens/InqueryLetters/Organization").then((module) => ({
        default: module.Organization,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/InqueryLetters/Organization/:id",
    component: lazy(() =>
      import("../../screens/InqueryLetters/Organization/Edit").then(
        (module) => ({
          default: module.Edit,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/InqueryLetters/Inquery",
    component: lazy(() =>
      import("../../screens/InqueryLetters/Inquery").then((module) => ({
        default: module.Inquery,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/InqueryLetters/Inquery/:id",
    component: lazy(() =>
      import("../../screens/InqueryLetters/Inquery/Edit").then((module) => ({
        default: module.Edit,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/ManageRequests/SelectRequestInquiries/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/SelectRequestInquiries/SelectCountyRequestInquiriesPage"
      ).then((module) => ({
        default: module.SelectCountyRequestInquiriesPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountySecretariat],
  },
  {
    path: "/ManageRequests/SelectRequestInquiries/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/SelectRequestInquiries/SelectProvinceRequestInquiriesPage"
      ).then((module) => ({
        default: module.SelectProvinceRequestInquiriesPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/ManageRequests/SelectRequestInquiries/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/SelectRequestInquiries/SelectUnionRequestInquiriesPage"
      ).then((module) => ({
        default: module.SelectUnionRequestInquiriesPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageRequests/SelectRequestInquiries/MainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/SelectRequestInquiries/SelectMainLocationRequestInquiriesPage"
      ).then((module) => ({
        default: module.SelectMainLocationRequestInquiriesPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/InqueryLetters/Inquery/Letter/:id",
    component: lazy(() =>
      import("../../screens/InqueryLetters/Inquery/Letter/Letter").then(
        (module) => ({
          default: module.Letter,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/ManageRequests/NoticeRequestInquiryLetters/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/NoticeLetters/ProvinceNoticeLettersPage"
      ).then((module) => ({
        default: module.ProvinceNoticeLettersPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/ManageRequests/NoticeRequestInquiryLetters/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/NoticeLetters/CountyNoticeLettersPage"
      ).then((module) => ({
        default: module.CountyNoticeLettersPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountySecretariat],
  },
  {
    path: "/ManageRequests/NoticeRequestInquiryLetters/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/NoticeLetters/UnionNoticeLettersPage"
      ).then((module) => ({
        default: module.UnionNoticeLettersPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageRequests/NoticeRequestInquiryLetters/MainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/NoticeLetters/MainLocationNoticeLettersPage"
      ).then((module) => ({
        default: module.MainLocationNoticeLettersPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/Position/SetProvincePosition",
    component: lazy(() =>
      import(
        "../../screens/Settings/PositionSetting/ProvincePositionSetting/ProvincePositionSetting"
      ).then((module) => ({
        default: module.ProvincePositionSetting,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/InqueryLetters/setDefault/Province",
    component: lazy(() =>
      import("../../screens/InqueryLetters/Inquery/SetDefault/Province").then(
        (module) => ({
          default: module.Province,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomAdmin],
  },
  {
    path: "/InqueryLetters/setDefault/County",
    component: lazy(() =>
      import("../../screens/InqueryLetters/Inquery/SetDefault/County").then(
        (module) => ({
          default: module.County,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/InqueryLetters/setDefault/Union",
    component: lazy(() =>
      import(
        "../../screens/InqueryLetters/Inquery/SetDefault/Union/Union"
      ).then((module) => ({
        default: module.Union,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionAdmin],
  },
  {
    path: "/InqueryLetters/setDefault/MainLocation",
    component: lazy(() =>
      import(
        "../../screens/InqueryLetters/Inquery/SetDefault/MainLocation"
      ).then((module) => ({
        default: module.MainLocation,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/SetLicenseRequestTariff/",
    component: lazy(() =>
      import("../../screens/Settings/SetLicenseRequestTariff").then(
        (module) => ({
          default: module.SetLicenseRequestTariff,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/SetTariff/MainLocation",
    component: lazy(() =>
      import("../../screens/Settings/SetTariff/SetMainLocationTariffPage").then(
        (module) => ({
          default: module.SetMainLocationTariffPage,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/SetTariff/Province",
    component: lazy(() =>
      import("../../screens/Settings/SetTariff/SetProvinceTariffPage").then(
        (module) => ({
          default: module.SetProvinceTariffPage,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/SetTariff/County",
    component: lazy(() =>
      import("../../screens/Settings/SetTariff/SetCountyTariffPage").then(
        (module) => ({
          default: module.SetCountyTariffPage,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/SetTariff/Union",
    component: lazy(() =>
      import(
        "../../screens/Settings/SetTariff/SetUnionTariffPage/SetUnionTariffPage"
      ).then((module) => ({
        default: module.SetUnionTariffPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/UploadProvinceInquiry/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFile/ProvinceUploadInquiryFilePage"
      ).then((module) => ({
        default: module.ProvinceUploadInquiryFilePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/UploadCountyInquiry/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFile/CountyUploadInquiryFilePage"
      ).then((module) => ({
        default: module.CountyUploadInquiryFilePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountySecretariat],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/UploadUnionInquiry/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFile/UnionUploadInquiryFilePage"
      ).then((module) => ({
        default: module.UnionUploadInquiryFilePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/UploadMainLocationInquiry/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFile/MainLocationUploadInquiryFilePage"
      ).then((module) => ({
        default: module.MainLocationUploadInquiryFilePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/Position/SetMainLocationPosition",
    component: lazy(() =>
      import(
        "../../screens/Settings/PositionSetting/MainLocationPositionSettingPage"
      ).then((module) => ({
        default: module.MainLocationPositionSettingPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/Settings/Cancelation/CancelationReason",
    component: lazy(() =>
      import("../../screens/Settings/CancelationReason/CancelationReason").then(
        (module) => ({
          default: module.CancelationReason,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/Position/SetCountyPosition",
    component: lazy(() =>
      import(
        "../../screens/Settings/PositionSetting/CountyPositionSettingPage"
      ).then((module) => ({
        default: module.CountyPositionSettingPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomAdmin],
  },
  {
    path: "/Position/SetUnionPosition",
    component: lazy(() =>
      import(
        "../../screens/Settings/PositionSetting/UnionPositionSettingPage"
      ).then((module) => ({
        default: module.UnionPositionSettingPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/Signature/New",
    component: lazy(() =>
      import("../../screens/Signature/NewSignature/NewSignature").then(
        (module) => ({
          default: module.NewSignature,
        })
      )
    ),
    exact: true,
    roles: [
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.CountyGuildRoomManager,
      UserRoles.UnionManager,
      UserRoles.MainLocationGuildRoomViceManager,
      UserRoles.MainLocationGUildRoomExecutiveManager,
      UserRoles.ProvinceGuildRoomViceManager,
      UserRoles.ProvinceGuildRoomExecutiveManager,
      UserRoles.CountyGuildRoomViceManager,
      UserRoles.CountyGuildRoomExecutiveManager,
      UserRoles.UnionViceManager,
      UserRoles.UnionViceExecutiveManager,
    ],
  },
  {
    path: "/Requests/:status/ProvinceConfirmPayment/:req_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Applicant/ConfitmPayment/ProvinceConfirmPaymentPage"
      ).then((module) => ({
        default: module.ProvinceConfirmPaymentPage,
      }))
    ),
    exact: true,
    status: 15,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/Requests/:status/CountyConfirmPayment/:req_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Applicant/ConfitmPayment/CountyConfirmPaymentPage"
      ).then((module) => ({
        default: module.CountyConfirmPaymentPage,
      }))
    ),
    exact: true,
    status: 15,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/Requests/:status/UnionConfirmPayment/:req_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Applicant/ConfitmPayment/UnionConfirmPaymentPage"
      ).then((module) => ({
        default: module.UnionConfirmPaymentPage,
      }))
    ),
    exact: true,
    status: 15,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/Requests/:status/MainLocationConfirmPayment/:req_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Applicant/ConfitmPayment/MainLocationConfirmPaymentPage"
      ).then((module) => ({
        default: module.MainLocationConfirmPaymentPage,
      }))
    ),
    exact: true,
    status: 15,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/Settings/ActiveUpManager",
    component: lazy(() =>
      import("../../screens/Settings/ActiveUpLevelManagerPage").then(
        (module) => ({
          default: module.ActiveUpLevelManagerPage,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/ManageRequest/NoticeForPresence/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/NoticeForPresence/ProvinceNoticeForPresencePage"
      ).then((module) => ({
        default: module.ProvinceNoticeForPresencePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/ManageRequest/NoticeForPresence/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/NoticeForPresence/CountyNoticeForPresencePage"
      ).then((module) => ({
        default: module.CountyNoticeForPresencePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountySecretariat],
  },
  {
    path: "/ManageRequest/NoticeForPresence/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/NoticeForPresence/UnionNoticeForPresencePage"
      ).then((module) => ({
        default: module.UnionNoticeForPresencePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageRequest/NoticeForPresence/MainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/NoticeForPresence/MainLocationNoticeForPresencePage"
      ).then((module) => ({
        default: module.MainLocationNoticeForPresencePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/ManageRequests/ContractDraft/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/ContractDraft/CountyContractScreen"
      ).then((module) => ({
        default: module.CountyContractScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountySecretariat],
  },
  {
    path: "/ManageRequests/ContractDraft/MainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/ContractDraft/MainLocationContractScreen"
      ).then((module) => ({
        default: module.MainLocationContractScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/ManageRequests/ContractDraft/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/ContractDraft/ProvinceContractScreen"
      ).then((module) => ({
        default: module.ProvinceContractScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/ManageRequests/ContractDraft/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/ContractDraft/UnionContractScreen"
      ).then((module) => ({
        default: module.UnionContractScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageRequests/SetSecretariatNumber/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/SetSecretariatNumber/SetCountySecretariatNumberPage"
      ).then((module) => ({
        default: module.SetCountySecretariatNumberPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountySecretariat],
  },
  {
    path: "/ManageRequests/SetSecretariatNumber/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/SetSecretariatNumber/SetProvinceSecretariatNumberPage"
      ).then((module) => ({
        default: module.SetProvinceSecretariatNumberPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/ManageRequests/SetSecretariatNumber/MainLocation/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/SetSecretariatNumber/SetMainLocationSecretariatNumberPage"
      ).then((module) => ({
        default: module.SetMainLocationSecretariatNumberPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/ManageRequests/SetSecretariatNumber/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/SetSecretariatNumber/SetUnionSecretariatNumberPage"
      ).then((module) => ({
        default: module.SetUnionSecretariatNumberPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/Settings/SetContractPosition",
    component: lazy(() =>
      import("../../screens/Settings/SetContractPositionPage").then(
        (module) => ({
          default: module.SetContractPositionPage,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/Settings/CostManagement",
    component: lazy(() =>
      import("../../screens/Settings/CostManagement").then((module) => ({
        default: module.CostManagement,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/ManageCartable/ProvinceManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/Cartable/ProvinceManagerCartablePage"
      ).then((module) => ({
        default: module.ProvinceManagerCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/ManageCartable/ProvinceViceManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ViceManager/Cartable/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/ManageCartable/ProvinceExecutiveManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ExecutiveManager/Cartable/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },
  {
    path: "/ManageCartable/CountyManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/Cartable/CountyManagerCartablePage"
      ).then((module) => ({
        default: module.CountyManagerCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomManager],
  },
  {
    path: "/ManageCartable/CountyViceManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ViceManager/Cartable/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomViceManager],
  },
  {
    path: "/ManageCartable/CountyExecutiveManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ExecutiveManager/Cartable/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomExecutiveManager],
  },
  {
    path: "/ManageCartable/UnionManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/Cartable/UnionManagerCartablePage"
      ).then((module) => ({
        default: module.UnionManagerCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionManager],
  },
  {
    path: "/ManageCartable/UnionViceManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ViceManager/Cartable/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionViceManager],
  },
  {
    path: "/ManageCartable/UnionExecutiveManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ExecutiveManager/Cartable/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionViceExecutiveManager],
  },
  {
    path: "/ManageCartable/MainLocationManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Manager/Cartable/MainLocationManagerCartablePage"
      ).then((module) => ({
        default: module.MainLocationManagerCartablePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/ManageCartable/MainLocationViceManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ViceManager/Cartable/MainLocation"
      ).then((module) => ({
        default: module.MainLocationScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomViceManager],
  },
  {
    path: "/ManageCartable/MainLocationExecutiveManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/ExecutiveManager/Cartable/MainLocation"
      ).then((module) => ({
        default: module.MainLocationScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGUildRoomExecutiveManager],
  },
  {
    path: "/ManageRequests/UpManagerJobRequests/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/UpManagerDetailsPage/UpManagerProvinceDetails/Province"
      ).then((module) => ({
        default: module.UpManagerProvinceDetails,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/ManageRequests/UpManagerJobRequests/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/UpManagerDetailsPage/UpManagerCountyDetails/UpManagerCountyDetails"
      ).then((module) => ({
        default: module.UpManagerCountyDetails,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/ManageRequests/UpManagerJobRequests/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/UpManager/Cartable/UpManagerDetailsPage/UpManagerUnionDetails/UpManagerUnionDetails"
      ).then((module) => ({
        default: module.UpManagerUnionDetails,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomManager],
  },
  {
    path: "/ManageRequests/ApplicantRequest/:id/letter/:letter_id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Applicant/LetterPageForApplicantPage"
      ).then((module) => ({
        default: module.LetterPageForApplicantPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserLegal, UserRoles.UserReal],
  },

  {
    path: "/ManageRequests/SecretariatJobRequestslist/EditProvinceInquiry/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFile/EditInquiryFile/ProvinceEditInquiryFilePage"
      ).then((module) => ({
        default: module.ProvinceEditInquiryFilePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/EditCountyInquiry/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFile/EditInquiryFile/CountyEditInquiryFilePage"
      ).then((module) => ({
        default: module.CountyEditInquiryFilePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountySecretariat],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/EditUnionInquiry/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFile/EditInquiryFile/UnionEditInquiryFilePage"
      ).then((module) => ({
        default: module.UnionEditInquiryFilePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionSecretariat],
  },
  {
    path: "/ManageRequests/SecretariatJobRequestslist/EditMainLocationInquiry/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/Job/Manage/Secretariat/Cartable/UploadInquiryFile/EditInquiryFile/MainLocationEditInquiryFilePage"
      ).then((module) => ({
        default: module.MainLocationEditInquiryFilePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },

  {
    path: "/GuildsActivation/County/:status",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Applicant/County/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.UserReal],
  },
  {
    path: "/UnionsActivation/Union/:status",
    component: lazy(() =>
      import("../../screens/Requests/GuildsActivation/Applicant/Union").then(
        (module) => ({
          default: module.UnionScreen,
        })
      )
    ),
    exact: false,
    roles: [UserRoles.UserReal],
  },
  {
    path: "/GuildsActivation/Province/:status",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Applicant/Province/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.UserReal],
  },
  {
    path: "/GuildsDetails/MainLocation/",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Applicant/MainLocation/MainLocationScreen"
      ).then((module) => ({
        default: module.MainLocationScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin, UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/GuildsDetails/Province/:id",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/GuildsDetails/ProvinceScreen"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: false,
    roles: [
      UserRoles.Admin,
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.ProvinceGuildRoomAdmin,
    ],
  },
  {
    path: "/GuildsDetails/County/:id",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/GuildsDetails/CountyScreen"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: false,
    roles: [
      UserRoles.Admin,
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.CountyGuildRoomAdmin,
      UserRoles.CountyGuildRoomManager,
    ],
  },
  {
    path: "/UnionsDetails/Union/:id",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/GuildsDetails/UnionScreen/UnionScreen"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: false,
    roles: [
      UserRoles.Admin,
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.CountyGuildRoomAdmin,
      UserRoles.CountyGuildRoomManager,
      UserRoles.UnionAdmin,
      UserRoles.UnionManager,
    ],
  },

  {
    path: "/GuildsActivation/Union/:status",
    component: lazy(() =>
      import("../../screens/Requests/GuildsActivation/Applicant/Union").then(
        (module) => ({
          default: module.UnionScreen,
        })
      )
    ),
    exact: false,
    roles: [UserRoles.UserReal],
  },
  {
    path: "/GuildsActivation/SetAdmin/MainLocation/MainLocationAdmin",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/GuildsActivation/SetAdmin/MainLocationAdmin/MainLocation/MainLocationAdmin"
      ).then((module) => ({
        default: module.MainLocationAdminScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/GuildsActivation/SetAdmin/Province/MainLocationAdmin",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/GuildsActivation/SetAdmin/MainLocationAdmin/Province/ProvinceAdmin"
      ).then((module) => ({
        default: module.ProvinceAdminScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/GuildsActivation/SetAdmin/Province/ProvinceAdmin",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/GuildsActivation/SetAdmin/ProvinceAdmin/Province"
      ).then((module) => ({
        default: module.ProvinceAdminScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomAdmin],
  },
  {
    path: "/GuildsRequests/Province/Add",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Applicant/Province/AddGuild"
      ).then((module) => ({
        default: module.AddGuildScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.ProvinceGuildRoomAdmin],
  },
  {
    path: "/GuildsRequests/County/Add",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Applicant/County/AddGuild"
      ).then((module) => ({
        default: module.AddGuildScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/GuildsRequests/Province/List",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Applicant/Province/List"
      ).then((module) => ({
        default: module.GuildListScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.ProvinceGuildRoomAdmin],
  },
  {
    path: "/GuildsRequests/County/List",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Applicant/County/List"
      ).then((module) => ({
        default: module.GuildListScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/GuildsActivation/ProvinceSecretariatGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Secretariat/GuildsActivationList/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/GuildsActivation/CountySecretariatGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Secretariat/GuildsActivationList/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/GuildsActivation/CountySecretariatCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Secretariat/Cartable/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/MapTest/:id",
    component: lazy(() =>
      import("../../screens/MapTest/MapTest2").then((module) => ({
        default: module.MapTest2,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal],
  },
  {
    path: "/Licenses/ShowOldLicenseExcel",
    component: lazy(() =>
      import("../../screens/OldLicenseExcel").then((module) => ({
        default: module.OldLicenseExcel,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomAdmin, UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/Land/SetCountyPolygon/",
    component: lazy(() =>
      import("../../screens/Settings/SetCountyPolygonPage").then((module) => ({
        default: module.SetCountyPolygonPage,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin],
  },
  {
    path: "/IssueingResponsible/Inspection/",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/IssuingResponsible/Matching/InspectionDetailsPage"
      ).then((module) => ({
        default: module.InspectionDetailsPage,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/JahadCenterManager/Inspection/",
    component: lazy(() =>
      import(
        "../../screens/Requests/License/Issued/Management/Jahad/InspectionDetailsPage"
      ).then((module) => ({
        default: module.InspectionDetailsPage,
      }))
    ),
    exact: false,
    roles: [UserRoles.JahadCenterManager],
  },
  // {
  //   path: "license/utm/point/print/:id",
  //   component: lazy(() =>
  //     import("../../screens/Requests/License/PrintLicense/Point/Point").then(
  //       (module) => ({
  //         default: module.Point,
  //       })
  //     )
  //   ),
  //   exact: false,
  //   roles: [UserRoles.UserReal, UserRoles.UserLegal],
  // },
  // {
  //   path: "/license/utm/install/print/:id",
  //   component: lazy(() =>
  //     import("../../screens/Requests/License/PrintLicense/Install").then(
  //       (module) => ({
  //         default: module.Install,
  //       })
  //     )
  //   ),
  //   exact: false,
  //   roles: [UserRoles.UserReal, UserRoles.UserLegal],
  // },
  // {
  //   path: "/license/utm/land/print/:id",
  //   component: lazy(() =>
  //     import("../../screens/Requests/License/PrintLicense/Land/Land").then(
  //       (module) => ({
  //         default: module.Land,
  //       })
  //     )
  //   ),
  //   exact: false,
  //   roles: [UserRoles.UserReal, UserRoles.UserLegal],
  // },
  {
    path: "/ChangePersonalInfo/New",
    component: lazy(() =>
      import(
        "../../screens/Requests/ChangePersonalInfo/Applicant/NewRequest/New/New"
      ).then((module) => ({
        default: module.New,
      }))
    ),
    exact: false,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/ChangePersonalInfo/List",
    component: lazy(() =>
      import(
        "../../screens/Requests/ChangePersonalInfo/Applicant/NewRequest/List/List"
      ).then((module) => ({
        default: module.List,
      }))
    ),
    exact: false,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/ChangeUserInfoManagement/IssuingResponsible/list",
    component: lazy(() =>
      import(
        "../../screens/Requests/ChangePersonalInfo/IssuingResposible/List/List"
      ).then((module) => ({
        default: module.List,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ChangeUserInfoManagement/UnionManager/list",
    component: lazy(() =>
      import(
        "../../screens/Requests/ChangePersonalInfo/UnionManager/List/List"
      ).then((module) => ({
        default: module.List,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionManager],
  },
  {
    path: "/ChangeUserInfoManagement/UnionManager/Details/:id/:userType/",
    component: lazy(() =>
      import(
        "../../screens/Requests/ChangePersonalInfo/UnionManager/Details/Details"
      ).then((module) => ({
        default: module.Details,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionManager],
  },

  {
    path: "/ChangePersonalInfo/Request/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/ChangePersonalInfo/Applicant/RequestDetails"
      ).then((module) => ({
        default: module.RequestDetails,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/ChangePersonalInfo/Request/Pay/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/ChangePersonalInfo/Applicant/Pay/Pay"
      ).then((module) => ({
        default: module.Pay,
      }))
    ),
    exact: true,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/ChangeUserInfoManagement/IssuingResponsible/Details/:id/:userType/",
    component: lazy(() =>
      import(
        "../../screens/Requests/ChangePersonalInfo/IssuingResposible/Details"
      ).then((module) => ({
        default: module.Details,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionIssuingResponsible],
  },
  {
    path: "/ChangeUserInfoManagement/UnionManager/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/ChangePersonalInfo/UnionManager/Details/Details"
      ).then((module) => ({
        default: module.Details,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionManager],
  },
  {
    path: "/Settings/ChangePassword",
    component: lazy(() =>
      import("../../screens/Settings/ChangePasssword/").then((module) => ({
        default: module.ChangePasssword,
      }))
    ),
    exact: false,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/BasicInformation/Trees/Categories",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminTrees/TreesCategory/TreesCategory"
      ).then((module) => ({
        default: module.TreesCategory,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin],
  },
  {
    path: "/BasicInformation/Trees/ManageTrees",
    component: lazy(() =>
      import(
        "../../screens/BasicInformation/AdminBasicInformation/AdminTrees/ManageTrees/ManageTrees"
      ).then((module) => ({
        default: module.ManageTrees,
      }))
    ),
    exact: false,
    roles: [UserRoles.Admin],
  },
  {
    path: "/RequiredDocuments/Issuing",
    component: lazy(() =>
      import(
        "../../screens/PersonalInformation/RequiredDocumets/Issuing/Issuing"
      ).then((module) => ({
        default: module.Issuing,
      }))
    ),
    exact: false,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
  {
    path: "/RequiredDocuments/Cancellation",
    component: lazy(() =>
      import(
        "../../screens/PersonalInformation/RequiredDocumets/Cancellation/Cancellation"
      ).then((module) => ({
        default: module.Cancellation,
      }))
    ),
    exact: false,
    roles: [UserRoles.UserReal, UserRoles.UserLegal],
  },
];
