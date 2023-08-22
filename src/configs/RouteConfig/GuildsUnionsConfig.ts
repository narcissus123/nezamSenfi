import { lazy } from "react";
import { IAuthenticatedRoute } from ".";
import { UserRoles } from "../../core/enums";

export const GuildsUnionsConfig: Array<IAuthenticatedRoute> = [
  {
    path: "/Unions/SubsetOfJobs",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Unions/SubsetOfJobs/SubsetOfJobs"
      ).then((module) => ({
        default: module.SubsetOfJobs,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Unions/LocationInfo",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Unions/LocationInfo/LocationInfo"
      ).then((module) => ({
        default: module.LocationInfo,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Unions/RegisteryDocs",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Unions/RegisteryDocs/RegisteryDocs"
      ).then((module) => ({
        default: module.RegisteryDocs,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },

  {
    path: "/Guilds/province/:id",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/EditProvincePage/EditProvincePage"
      ).then((module) => ({
        default: module.EditProvincePage,
      }))
    ),
    exact: true,
    roles: [
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.Admin,
    ],
  },
  {
    path: "/Guilds/province/admin/:id",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/EditProvincePage/AdminScreen/EditProvincePageAdmin"
      ).then((module) => ({
        default: module.EditProvincePage,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomAdmin],
  },
  {
    path: "/Guilds/GuildProvinceUsers",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/ProvinceUsers/ProvinceUsers"
      ).then((module) => ({
        default: module.ProvinceUsers,
      }))
    ),
    exact: true,
    roles: [
      UserRoles.Admin,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.ProvinceGuildRoomAdmin,
    ],
  },
  {
    path: "/Guilds/CountyUsers",
    component: lazy(() =>
      import("../../screens/Guilds&Unions/Guilds/CountyUsers/CountyUsers").then(
        (module) => ({
          default: module.CountyUsers,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomManager, UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/Unions/UnionUsers",
    component: lazy(() =>
      import("../../screens/Guilds&Unions/Unions/UnionUsers/UnionUsers").then(
        (module) => ({
          default: module.UnionsUser,
        })
      )
    ),
    exact: true,
    roles: [UserRoles.UnionManager, UserRoles.UnionAdmin],
  },
  {
    path: "/Guilds/CountyEdit/:id",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/EditCountyPage/EditCountyPage"
      ).then((module) => ({
        default: module.EditCountyPage,
      }))
    ),
    exact: true,
    roles: [
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.CountyGuildRoomAdmin,
      UserRoles.Admin,
    ],
  },
  {
    path: "/Guilds/MainLocationUsers/",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/EditMainLocationPage/EditMainLocationPage"
      ).then((module) => ({
        default: module.EditMainLocationPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Guilds/CountyEdit/admin/:id",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/EditCountyPage/AdminScreen/EditCountyPageAdmin"
      ).then((module) => ({
        default: module.EditCountyPageAdmin,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/Guilds/CountyList/",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/AdminCountyList/AdminCountyList"
      ).then((module) => ({
        default: module.AdminCountyList,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/Guilds/ConfirmCounties",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Guilds/ConfirmCountyPage/ConfirmCountyPage"
      ).then((module) => ({
        default: module.ConfirmCountyPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/Unions/UnionEdit/:id",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Unions/EditUnionPage/EditUnionPage"
      ).then((module) => ({
        default: module.EditUnionPage,
      }))
    ),
    exact: true,
    roles: [
      UserRoles.CountyGuildRoomManager,
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.UnionManager,
      UserRoles.Admin,
    ],
  },
  {
    path: "/Unions/UnionEdit/admin/:id",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Unions/EditUnionPage/AdminScreen/EditUnionPageAdmin"
      ).then((module) => ({
        default: module.EditUnionPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionManager, UserRoles.UnionAdmin],
  },
  {
    path: "/Unions/UnionEdit/admin/:id/ExpertReports/:expertId",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Unions/EditUnionPage/AdminScreen/ExpertReportListPage"
      ).then((module) => ({
        default: module.ExpertReportListPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.UnionAdmin],
  },
  {
    path: "/Guilds",
    component: lazy(() =>
      import("../../screens/Guilds&Unions/Guilds/Guilds").then((module) => ({
        default: module.Guilds,
      }))
    ),
    exact: false,
    roles: [
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.Admin,
    ],
  },
  {
    path: "/Unions",
    component: lazy(() =>
      import("../../screens/Guilds&Unions/Unions/Unions").then((module) => ({
        default: module.Unions,
      }))
    ),
    exact: true,
    roles: [
      UserRoles.CountyGuildRoomManager,
      UserRoles.MainLocationGuildRoomManager,
    ],
  },
  {
    path: "/Unions/UnionList/",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Unions/AdminUnionList/AdminUnionList"
      ).then((module) => ({
        default: module.AdminUnionList,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/Unions/AddNewUnions",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Unions/AddUnionPage/AddUnionPage"
      ).then((module) => ({
        default: module.AddUnionPage,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin, UserRoles.UserLegal, UserRoles.UserReal],
  },
  {
    path: "/Unions/ConfirmUnion",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/Unions/ConfirmUnionPage/ConfirmUnionPage"
      ).then((module) => ({
        default: module.ConfirmUnionPage,
      }))
    ),
    exact: true,
    roles: [
      UserRoles.Admin,
      UserRoles.UserLegal,
      UserRoles.UserReal,
      UserRoles.MainLocationGuildRoomManager,
    ],
  },
  {
    path: "/GuildsActivation/SetAdmin/County/MainLocationAdmin",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/GuildsActivation/SetAdmin/MainLocationAdmin/County/CountyAdmin"
      ).then((module) => ({
        default: module.CountyAdminScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.Admin],
  },
  {
    path: "/GuildsActivation/SetAdmin/County/ProvinceAdmin",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/GuildsActivation/SetAdmin/ProvinceAdmin/County/CountyAdmin"
      ).then((module) => ({
        default: module.CountyAdminScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomAdmin],
  },
  {
    path: "/GuildsActivation/SetAdmin/County/CountyAdmin",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/GuildsActivation/SetAdmin/CountyAdmin/County"
      ).then((module) => ({
        default: module.County,
      }))
    ),
    exact: true,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/GuildsActivation/SetAdmin/Union/ProvinceAdmin",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/GuildsActivation/SetAdmin/ProvinceAdmin/Union/UnionAdmin"
      ).then((module) => ({
        default: module.UnionAdmin,
      }))
    ),
    exact: false,
    roles: [UserRoles.ProvinceGuildRoomAdmin],
  },
  {
    path: "/GuildsActivation/SetAdmin/Union/CountyAdmin",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/GuildsActivation/SetAdmin/CountyAdmin/Union"
      ).then((module) => ({
        default: module.Union,
      }))
    ),
    exact: false,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/GuildsActivation/SetAdmin/Union/UnionAdmin",
    component: lazy(() =>
      import(
        "../../screens/Guilds&Unions/GuildsActivation/SetAdmin/UnionAdmin/"
      ).then((module) => ({
        default: module.UnionAdminScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.UnionAdmin],
  },
  {
    path: "/GuildsActivation/CountySecretariat/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/CheckDetails/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/UnionsActivation/UnionSecretariat/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/CheckDetails/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/GuildsActivation/ProvinceSecretariat/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/CheckDetails/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/GuildsActivation/ProvinceSecretariat/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/CheckConfirm/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },
  {
    path: "/GuildsActivation/CountySecretariat/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/CheckConfirm/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/UnionsActivation/UnionSecretariat/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/CheckConfirm/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/GuildsActivation/ProvinceSecretariatCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Secretariat/Cartable/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationSecretariat],
  },

  {
    path: "/GuildsActivation/ProvinceManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Manager/Cartable/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/GuildsActivation/ProvinceViceManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ViceManager/Cartable/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomViceManager],
  },
  {
    path: "/GuildsActivation/ProvinceExecutiveManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ExecutiveManager/Cartable/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGUildRoomExecutiveManager],
  },
  {
    path: "/GuildsActivation/ProvinceManagerGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Manager/GuildsActivationList/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/GuildsActivation/ProvinceViceManagerGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ViceManager/ViceManagerList/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomViceManager],
  },
  {
    path: "/GuildsActivation/ProvinceExecutiveManagerGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ExecutiveManager/ExecutiveManagerList/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGUildRoomExecutiveManager],
  },
  {
    path: "/GuildsActivation/CountyManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Manager/Cartable/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/GuildsActivation/CountyViceManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ViceManager/Cartable/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/GuildsActivation/CountyExecutiveManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ExecutiveManager/Cartable/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },
  {
    path: "/GuildsActivation/CountyManagerGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Manager/GuildsActivationList/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/GuildsActivation/CountyViceManagerGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ViceManager/ViceManagerList/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/GuildsActivation/CountyExecutiveManagerGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ExecutiveManager/ExecutiveManagerList/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },

  {
    path: "/GuildsActivation/CountyManager/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckDetails/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/GuildsActivation/CountyViceManager/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckDetails/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/GuildsActivation/CountyExecutiveManager/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckDetails/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },
  {
    path: "/UnionsActivation/UnionManager/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckDetails/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/UnionsActivation/UnionViceManager/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckDetails/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/UnionsActivation/UnionExecutiveManager/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckDetails/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },
  {
    path: "/GuildsActivation/ProvinceManager/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckDetails/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/GuildsActivation/ProvinceViceManager/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckDetails/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomViceManager],
  },
  {
    path: "/GuildsActivation/ProvinceExecutiveManager/Details/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckDetails/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGUildRoomExecutiveManager],
  },
  {
    path: "/GuildsActivation/ProvinceViceManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckConfirm/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomViceManager],
  },
  {
    path: "/GuildsActivation/ProvinceExecutiveManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckConfirm/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGUildRoomExecutiveManager],
  },
  {
    path: "/GuildsActivation/ProvinceManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckConfirm/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.MainLocationGuildRoomManager],
  },
  {
    path: "/GuildsActivation/CountyManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckConfirm/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/GuildsActivation/CountyViceManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckConfirm/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/GuildsActivation/CountyExecutiveManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckConfirm/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },
  {
    path: "/UnionsActivation/UnionManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckConfirm/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/UnionsActivation/UnionViceManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckConfirm/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/UnionsActivation/UnionExecutiveManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/CheckGuildsActivation/Manager/CheckConfirm/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },
  {
    path: "/GuildsActivation/CountyItManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ItManagerCartable/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ITManger],
  },
  {
    path: "/GuildsActivation/CountyItManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ItManagerCartable/CheckGuildsActivation/County"
      ).then((module) => ({
        default: module.CountyScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ITManger],
  },
  {
    path: "/GuildsActivation/ProvinceItManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ItManagerCartable/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ITManger],
  },
  {
    path: "/GuildsActivation/ProvinceItManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ItManagerCartable/CheckGuildsActivation/Province"
      ).then((module) => ({
        default: module.ProvinceScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ITManger],
  },
  {
    path: "/UnionsRequests/Union/Add",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Applicant/Union/AddGuild"
      ).then((module) => ({
        default: module.AddGuildScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },
  {
    path: "/UnionsRequests/Union/List",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Applicant/Union/List"
      ).then((module) => ({
        default: module.GuildListScreen,
      }))
    ),
    exact: false,
    roles: [UserRoles.CountyGuildRoomAdmin],
  },

  {
    path: "/UnionsActivation/UnionSecretariatCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Secretariat/Cartable/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },
  {
    path: "/UnionsActivation/UnionSecretariatActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Secretariat/GuildsActivationList/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceSecretariat],
  },

  {
    path: "/UnionsActivation/UnionManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Manager/Cartable/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/UnionsActivation/UnionViceManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ViceManager/Cartable/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/UnionsActivation/UnionExecutiveManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ExecutiveManager/Cartable/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },
  {
    path: "/UnionsActivation/UnionManagerGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/Manager/GuildsActivationList/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomManager],
  },
  {
    path: "/UnionsActivation/UnionViceManagerGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ViceManager/ViceManagerList/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomViceManager],
  },
  {
    path: "/UnionsActivation/UnionExecutiveManagerGuildActivation",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ExecutiveManager/ExecutiveManagerList/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ProvinceGuildRoomExecutiveManager],
  },
  {
    path: "/UnionsActivation/UnionItManagerCartable",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ItManagerCartable/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ITManger],
  },
  {
    path: "/UnionsActivation/UnionItManager/Confirm/:id",
    component: lazy(() =>
      import(
        "../../screens/Requests/GuildsActivation/Manage/ItManagerCartable/CheckGuildsActivation/Union"
      ).then((module) => ({
        default: module.UnionScreen,
      }))
    ),
    exact: true,
    roles: [UserRoles.ITManger],
  },
];
