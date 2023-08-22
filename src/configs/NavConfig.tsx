import React from "react";
import {
  Circle,
  Gift,
  GitPullRequest,
  Home,
  Info,
  Layers,
  MessageSquare,
  Package,
  Settings,
  Users,
} from "react-feather";
import { UserRoles } from "../core/enums";

interface ISidebarItem {
  id?: any;
  title?: string;
  icon?: React.ReactNode;
  permissions?: Array<string>;
  path?: string;
  newTab?: boolean;
  children?: any;
}

interface ISidebarItemWithChilde extends ISidebarItem {
  children?: Array<ISidebarItem>;
}
export const NavigationConfig: Array<ISidebarItemWithChilde> = [
  {
    id: "home",
    title: "پیشخوان",
    path: "/",
    icon: <Home className="sidebar-icon" size={20} />,
  },
  {
    id: "PersonalInfo",
    path: "/PersonalInfo",
    title: "اطلاعات فردی",
    icon: <Info className="sidebar-icon" size={20} />,
    permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
    children: [
      {
        title: "اطلاعات هویتی",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal],
        path: "/PersonalInfo/IdentityInfo",
      },
      {
        title: "اطلاعات تماس",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal],
        path: "/PersonalInfo/ContactInfo",
      },
      {
        title: "اطلاعات شغلی",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal],
        path: "/PersonalInfo/JobInfo",
      },
      {
        title: "اطلاعات هویتی",
        icon: <Circle size={12} />,
        permissions: [UserRoles.UserLegal],
        path: "/PersonalInfo/LegalIdentityInfo",
      },
      {
        title: "اطلاعات تماس",
        icon: <Circle size={12} />,
        permissions: [UserRoles.UserLegal],
        path: "/PersonalInfo/LegalContactInfo",
      },
      {
        title: "اطلاعات شغلی",
        icon: <Circle size={12} />,
        permissions: [UserRoles.UserLegal],
        path: "/PersonalInfo/LegalJobInfo",
      },
      {
        title: "اطلاعات ماشین الات ",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
        path: "/PersonalInfo/Machinery",
      },
      {
        title: "اطلاعات ادوات و خدمات",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
        path: "/PersonalInfo/ServicesInfo",
      },
    ],
  },
  {
    id: "Documents",
    title: "بارگذاری اسناد",
    icon: <Circle size={20} />,
    permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
    children: [
      {
        id: "UploadDocuments",
        title: "بارگذاری اسناد",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
        path: "/PersonalInfo/PersonalDocuments",
      },
      {
        id: "RequiredDocuments",
        title: "اسناد مورد نیاز",
        icon: <Home className="sidebar-icon" size={20} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
        children: [
          {
            title: "صدور",
            icon: <Home className="sidebar-icon" size={20} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
            path: "/RequiredDocuments/Issuing",
          },
          {
            title: "تمدید",
            icon: <Home className="sidebar-icon" size={20} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
          },
          {
            title: "ابطال",
            icon: <Home className="sidebar-icon" size={20} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
            path: "/RequiredDocuments/Cancellation",
          },
          {
            title: "تغییرات",
            icon: <Home className="sidebar-icon" size={20} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
          },
        ],
      },
    ],
  },
  {
    id: "requestManagement",
    path: "/Requests",
    title: "درخواست اشتغال به کار ",
    icon: <GitPullRequest className="sidebar-icon" size={20} />,
    permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
    children: [
      {
        title: "درخواست شغل کشوری",
        icon: <Circle className="sidebar-icon" size={12} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
        id: "MainLocationJobRequest",
        path: "/Requests/MainLocationJobRequest",
        children: [
          {
            title: "درخواست جدید",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
            path: "/Requests/MainLocationJobRequest/Add",
          },
          {
            title: "لیست درخواست ها",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
            path: "/Requests/MainLocationJobRequest/List",
          },
        ],
      },
      {
        title: "درخواست شغل استانی",
        icon: <Circle className="sidebar-icon" size={12} />,
        id: "ProvinceJobRequest",
        permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
        path: "/Requests/ProvinceJobRequest",
        children: [
          {
            title: "درخواست جدید",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
            path: "/Requests/ProvinceJobRequest/Add",
          },
          {
            title: "لیست درخواست ها",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
            path: "/Requests/ProvinceJobRequest/List",
          },
        ],
      },
      {
        title: "درخواست شغل شهرستانی",
        id: "CountyJobRequest",
        icon: <Circle className="sidebar-icon" size={12} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
        path: "/Requests/CountyJobRequest",
        children: [
          {
            title: "درخواست جدید",
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
            path: "/Requests/CountyJobRequest/Add",
          },
          {
            title: "لیست درخواست ها",
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
            path: "/Requests/CountyJobRequest/List",
          },
        ],
      },
      {
        title: "درخواست شغل اتحادیه",
        icon: <Circle className="sidebar-icon" size={12} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
        id: "UnionJobRequest",
        path: "/Requests/UnionJobRequest",
        children: [
          {
            title: "درخواست جدید",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
            path: "/Requests/UnionJobRequest/Add",
          },
          {
            title: "لیست درخواست ها",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.UserReal,
              UserRoles.UserLegal,
            ],
            path: "/Requests/UnionJobRequest/List",
          },
        ],
      },
    ],
  },
  {
    id: "LicenseRequset",
    title: "درخواست شناسنامه و پروانه",
    permissions: [UserRoles.UserReal, UserRoles.UserLegal],
    icon: <Package size={20} />,
    children: [
      {
        title: "صدور",
        icon: <Circle className="sidebar-icon" size={12} />,
        permissions: [UserRoles.UserReal, UserRoles.UserLegal],
        id: "NewLicenseRequest",
        children: [
          {
            title: "درخواست جدید",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [UserRoles.UserReal, UserRoles.UserLegal],
            path: "/License/New",
          },
          {
            title: "لیست درخواست ها",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [UserRoles.UserReal, UserRoles.UserLegal],
            path: "/License/List",
          },
        ],
      },
      {
        title: "ابطال",
        icon: <Circle className="sidebar-icon" size={12} />,
        permissions: [UserRoles.UserReal, UserRoles.UserLegal],
        id: "LicenseCancellation",
        children: [
          {
            title: "درخواست جدید",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [UserRoles.UserReal, UserRoles.UserLegal],
            path: "/MyLicense",
          },
          {
            title: "لیست درخواست ها",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [UserRoles.UserReal, UserRoles.UserLegal],
            path: "/License/Cancellation/List",
          },
        ],
      },
      {
        id: "ChangePersonalInfo",
        title: "تغییر اطلاعات هویتی",
        icon: <Info className="sidebar-icon" size={20} />,
        permissions: [UserRoles.Admin, UserRoles.UserReal, UserRoles.UserLegal],
        children: [
          {
            title: "درخواست جدید",
            icon: <Home className="sidebar-icon" size={20} />,
            permissions: [UserRoles.UserLegal, UserRoles.UserReal],
            path: "/ChangePersonalInfo/New",
          },
          {
            title: "لیست درخواست ها",
            icon: <Home className="sidebar-icon" size={20} />,
            permissions: [UserRoles.UserLegal, UserRoles.UserReal],
            path: "/ChangePersonalInfo/List",
          },
        ],
      },
    ],
  },
  {
    id: "MyLicense",
    title: "پروانه های من",
    permissions: [UserRoles.UserReal, UserRoles.UserLegal],
    icon: <Package size={20} />,
    children: [
      {
        title: "لیست درخواست ها",
        icon: <Circle className="sidebar-icon" size={20} />,
        permissions: [UserRoles.UserReal, UserRoles.UserLegal],
        path: "/MyLicense",
      },
    ],
  },

  {
    id: "GuildRequest",
    title: "درخواست ثبت اتاق",
    permissions: [
      UserRoles.CountyGuildRoomAdmin,
      UserRoles.ProvinceGuildRoomAdmin,
    ],
    icon: <Package size={20} />,
    children: [
      {
        title: "استان",
        icon: <Circle className="sidebar-icon" size={12} />,
        permissions: [UserRoles.ProvinceGuildRoomAdmin],
        id: "ProvinceGuildRequest",
        path: "/GuildsRequests/Province",
        children: [
          {
            title: "درخواست جدید",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [UserRoles.ProvinceGuildRoomAdmin],
            path: "/GuildsRequests/Province/Add",
          },
          {
            title: "لیست درخواست ها",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [UserRoles.ProvinceGuildRoomAdmin],
            path: "/GuildsRequests/Province/List",
          },
        ],
      },

      {
        title: "شهرستان",
        icon: <Circle className="sidebar-icon" size={12} />,
        permissions: [UserRoles.CountyGuildRoomAdmin],
        id: "CountyGuildRequest",
        path: "/GuildsRequests/County",
        children: [
          {
            title: "درخواست جدید",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [UserRoles.CountyGuildRoomAdmin],
            path: "/GuildsRequests/County/Add",
          },
          {
            title: "لیست درخواست ها",
            icon: <Circle className="sidebar-icon" size={20} />,
            permissions: [UserRoles.CountyGuildRoomAdmin],
            path: "/GuildsRequests/County/List",
          },
        ],
      },
    ],
  },

  {
    id: "UnionRequest",
    title: "درخواست ثبت اتحادیه",
    permissions: [UserRoles.CountyGuildRoomAdmin],
    icon: <Package size={20} />,
    children: [
      {
        title: "درخواست جدید",
        icon: <Circle className="sidebar-icon" size={20} />,
        permissions: [UserRoles.CountyGuildRoomAdmin],
        path: "/UnionsRequests/Union/Add",
      },
      {
        title: "لیست درخواست ها",
        icon: <Circle className="sidebar-icon" size={20} />,
        permissions: [UserRoles.CountyGuildRoomAdmin],
        path: "/UnionsRequests/Union/List",
      },
    ],
  },

  {
    id: "BasicInformation",
    path: "/BasicInformation",
    title: "اطلاعات اولیه",
    permissions: [UserRoles.Admin],
    icon: <Layers className="sidebar-icon" size={20} />,
    children: [
      {
        id: "BasicInformationTrees",
        title: "درختان",
        icon: <Circle size={12} />,
        path: "/BasicInformation/Trees", //  edit after
        permissions: [UserRoles.Admin],
        children: [
          {
            title: "دسته بندی درختان",
            icon: <Circle size={20} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Trees/Categories",
          },
          {
            title: "مدیریت درخت",
            icon: <Circle size={20} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Trees/ManageTrees",
          },
        ],
      },
      {
        id: "BasicInformationMachineryTools",
        title: "ماشین آلات",
        icon: <Circle size={12} />,
        path: "/BasicInformation/MachineryTools", //  edit after
        permissions: [UserRoles.Admin],
        children: [
          {
            title: "انواع ماشین آلات",
            icon: <Circle size={20} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/MachineryTools/MachineTypes",
          },
          {
            title: " شرکت های سازنده ",
            icon: <Circle size={20} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/MachineryTools/MachineManufacturer",
          },
          {
            title: " مدیریت بیمه ها",
            icon: <Circle size={20} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/MachineryTools/Insurance",
          },
          {
            title: "مدیریت ماشین ها",
            icon: <Circle size={20} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/MachineryTools/Machine",
          },
        ],
      },
      {
        id: "ServicesTools",
        title: "ادوات و خدمات",
        icon: <Circle size={12} />,
        path: "/BasicInformation/ServicesTools", //  edit after
        permissions: [UserRoles.Admin],
        children: [
          {
            title: "انواع ادوات و خدمات",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/ServicesTools/ServicesTypes",
          },
          {
            title: " نام ادوات و خدمات ",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/ServicesTools/ServicesName",
          },
        ],
      },
      {
        id: "FieldJob",
        title: "زمینه فعالیت و مشاغل",
        icon: <Circle size={12} />,
        path: "/BasicInformation/FieldJob", //  edit after
        permissions: [UserRoles.Admin],
        children: [
          {
            title: " بخش ها ",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/FieldJob/Sections",
          },
          {
            title: "قسمت ها",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/FieldJob/SubSection",
          },
          {
            title: "گروه ها",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/FieldJob/Category",
          },
          {
            title: "طبقه ها",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/FieldJob/Class",
          },
          {
            title: "زیر طبقه ها",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/FieldJob/SubClass",
          },
          {
            title: "عنوان فعالیت اقتصادی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/FieldJob/Job",
          },
          {
            title: "مدیریت اسناد مشاغل",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/FieldJob/Document/Issued",
          },
        ],
      },
      {
        id: "DocumentManagement",
        title: "مدیریت اسناد ضمیمه",
        permissions: [UserRoles.Admin],
        path: "/BasicInformation/DocumentManagement",
        icon: <Circle size={12} />,
        children: [
          {
            title: "اسناد",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/DocumentManagement",
          },
        ],
      },
      {
        id: "Products",
        title: "اطلاعات محصولات",
        icon: <Circle size={12} />,
        path: "/BasicInformation/Products", //  edit after
        children: [
          {
            title: "عوامل تولید",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Products/ProductsFactor",
          },
          {
            title: "دسته بندی محصولات",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Products/ProductsCategory",
          },
          {
            title: "محصولات",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Products/ProductsTools",
          },
          {
            title: "ارقام",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Products/ProductsItems",
          },
          {
            title: "مراکز تهیه نهال / بذر",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Products/SeedlingPreparationCenter",
          },
          {
            title: "درخت محصولات",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Products/ProductsTree",
          },
          {
            title: "واحد اندازه گیری محصولات",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Products/ProductUnit",
          },
          {
            title: "واحد اندازه گیری فعالیت",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Products/ActivityMeasurementUnit",
          },
        ],
      },
      {
        id: "Facilities",
        title: "ساختمان و تأسیسات",
        icon: <Circle size={12} />,
        path: "/BasicInformation/Facilities", //  edit after
        children: [
          {
            title: "انواع مجاورت زمین",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Facilities/LandAdjacentType",
          },
          {
            title: "انواع ساختمان تاسیسات",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Facilities/BuildingType",
          },
          {
            title: "انواع جداره چاه آب",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Facilities/AdminWaterWellCoverage",
          },
          {
            title: "قدرت موتور",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Facilities/MotorPower",
          },
          {
            title: "نوع موتور",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/BasicInformation/Facilities/MotorType",
          },
        ],
      },
    ],
  },

  {
    id: "UserList",
    title: "لیست کاربران",
    icon: <Users size={20} />,
    permissions: [UserRoles.Admin, UserRoles.MainLocationGuildRoomManager],
    path: "/UserList",
    children: [
      {
        title: "لیست کاربران حقیقی",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin, UserRoles.MainLocationGuildRoomManager],
        path: "/UserList/RealUsersList",
      },
      {
        title: "لیست کاربران حقوقی",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin, UserRoles.MainLocationGuildRoomManager],
        path: "/UserList/LegalUsersList",
      },
    ],
  },

  {
    id: "Guilds",
    title: "اتاق اصناف کشاورزی",
    permissions: [
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.CountyGuildRoomManager,
      UserRoles.CountyGuildRoomAdmin,
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.Admin,
    ],
    icon: <Package size={20} />,
    path: "/Guilds",
    children: [
      {
        id: "MainLocationGuilds",
        title: "اتاق اصناف کشور",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin, UserRoles.MainLocationGuildRoomManager],
        children: [
          {
            title: "لیست اطلاعات ثبت شده اتاق",
            icon: <Circle size={12} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.MainLocationGuildRoomManager,
            ],
            path: "/GuildsDetails/MainLocation/RegisteryDocs",
          },
          {
            title: "کاربران اتاق",
            icon: <Circle size={12} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.MainLocationGuildRoomManager,
            ],
            path: "/Guilds/mainlocationusers",
          },
        ],
      },
      {
        id: "ProvinceGuilds",
        title: "اتاق اصناف استان",
        icon: <Circle size={12} />,
        permissions: [
          UserRoles.MainLocationGuildRoomManager,
          UserRoles.Admin,
          UserRoles.ProvinceGuildRoomAdmin,
          UserRoles.ProvinceGuildRoomManager,
        ],
        path: "/Guilds/mainlocationusers",
        children: [
          {
            title: "لیست اطلاعات ثبت شده اتاق",
            icon: <Circle size={12} />,
            permissions: [
              UserRoles.Admin,
              UserRoles.MainLocationGuildRoomManager,
            ],
            path: "/Guilds/province",
          },
          {
            title: "کاربران اتاق",
            icon: <Circle size={12} />,
            permissions: [
              UserRoles.ProvinceGuildRoomAdmin,
              UserRoles.ProvinceGuildRoomManager,
            ],
            path: "/Guilds/GuildProvinceUsers",
          },
        ],
      },
      {
        id: "CountyGuilds",
        title: "اتاق اصناف شهرستان",
        icon: <Circle size={12} />,
        permissions: [
          UserRoles.CountyGuildRoomManager,
          UserRoles.CountyGuildRoomAdmin,
          UserRoles.ProvinceGuildRoomManager,
          UserRoles.Admin,
        ],
        path: "/Guilds/mainlocationusers",
        children: [
          {
            title: "لیست اطلاعات ثبت شده اتاق",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomManager],
            path: "/Guilds/county",
          },
          {
            title: "کاربران اتاق",
            icon: <Circle size={12} />,
            permissions: [
              UserRoles.CountyGuildRoomManager,
              UserRoles.CountyGuildRoomAdmin,
            ],
            path: "/Guilds/CountyUsers/",
          },
          {
            title: "لیست اصناف شهرستانی (ادمین کشوری)",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/Guilds/CountyList/",
          },
        ],
      },

      // {
      //   title: "کاربران کشوری",
      //   icon: <Circle size={12} />,
      //   permissions: [UserRoles.Admin, UserRoles.MainLocationGuildRoomManager],
      //   path: "/Guilds/mainlocationusers",
      // },
      // {
      //   title: "صنف کشوری",
      //   icon: <Circle size={12} />,
      //   permissions: [UserRoles.Admin, UserRoles.MainLocationGuildRoomManager],
      //   path: "/GuildsDetails/MainLocation/RegisteryDocs",
      // },
      // {
      //   title: "اصناف استانی",
      //   icon: <Circle size={12} />,
      //   permissions: [UserRoles.MainLocationGuildRoomManager, UserRoles.Admin],
      //   path: "/Guilds/province",
      // },
      // {
      //   title: "کاربران استانی",
      //   icon: <Circle size={12} />,
      //   permissions: [
      //     UserRoles.ProvinceGuildRoomAdmin,
      //     UserRoles.ProvinceGuildRoomManager,
      //   ],
      //   path: "/Guilds/GuildProvinceUsers",
      // },
      // {
      //   title: "کاربران شهرستانی",
      //   icon: <Circle size={12} />,
      //   permissions: [
      //     UserRoles.CountyGuildRoomManager,
      //     UserRoles.CountyGuildRoomAdmin,
      //   ],
      //   path: "/Guilds/CountyUsers/",
      // },
      // {
      //   title: "اصناف شهرستانی",
      //   icon: <Circle size={12} />,
      //   permissions: [UserRoles.ProvinceGuildRoomManager],
      //   path: "/Guilds/county",
      // },
      // {
      //   title: "لیست اصناف شهرستانی (ادمین کشوری)",
      //   icon: <Circle size={12} />,
      //   permissions: [UserRoles.Admin],
      //   path: "/Guilds/CountyList/",
      // },
    ],
  },

  {
    id: "Unions",
    title: "اتحادیه صنفی کشاورزی",
    permissions: [
      UserRoles.CountyGuildRoomManager,
      UserRoles.UnionManager,
      UserRoles.UnionAdmin,
      UserRoles.Admin,
    ],
    icon: <Package size={20} />,
    path: "/Unions",
    children: [
      {
        title: "اتحادیه های ثبت شده",
        icon: <Circle size={12} />,
        permissions: [UserRoles.CountyGuildRoomManager],
        path: "/Unions/",
      },
      {
        title: "کاربران اتحادیه",
        icon: <Circle size={12} />,
        permissions: [UserRoles.UnionManager, UserRoles.UnionAdmin],
        path: "/Unions/UnionUsers",
      },
      {
        title: "لیست اتحادیه ها (ادمین کشوری)",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin],
        path: "/Unions/UnionList/",
      },
    ],
  },
  {
    id: "JahadCenter",
    title: "جهاد",
    permissions: [UserRoles.CountyGuildRoomAdmin],
    icon: <Package size={20} />,
    path: "/JahadCenter",
    children: [
      {
        title: "مرکز جهاد",
        icon: <Circle size={12} />,
        permissions: [UserRoles.CountyGuildRoomAdmin],
        path: "/JahadCenter/",
      },
    ],
  },

  // {
  //   id:"SecretariatCartable",
  //   title: "کارتابل دبیر خانه",
  //   path: "/ManageRequests/SecretariatJobRequestslist",
  //   icon: <Home className="sidebar-icon" size={20} />,
  // },

  {
    id: "ManageGuildActivation",
    title: "مدیریت درخواست اتاق",
    permissions: [
      UserRoles.ProvinceSecretariat,
      UserRoles.MainLocationSecretariat,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.MainLocationGuildRoomViceManager,
      UserRoles.ProvinceGuildRoomViceManager,
      UserRoles.MainLocationGUildRoomExecutiveManager,
      UserRoles.ProvinceGuildRoomExecutiveManager,
    ],
    icon: <Package size={20} />,
    children: [
      {
        id: "SecreteriatGuildActivationCartable",
        title: "دبیرخانه",
        permissions: [
          UserRoles.MainLocationSecretariat,
          UserRoles.ProvinceSecretariat,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های نظام صنفی استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationSecretariat],
            path: "/GuildsActivation/ProvinceSecretariatGuildActivation",
          },
          {
            title: "کارتابل درخواست نظام صنفی استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationSecretariat],
            path: "/GuildsActivation/ProvinceSecretariatCartable",
          },
          {
            title: "درخواست های نظام صنفی شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceSecretariat],
            path: "/GuildsActivation/CountySecretariatGuildActivation",
          },
          {
            title: "کارتابل درخواست نظام صنفی شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceSecretariat],
            path: "/GuildsActivation/CountySecretariatCartable",
          },
        ],
      },
      {
        id: "ManagerGuildActivationCartable",
        title: "مدیر",
        permissions: [
          UserRoles.MainLocationGuildRoomManager,
          UserRoles.ProvinceGuildRoomManager,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های نظام صنفی استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomManager],
            path: "/GuildsActivation/ProvinceManagerGuildActivation",
          },
          {
            title: "کارتابل درخواست نظام صنفی استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomManager],
            path: "/GuildsActivation/ProvinceManagerCartable",
          },
          {
            title: "درخواست های نظام صنفی شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomManager],
            path: "/GuildsActivation/CountyManagerGuildActivation",
          },
          {
            title: "کارتابل درخواست نظام صنفی شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomManager],
            path: "/GuildsActivation/CountyManagerCartable",
          },
        ],
      },
      {
        id: "ItManagerGuildActivationCartable",
        title: "فناوری اطلاعات",
        permissions: [UserRoles.ITManger],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های نظام صنفی استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ITManger],
            path: "/GuildsActivation/ProvinceItManagerCartable",
          },
          {
            title: "درخواست های نظام صنفی شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ITManger],
            path: "/GuildsActivation/CountyItManagerCartable",
          },
        ],
      },
      {
        id: "ViceManagerGuildActivationCartable",
        title: "نایب رییس",
        permissions: [
          UserRoles.MainLocationGuildRoomViceManager,
          UserRoles.ProvinceGuildRoomViceManager,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های نظام صنفی استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomViceManager],
            path: "/GuildsActivation/ProvinceViceManagerGuildActivation",
          },
          {
            title: "کارتابل درخواست نظام صنفی استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomViceManager],
            path: "/GuildsActivation/ProvinceViceManagerCartable",
          },
          {
            title: "درخواست های نظام صنفی شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomViceManager],
            path: "/GuildsActivation/CountyViceManagerGuildActivation",
          },
          {
            title: "کارتابل درخواست نظام صنفی شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomViceManager],
            path: "/GuildsActivation/CountyViceManagerCartable",
          },
        ],
      },
      {
        id: "ExecutiveManagerGuildActivationCartable",
        title: "مدیر اجرایی",
        permissions: [
          UserRoles.MainLocationGUildRoomExecutiveManager,
          UserRoles.ProvinceGuildRoomExecutiveManager,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های نظام صنفی استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGUildRoomExecutiveManager],
            path: "/GuildsActivation/ProvinceExecutiveManagerGuildActivation",
          },
          {
            title: "کارتابل درخواست نظام صنفی استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGUildRoomExecutiveManager],
            path: "/GuildsActivation/ProvinceExecutiveManagerCartable",
          },
          {
            title: "درخواست های نظام صنفی شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomExecutiveManager],
            path: "/GuildsActivation/CountyExecutiveManagerGuildActivation",
          },
          {
            title: "کارتابل درخواست نظام صنفی شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomExecutiveManager],
            path: "/GuildsActivation/CountyExecutiveManagerCartable",
          },
        ],
      },
    ],
  },

  {
    id: "ManageUnionActivation",
    title: "مدیریت درخواست اتحادیه",
    permissions: [
      UserRoles.ProvinceSecretariat,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.ProvinceGuildRoomViceManager,
      UserRoles.ProvinceGuildRoomExecutiveManager,
      UserRoles.ITManger,
    ],
    icon: <Package size={20} />,
    children: [
      {
        id: "SecreteriatUnionActivationCartable",
        title: "دبیرخانه",
        permissions: [UserRoles.ProvinceSecretariat],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceSecretariat],
            path: "/UnionsActivation/UnionSecretariatActivation",
          },
          {
            title: "کارتابل درخواست اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceSecretariat],
            path: "/UnionsActivation/UnionSecretariatCartable",
          },
        ],
      },
      {
        id: "ManagerUnionActivationCartable",
        title: "مدیر",
        permissions: [UserRoles.ProvinceGuildRoomManager],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomManager],
            path: "/UnionsActivation/UnionManagerGuildActivation",
          },
          {
            title: "کارتابل درخواست اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomManager],
            path: "/UnionsActivation/UnionManagerCartable",
          },
        ],
      },
      {
        id: "ItManagerUnionActivationCartable",
        title: "فناوری اطلاعات",
        permissions: [UserRoles.ITManger],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ITManger],
            path: "/UnionsActivation/UnionItManagerCartable",
          },
        ],
      },
      {
        id: "ViceManagerUnionActivationCartable",
        title: "نایب رییس",
        permissions: [UserRoles.ProvinceGuildRoomViceManager],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomViceManager],
            path: "/UnionsActivation/UnionViceManagerGuildActivation",
          },
          {
            title: "کارتابل درخواست اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomViceManager],
            path: "/UnionsActivation/UnionViceManagerCartable",
          },
        ],
      },

      {
        id: "ExecutiveManagerUnionActivationCartable",
        title: "مدیر اجرایی",
        permissions: [UserRoles.ProvinceGuildRoomExecutiveManager],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomExecutiveManager],
            path: "/UnionsActivation/UnionExecutiveManagerGuildActivation",
          },
          {
            title: "کارتابل درخواست اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomExecutiveManager],
            path: "/UnionsActivation/UnionExecutiveManagerCartable",
          },
        ],
      },
    ],
  },

  {
    id: "ManageJobRequests",
    title: "مدیریت درخواست های شغلی",
    permissions: [
      UserRoles.CountyGuildRoomManager,
      UserRoles.UnionManager,
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.CountySecretariat,
      UserRoles.MainLocationSecretariat,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.ProvinceSecretariat,
      UserRoles.UnionSecretariat,
      UserRoles.MainLocationTreasurer,
      UserRoles.ProvinceTreasurer,
      UserRoles.CountyTreasurer,
      UserRoles.UnionTreasurer,
      UserRoles.MainLocationGuildRoomViceManager,
      UserRoles.ProvinceGuildRoomViceManager,
      UserRoles.CountyGuildRoomViceManager,
      UserRoles.UnionViceManager,
      UserRoles.UnionViceExecutiveManager,
      UserRoles.CountyGuildRoomExecutiveManager,
      UserRoles.ProvinceGuildRoomExecutiveManager,
      UserRoles.MainLocationGUildRoomExecutiveManager,
    ],
    icon: <Package size={20} />,
    children: [
      {
        id: "SecreteriatCartable",
        title: "دبیرخانه",
        permissions: [
          UserRoles.MainLocationSecretariat,
          UserRoles.ProvinceSecretariat,
          UserRoles.CountySecretariat,
          UserRoles.UnionSecretariat,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های شغل کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationSecretariat],
            path: "/ManageRequests/MainLocationSecretariatJobRequestList",
          },
          {
            title: "کارتابل دبیرخانه کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationSecretariat],
            path: "/ManageCartable/MainLocationJobRequestCartable",
          },
          {
            title: "درخواست های شغل استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceSecretariat],
            path: "/ManageRequests/ProvinceSecretariatJobRequestList",
          },
          {
            title: "کارتابل دبیرخانه استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceSecretariat],
            path: "/ManageCartable/ProvinceJobRequestCartable",
          },
          {
            title: "درخواست های شغل شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountySecretariat],
            path: "/ManageRequests/CountySecretariatJobRequestList",
          },
          {
            title: "کارتابل دبیرخانه شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountySecretariat],
            path: "/ManageCartable/CountyJobRequestCartable",
          },
          {
            title: "درخواست های شغل اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionSecretariat],
            path: "/ManageRequests/UnionSecretariatJobRequestList",
          },
          {
            title: "کارتابل دبیرخانه اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionSecretariat],
            path: "/ManageCartable/UnionJobRequestCartable",
          },
        ],
      },

      {
        id: "TreasurerCartable",
        title: "خزانه دار",
        permissions: [
          UserRoles.MainLocationTreasurer,
          UserRoles.ProvinceTreasurer,
          UserRoles.CountyTreasurer,
          UserRoles.UnionTreasurer,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "کارتابل خزانه دار کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationTreasurer],
            path: "/ManageCartable/MainLocationTreasurerJobRequestCartable",
          },
          {
            title: "کارتابل خزانه دار استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceTreasurer],
            path: "/ManageCartable/ProvinceTreasurerJobRequestCartable",
          },
          {
            title: "کارتابل خزانه دار شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyTreasurer],
            path: "/ManageCartable/CountyTreasurerJobRequestCartable",
          },
          {
            title: "کارتابل خزانه دار اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionTreasurer],
            path: "/ManageCartable/UnionTreasurerJobRequestCartable",
          },
        ],
      },

      {
        id: "ManagerCartable",
        title: "مدیریت",
        permissions: [
          UserRoles.MainLocationGuildRoomManager,
          UserRoles.ProvinceGuildRoomManager,
          UserRoles.CountyGuildRoomManager,
          UserRoles.UnionManager,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های شغل کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomManager],
            path: "/ManageRequests/MainLocationManagerJobRequestList",
          },

          {
            title: "کارتابل مدیریت کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomManager],
            path: "/ManageCartable/MainLocationManagerCartable",
          },
          {
            title: "درخواست های شغل استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomManager],
            path: "/ManageRequests/ProvinceManagerJobRequestList",
          },
          {
            title: "کارتابل مدیریت استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomManager],
            path: "/ManageCartable/ProvinceManagerCartable",
          },
          {
            title: "درخواست های شغل شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomManager],
            path: "/ManageRequests/CountyManagerJobRequestList",
          },
          {
            title: "کارتابل مدیریت شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomManager],
            path: "/ManageCartable/CountyManagerCartable",
          },
          {
            title: "درخواست های شغل اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionManager],
            path: "/ManageRequests/UnionManagerJobRequestList",
          },
          {
            title: "کارتابل مدیریت اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionManager],
            path: "/ManageCartable/UnionManagerCartable",
          },
        ],
      },

      {
        id: "ViceManagerCartable",
        title: "نایب رییس",
        permissions: [
          UserRoles.MainLocationGuildRoomViceManager,
          UserRoles.ProvinceGuildRoomViceManager,
          UserRoles.CountyGuildRoomViceManager,
          UserRoles.UnionViceManager,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های شغل کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomViceManager],
            path: "/ManageRequests/MainLocationViceManagerJobRequestList",
          },
          {
            title: "کارتابل نایب رییس کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomViceManager],
            path: "/ManageCartable/MainLocationViceManagerCartable",
          },
          {
            title: "درخواست های شغل استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomViceManager],
            path: "/ManageRequests/ProvinceViceManagerJobRequestList",
          },
          {
            title: "کارتابل نایب رییس استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomViceManager],
            path: "/ManageCartable/ProvinceViceManagerCartable",
          },
          {
            title: "درخواست های شغل شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomViceManager],
            path: "/ManageRequests/CountyViceManagerJobRequestList",
          },
          {
            title: "کارتابل نایب رییس شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomViceManager],
            path: "/ManageCartable/CountyViceManagerCartable",
          },
          {
            title: "درخواست های شغل اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionViceManager],
            path: "/ManageRequests/UnionViceManagerJobRequestList",
          },
          {
            title: "کارتابل نایب رییس اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionViceManager],
            path: "/ManageCartable/UnionViceManagerCartable",
          },
        ],
      },
      {
        id: "ExecutiveManagerCartable",
        title: "مدیر اجرایی",
        permissions: [
          UserRoles.MainLocationGUildRoomExecutiveManager,
          UserRoles.ProvinceGuildRoomExecutiveManager,
          UserRoles.CountyGuildRoomExecutiveManager,
          UserRoles.UnionViceExecutiveManager,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های شغل کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGUildRoomExecutiveManager],
            path: "/ManageRequests/MainLocationExecutiveManagerJobRequestList",
          },
          {
            title: "کارتابل مدیر اجرایی کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGUildRoomExecutiveManager],
            path: "/ManageCartable/MainLocationExecutiveManagerCartable",
          },
          {
            title: "درخواست های شغل استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomExecutiveManager],
            path: "/ManageRequests/ProvinceExecutiveManagerJobRequestList",
          },
          {
            title: "کارتابل مدیر اجرایی استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomExecutiveManager],
            path: "/ManageCartable/ProvinceExecutiveManagerCartable",
          },
          {
            title: "درخواست های شغل شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomExecutiveManager],
            path: "/ManageRequests/CountyExecutiveManagerJobRequestList",
          },
          {
            title: "کارتابل مدیر اجرایی شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomExecutiveManager],
            path: "/ManageCartable/CountyExecutiveManagerCartable",
          },
          {
            title: "درخواست های شغل اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionViceExecutiveManager],
            path: "/ManageRequests/UnionExecutiveManagerJobRequestList",
          },
          {
            title: "کارتابل مدیر اجرایی اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionViceExecutiveManager],
            path: "/ManageCartable/UnionExecutiveManagerCartable",
          },
        ],
      },

      {
        id: "UpManagerCartable",
        title: "مدیریت بالادستی",
        permissions: [
          UserRoles.MainLocationGuildRoomManager,
          UserRoles.ProvinceGuildRoomManager,
          UserRoles.CountyGuildRoomManager,
          UserRoles.UnionManager,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "کارتابل مدیر کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomManager],
            path: "/ManageCartable/ProvinceUpManagerJobRequestCartable",
          },
          {
            title: "کارتابل مدیر استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomManager],
            path: "/ManageCartable/CountyUpManagerJobRequestCartable",
          },
          {
            title: "کارتابل مدیر شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomManager],
            path: "/ManageCartable/UnionUpManagerJobRequestCartable",
          },
        ],
      },
    ],
  },

  {
    id: "ManageLicenseRequest",
    title: "مدیریت صدور پروانه",
    permissions: [
      UserRoles.UnionExpert,
      UserRoles.UnionIssuingResponsible,
      UserRoles.JahadCenterManager,
    ],
    icon: <Package size={20} />,
    children: [
      {
        id: "ExpertCartable",
        title: "کارشناس",
        permissions: [UserRoles.UnionExpert],
        icon: <Circle size={12} />,
        children: [
          // {
          //   title: "درخواست های صدور پروانه",
          //   icon: <Circle size={12} />,
          //   permissions: [UserRoles.UnionExpert],
          //   path: "/ManageLicense/AllRequests",
          // },
          {
            title: "کارتابل من",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionExpert],
            path: "/ManageLicense/MyCartable",
          },
        ],
      },
      {
        id: "IssuingResponsibleCartable",
        title: "مسئول صدور",
        permissions: [UserRoles.UnionIssuingResponsible],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های صدور پروانه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionIssuingResponsible],
            path: "/ManageLicense/IssuingResponsible/AllRequests",
          },
          {
            title: "کارتابل من",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionIssuingResponsible],
            path: "/ManageLicense/IssuingResponsible/MyCartable",
          },
        ],
      },
      {
        id: "JahadCenterManagerCartable",
        title: "مدیر جهاد",
        permissions: [UserRoles.JahadCenterManager],
        icon: <Circle size={12} />,
        children: [
          {
            title: "کارتابل من",
            icon: <Circle size={12} />,
            permissions: [UserRoles.JahadCenterManager],
            path: "/ManageLicense/JahadCenterManager/MyCartable",
          },
        ],
      },
      {
        id: "IssuingManagerCartable",
        title: "مدیر صدور",
        permissions: [UserRoles.UnionIssuingManager],
        icon: <Circle size={12} />,
        children: [
          {
            title: "کارتابل من",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionIssuingManager],
            path: "/ManageLicense/IssuingManager/MyCartable",
          },
        ],
      },
      {
        id: "UnionManagerCartable",
        title: "مدیر اتحادیه",
        permissions: [UserRoles.UnionManager],
        icon: <Circle size={12} />,
        children: [
          {
            title: "کارتابل من",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionManager],
            path: "/ManageLicense/UnionManager/MyCartable",
          },
        ],
      },
      {
        id: "SecreteriatIssuingCartable",
        title: "دبیرخانه",
        permissions: [UserRoles.UnionSecretariat],
        icon: <Circle size={12} />,
        children: [
          {
            title: "درخواست های صدور پروانه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionSecretariat],
            path: "/ManageLicense/Secreteriat/AllRequests",
          },
          {
            title: "کارتابل من",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionSecretariat],
            path: "/ManageLicense/Secreteriat/MyCartable",
          },
        ],
      },
    ],
  },

  {
    id: "ManageUserChangeInfo",
    title: "مدیریت درخواست های تغییر اطلاعات هویتی",
    permissions: [UserRoles.UnionManager, UserRoles.UnionIssuingResponsible],
    icon: <Package size={20} />,
    children: [
      {
        id: "ManageUserChangeInfoIssuingResponsible",
        title: "مسئول صدور",
        permissions: [UserRoles.UnionIssuingResponsible],
        icon: <Circle size={12} />,
        children: [
          {
            title: "کارتابل",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionIssuingResponsible],
            path: "/ChangeUserInfoManagement/IssuingResponsible/list",
          },
        ],
      },
      {
        id: "ManageUserChangeInfoUnionManager",
        title: "مدیر اتحادیه",
        permissions: [UserRoles.UnionManager],
        icon: <Circle size={12} />,
        children: [
          {
            title: "کارتابل",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionManager],
            path: "/ChangeUserInfoManagement/UnionManager/list",
          },
        ],
      },
    ],
  },

  // {
  //   id: "UpManagerCartable",
  //   title: "کارتابل مدیریت من",
  //   permissions: [
  //     UserRoles.MainLocationGuildRoomManager,
  //     UserRoles.ProvinceGuildRoomManager,
  //     UserRoles.CountyGuildRoomManager,
  //     UserRoles.UnionManager,
  //   ],
  //   icon: <FilePlus size={20} />,
  //   children: [
  //     {
  //       title: "کارتابل  مدیر کشوری",
  //       icon: <Circle size={12} />,
  //       permissions: [UserRoles.MainLocationGuildRoomManager],
  //       path: "/ManageCartable/MainLocationManagerJobRequestCartable",
  //     },
  //     {
  //       title: "کارتابل مدیر استانی",
  //       icon: <Circle size={12} />,
  //       permissions: [UserRoles.ProvinceGuildRoomManager],
  //       path: "/ManageCartable/ProvinceManagerJobRequestCartable",
  //     },
  //     {
  //       title: "کارتابل مدیر شهرستانی",
  //       icon: <Circle size={12} />,
  //       permissions: [UserRoles.CountyGuildRoomManager],
  //       path: "/ManageCartable/CountyManagerJobRequestCartable",
  //     },
  //     {
  //       title: "کارتابل مدیر اتحادیه",
  //       icon: <Circle size={12} />,
  //       permissions: [UserRoles.UnionManager],
  //       path: "/ManageCartable/UnionManagerJobRequestCartable",
  //     },
  //   ],
  // },

  {
    id: "Tickets",
    title: "تیکت",
    permissions: [UserRoles.MainLocationTreasurer],
    icon: <MessageSquare size={20} />,
    children: [
      {
        title: "تیکت های من",
        icon: <Circle size={12} />,
        permissions: [UserRoles.UserReal, UserRoles.UserLegal],
        path: "/Tickets/MyTickets",
      },
    ],
  },

  // {
  //   id: "SetTariff",
  //   title: "تعرفه جذب",
  //   permissions: [UserRoles.Admin],
  //   icon: <MessageSquare size={20} />,
  //   children: [
  //     {
  //       title: "تعرفه جذب کشوری",
  //       icon: <Circle size={12} />,
  //       permissions: [UserRoles.Admin],
  //       path: "/SetTariff/MainLocation",
  //     },
  //     {
  //       title: "تعرفه جذب استانی",
  //       icon: <Circle size={12} />,
  //       permissions: [UserRoles.Admin],
  //       path: "/SetTariff/Province",
  //     },
  //     {
  //       title: "تعرفه جذب شهرستانی",
  //       icon: <Circle size={12} />,
  //       permissions: [UserRoles.Admin],
  //       path: "/SetTariff/County",
  //     },
  //     {
  //       title: "تعرفه جذب اتحادیه",
  //       icon: <Circle size={12} />,
  //       permissions: [UserRoles.Admin],
  //       path: "/SetTariff/Union",
  //     },
  //   ],
  // },
  // {
  //   title: "تعرفه درخواست پروانه",
  //   icon: <Circle size={12} />,
  //   permissions: [UserRoles.Admin],
  //   path: "/SetLicenseRequestTariff/",
  // },
  {
    id: "InqueryLetters",
    title: "نامه استعلامات",
    permissions: [
      UserRoles.Admin,
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.CountyGuildRoomAdmin,
      UserRoles.UnionAdmin,
    ],
    icon: <MessageSquare size={20} />,
    children: [
      {
        title: "سازمان ها",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin],
        path: "/InqueryLetters/Organization",
      },
      {
        title: "استعلامات",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin],
        path: "/InqueryLetters/Inquery",
      },
      // {
      //   title: "ثبت نامه پیشفرض",
      //   icon: <Circle size={12} />,
      //   permissions: [UserRoles.Admin],
      //   path: "/InqueryLetters/setDefault/MainLocation",
      // },
      {
        title: "ثبت نامه پیشفرض استانی",
        icon: <Circle size={12} />,
        permissions: [UserRoles.ProvinceGuildRoomAdmin],
        path: "/InqueryLetters/setDefault/Province",
      },
      {
        title: "ثبت نامه پیشفرض شهرستانی",
        icon: <Circle size={12} />,
        permissions: [UserRoles.CountyGuildRoomAdmin],
        path: "/InqueryLetters/setDefault/County",
      },
      {
        title: "ثبت نامه پیشفرض اتحادیه",
        icon: <Circle size={12} />,
        permissions: [UserRoles.UnionAdmin],
        path: "/InqueryLetters/setDefault/Union",
      },
    ],
  },

  {
    id: "wallet",
    title: "کیف پول",
    icon: <Gift size={20} />,
    permissions: [UserRoles.UserReal, UserRoles.UserLegal],
    path: "/Wallet/",
    children: [
      {
        title: "افزایش اعتبار",
        icon: <Circle size={12} />,
        permissions: [UserRoles.UserReal, UserRoles.UserLegal],
        path: "/Wallet/ChargeWallet",
      },
      {
        title: "لیست تراکنش های من",
        icon: <Circle size={12} />,
        permissions: [UserRoles.UserReal, UserRoles.UserLegal],
        path: "/Wallet/UserTransactions",
      },
      {
        title: "لیست همه تراکنش ها",
        icon: <Circle size={12} />,
        permissions: [UserRoles.MainLocationGuildRoomManager],
        path: "/Wallet/AllTransactions",
      },
      {
        title: "لیست تراکنش های اتحادیه",
        icon: <Circle size={12} />,
        permissions: [UserRoles.UnionManager],
        path: "/Wallet/UnionTransactions",
      },
      {
        title: "لیست تراکنش های شهرستان",
        icon: <Circle size={12} />,
        permissions: [UserRoles.CountyGuildRoomManager],
        path: "/Wallet/CountyTransactions",
      },
      {
        title: "لیست تراکنش های استان",
        icon: <Circle size={12} />,
        permissions: [UserRoles.ProvinceGuildRoomManager],
        path: "/Wallet/ProvinceTransactions",
      },
    ],
  },

  {
    id: "Settings",
    title: "تنظیمات",
    permissions: [
      UserRoles.Admin,
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.CountyGuildRoomAdmin,
      UserRoles.UnionAdmin,
    ],
    icon: <Settings size={20} />,
    children: [
      {
        title: "اعلان ها",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin],
        path: "/Settings/Notification",
      },
      {
        title: "تایید و رد مدیر سطح بالاتر",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin],
        path: "/Settings/ActiveUpManager",
      },
      {
        title: "تنظیم قرارداد",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin],
        path: "/Settings/SetContractPosition",
      },
      {
        title: "تنظیم هزینه ها",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin],
        path: "/Settings/CostManagement",
      },
      {
        title: "تنظیم نقشه شهرستان",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin],
        path: "/Land/SetCountyPolygon/Track",
      },
      {
        title: "مالی",
        icon: <Circle size={12} />,
        id: "Finance",
        permissions: [
          UserRoles.Admin,
          UserRoles.ProvinceGuildRoomAdmin,
          UserRoles.CountyGuildRoomAdmin,
          UserRoles.UnionAdmin,
        ],
        children: [
          {
            title: "تعرفه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomManager],
            path: "/Finance/Tarrif",
          },
          {
            title: "وظایف",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomManager],
            path: "/Finance/Roles",
          },
          {
            title: "سقف مبالغ",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/Finance/PayableValue",
          },

          {
            title: "ردیف مالی تعرفه کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/Finance/FixedPayableValue/MainLocation",
          },
          {
            title: "ردیف مالی تعرفه استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomAdmin],
            path: "/Finance/FixedPayableValue/Province",
          },
          {
            title: "ردیف مالی تعرفه شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomAdmin],
            path: "/Finance/FixedPayableValue/County",
          },

          {
            title: "درصد تسهیم تعرفه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomManager],
            path: "/Finance/MaxPayableValue",
          },
          {
            title: "درصد تعرفه هکتاری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomManager],
            path: "/Finance/ExpertiseCosts",
          },
          {
            title: "تعرفه گروه شغلی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.MainLocationGuildRoomManager],
            path: "/Finance/JobCategoryTariff",
          },
        ],
      },

      {
        id: "PositionSetting",
        title: "تنظیمات شغل",
        permissions: [
          UserRoles.Admin,
          UserRoles.ProvinceGuildRoomAdmin,
          UserRoles.CountyGuildRoomAdmin,
          UserRoles.UnionAdmin,
        ],
        icon: <Circle size={12} />,
        children: [
          {
            title: "تنظیمات شغل کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/Position/SetMainLocationPosition",
          },
          {
            title: "تنظیمات شغل استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/Position/SetProvincePosition",
          },
          {
            title: "تنظیمات شغل شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomAdmin],
            path: "/Position/SetCountyPosition",
          },
          {
            title: "تنظیمات شغل اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomAdmin],
            path: "/Position/SetUnionPosition",
          },
        ],
      },
      {
        id: "CancelationReason",
        title: "ابطال",
        permissions: [UserRoles.Admin],
        icon: <Circle size={12} />,
        children: [
          {
            title: "دلایل ابطال",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/Settings/Cancelation/CancelationReason",
          },
        ],
      },
    ],
  },
  {
    id: "SetAdmin",
    title: "مدیریت ادمین ها",
    permissions: [
      UserRoles.Admin,
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.CountyGuildRoomAdmin,
    ],
    icon: <Circle size={12} />,
    children: [
      // {
      //   title: "ادمین کشوری",
      //   icon: <Circle size={12} />,
      //   permissions: [UserRoles.Admin],
      //   path: "/GuildsActivation/SetAdmin/MainLocation",
      // },
      // {
      //   title: "ادمین استانی",
      //   icon: <Circle size={12} />,
      //   permissions: [UserRoles.Admin , UserRoles.ProvinceGuildRoomAdmin],
      //   path: "/GuildsActivation/SetAdmin/Province",
      // },
      // {
      //   title: "ادمین شهرستانی",
      //   icon: <Circle size={12} />,
      //   permissions: [UserRoles.ProvinceGuildRoomAdmin , UserRoles.CountyGuildRoomAdmin , UserRoles.Admin],
      //   path: "/GuildsActivation/SetAdmin/County",
      // },
      // {
      //   title: "ادمین اتحادیه",
      //   icon: <Circle size={12} />,
      //   permissions: [UserRoles.CountyGuildRoomAdmin , UserRoles.ProvinceGuildRoomAdmin  , UserRoles.UnionAdmin ,UserRoles.Admin , ],
      //   path: "/GuildsActivation/SetAdmin/Union",
      // },
      {
        title: "ادمین کشوری",
        icon: <Circle size={12} />,
        permissions: [UserRoles.Admin],
        id: "MainLocationAdmins",
        children: [
          {
            title: "کشوری",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/GuildsActivation/SetAdmin/MainLocation/MainLocationAdmin",
          },
          {
            title: "استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/GuildsActivation/SetAdmin/Province/MainLocationAdmin",
          },
          {
            title: "شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.Admin],
            path: "/GuildsActivation/SetAdmin/County/MainLocationAdmin",
          },
          // {
          //   title: "اتحادیه",
          //   icon: <Circle size={12} />,
          //   permissions: [UserRoles.Admin],
          //   path: "/GuildsActivation/SetAdmin/Union/MainLocationAdmin",
          // },
        ],
      },

      {
        title: "ادمین استانی",
        icon: <Circle size={12} />,
        permissions: [UserRoles.ProvinceGuildRoomAdmin],
        id: "ProvinceAdmins",
        children: [
          {
            title: "استانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomAdmin],
            path: "/GuildsActivation/SetAdmin/Province/ProvinceAdmin",
          },
          {
            title: "شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomAdmin],
            path: "/GuildsActivation/SetAdmin/County/ProvinceAdmin",
          },
          {
            title: "اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.ProvinceGuildRoomAdmin],
            path: "/GuildsActivation/SetAdmin/Union/ProvinceAdmin",
          },
        ],
      },
      {
        title: "ادمین شهرستانی",
        icon: <Circle size={12} />,
        permissions: [UserRoles.CountyGuildRoomAdmin],
        id: "CountyAdmins",
        children: [
          {
            title: "شهرستانی",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomAdmin],
            path: "/GuildsActivation/SetAdmin/County/CountyAdmin",
          },
          {
            title: "اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.CountyGuildRoomAdmin],
            path: "/GuildsActivation/SetAdmin/Union/CountyAdmin",
          },
        ],
      },
      {
        title: "ادمین اتحادیه",
        icon: <Circle size={12} />,
        permissions: [UserRoles.UnionAdmin],
        id: "UnionAdmins",
        children: [
          {
            title: "اتحادیه",
            icon: <Circle size={12} />,
            permissions: [UserRoles.UnionAdmin],
            path: "/GuildsActivation/SetAdmin/Union/UnionAdmin",
          },
        ],
      },
    ],
  },
  {
    id: "Reports",
    title: "گزارشات",
    permissions: [UserRoles.Admin],
    icon: <Circle size={12} />,
    children: [
      {
        title: "گزارش تعداد پروانه",
        icon: <Circle size={12} />,
        permissions: [UserRoles.MainLocationGuildRoomManager],
        path: "/Reports/LicenseCountReports",
      },
      {
        title: "گزارش قطعات روی نقشه",
        icon: <Circle size={12} />,
        permissions: [UserRoles.MainLocationGuildRoomManager],
        path: "/Reports/MapPoints",
      },
    ],
  },
  {
    id: "SetSignature",
    title: "ثبت امضا",
    permissions: [
      UserRoles.MainLocationGuildRoomManager,
      UserRoles.ProvinceGuildRoomManager,
      UserRoles.UnionManager,
      UserRoles.CountyGuildRoomManager,
      UserRoles.MainLocationGuildRoomViceManager,
      UserRoles.MainLocationGUildRoomExecutiveManager,
      UserRoles.ProvinceGuildRoomViceManager,
      UserRoles.ProvinceGuildRoomExecutiveManager,
      UserRoles.CountyGuildRoomViceManager,
      UserRoles.CountyGuildRoomExecutiveManager,
      UserRoles.UnionViceManager,
      UserRoles.UnionViceExecutiveManager,
      UserRoles.UnionExpert,
    ],
    icon: <MessageSquare size={20} />,
    children: [
      {
        title: "ثبت امضا جدید",
        icon: <Circle size={12} />,
        permissions: [
          UserRoles.MainLocationGuildRoomManager,
          UserRoles.ProvinceGuildRoomManager,
          UserRoles.UnionManager,
          UserRoles.CountyGuildRoomManager,
          UserRoles.MainLocationGuildRoomViceManager,
          UserRoles.MainLocationGUildRoomExecutiveManager,
          UserRoles.ProvinceGuildRoomViceManager,
          UserRoles.ProvinceGuildRoomExecutiveManager,
          UserRoles.CountyGuildRoomViceManager,
          UserRoles.CountyGuildRoomExecutiveManager,
          UserRoles.UnionViceManager,
          UserRoles.UnionViceExecutiveManager,
          UserRoles.UnionExpert,
        ],
        path: "/Signature/new",
      },
    ],
  },
  {
    id: "OldLicense",
    title: "پروانه های قدیم",
    permissions: [
      UserRoles.ProvinceGuildRoomAdmin,
      UserRoles.CountyGuildRoomAdmin,
    ],
    icon: <Package size={20} />,
    children: [
      {
        title: "مشاهده اکسل پروانه های قدیم",
        icon: <Circle size={12} />,
        permissions: [
          UserRoles.ProvinceGuildRoomAdmin,
          UserRoles.CountyGuildRoomAdmin,
        ],
        path: "/Licenses/ShowOldLicenseExcel",
      },
    ],
  },
];

export const navigationDetail = [
  {
    active: "/BasicInformation/FieldJob/Job",
    for: ["/BasicInformation/FieldJob/Job"],
  },
  {
    active: "/UserList/RealUsersList",
    for: ["/UserList/RealUsersList"],
  },
  {
    active: "/Requests/CountyJobRequest/Add",
    for: ["/Requests/CountyJobRequest/Add"],
  },
  {
    active: "/UserList/LegalUsersList",
    for: ["/UserList/LegalUsersList"],
  },
  {
    active: "/BasicInformation/Products/ProductsFactor",
    for: ["/BasicInformation/Products/ProductsFactor"],
  },
  {
    active: "/BasicInformation/Products/ProductsTools",
    for: ["/BasicInformation/Products/ProductsTools"],
  },
  {
    active: "/BasicInformation/Products/ProductsItems",
    for: ["/BasicInformation/Products/ProductsItems"],
  },
  {
    active: "/Beneficiari/Machinery",
    for: ["/Beneficiari/Machinery"],
  },
  {
    active: "/Guilds/ProvinceUsers",
    for: ["/Guilds/ProvinceUsers"],
  },
  {
    active: "/Guilds/province",
    for: ["/Guilds/province"],
  },
  {
    active: "/Unions/UnionUsers",
    for: ["/UnionsMember"],
  },
  // {
  //   active: "/Wallet/TransactionLists",
  //   for: ["/Wallet/TransactionLists"],
  // },

  {
    active: "/Guilds/county",
    for: ["/Guilds/CountyEdit"],
  },
  {
    active: "/Unions/",
    for: ["/Unions/UnionEdit"],
  },
  {
    active: "/InqueryLetters/Organization",
    for: ["/InqueryLetters/Organization/"],
  },
  {
    active: "/InqueryLetters/Inquery",
    for: ["/InqueryLetters/Inquery/"],
  },
  {
    active: "/ManageCartable/UnionTreasurerJobRequestCartable",
    for: ["/ManageRequests/TreasurerJobRequestslist/ConfirmUnion/"],
  },
  {
    active: "/ManageCartable/CountyTreasurerJobRequestCartable",
    for: ["/ManageRequests/TreasurerJobRequestslist/ConfirmCounty/"],
  },
  {
    active: "/ManageCartable/ProvinceTreasurerJobRequestCartable",
    for: ["/ManageRequests/TreasurerJobRequestslist/ConfirmProvince/"],
  },
  {
    active: "/ManageCartable/MainLocationTreasurerJobRequestCartable",
    for: ["/ManageRequests/TreasurerJobRequestslist/ConfirmMainLocation/"],
  },
  // secretariat
  {
    active: "/ManageCartable/UnionJobRequestCartable",
    for: [
      "/ManageRequests/SecretariatJobRequestslist/ConfirmUnion/",
      "/ManageRequests/SelectRequestInquiries/Union/",
      "/ManageRequests/NoticeRequestInquiryLetters/Union/",
      "/ManageRequests/SecretariatJobRequestslist/UploadUnionInquiry/",
      "/ManageRequests/SecretariatJobRequestslist/EditUnionInquiry/",
    ],
  },
  {
    active: "/ManageCartable/CountyJobRequestCartable",
    for: [
      "/ManageRequests/SecretariatJobRequestslist/ConfirmCounty/",
      "/ManageRequests/SelectRequestInquiries/County/",
      "/ManageRequests/NoticeRequestInquiryLetters/County/",
      "/ManageRequests/SecretariatJobRequestslist/UploadCountyInquiry/",
      "/ManageRequests/SecretariatJobRequestslist/EditCountyInquiry/",
    ],
  },
  {
    active: "/ManageCartable/ProvinceJobRequestCartable",
    for: [
      "/ManageRequests/SecretariatJobRequestslist/ConfirmProvince/",
      "/ManageRequests/SelectRequestInquiries/Province/",
      "/ManageRequests/NoticeRequestInquiryLetters/Province/",
      "/ManageRequests/SecretariatJobRequestslist/UploadProvinceInquiry/",
      "/ManageRequests/SecretariatJobRequestslist/EditProvinceInquiry/",
    ],
  },
  {
    active: "/ManageCartable/MainLocationJobRequestCartable",
    for: [
      "/ManageRequests/SecretariatJobRequestslist/ConfirmMainLocation/",
      "/ManageRequests/SelectRequestInquiries/MainLocation/",
      "/ManageRequests/NoticeRequestInquiryLetters/MainLocation/",
      "/ManageRequests/SecretariatJobRequestslist/UploadMainLocationInquiry/",
      "/ManageRequests/SecretariatJobRequestslist/EditMainLocationInquiry/",
    ],
  },
  {
    active: "/ManageRequests/MainLocationSecretariatJobRequestList",
    for: ["/ManageRequests/SecretariatJobRequestslist/MainLocation/"],
  },
  // manager
  {
    active: "/ManageRequests/ProvinceSecretariatJobRequestList",
    for: ["/ManageRequests/SecretariatJobRequestslist/Province/"],
  },
  {
    active: "/ManageRequests/CountySecretariatJobRequestList",
    for: ["/ManageRequests/SecretariatJobRequestslist/County/"],
  },
  {
    active: "/ManageRequests/UnionSecretariatJobRequestList",
    for: ["/ManageRequests/SecretariatJobRequestslist/Union/"],
  },
  {
    active: "/ManageRequests/MainLocationManagerJobRequestList",
    for: ["/ManageRequests/ManagerJobRequestslist/MainLocation/"],
  },
  {
    active: "/ManageRequests/MainLocationViceManagerJobRequestList",
    for: ["/ManageRequests/ViceManagerJobRequestslist/MainLocation/"],
  },
  {
    active: "/ManageRequests/MainLocationExecutiveManagerJobRequestList",
    for: ["/ManageRequests/ExecutiveManagerJobRequestslist/MainLocation/"],
  },
  {
    active: "/ManageRequests/ProvinceManagerJobRequestList",
    for: ["/ManageRequests/ManagerJobRequestslist/Province/"],
  },
  {
    active: "/ManageRequests/ProvinceViceManagerJobRequestList",
    for: ["/ManageRequests/ViceManagerJobRequestslist/Province/"],
  },
  {
    active: "/ManageRequests/ProvinceExecutiveManagerJobRequestList",
    for: ["/ManageRequests/ExecutiveManagerJobRequestslist/Province/"],
  },
  {
    active: "/ManageRequests/CountyManagerJobRequestList",
    for: ["/ManageRequests/ManagerJobRequestslist/County/"],
  },
  {
    active: "/ManageRequests/CountyViceManagerJobRequestList",
    for: ["/ManageRequests/ViceManagerJobRequestslist/County/"],
  },
  {
    active: "/ManageRequests/CountyExecutiveManagerJobRequestList",
    for: ["/ManageRequests/ExecutiveManagerJobRequestslist/County/"],
  },
  {
    active: "/ManageRequests/UnionManagerJobRequestList",
    for: ["/ManageRequests/ManagerJobRequestslist/Union/"],
  },
  {
    active: "/ManageRequests/UnionViceManagerJobRequestList",
    for: ["/ManageRequests/ViceManagerJobRequestslist/Union/"],
  },
  {
    active: "/ManageRequests/UnionExecutiveManagerJobRequestList",
    for: ["/ManageRequests/ExecutiveManagerJobRequestslist/Union/"],
  },
  // request from user
  {
    active: "/Requests/MainLocationJobRequest/List",
    for: ["/Requests/job/MainLocation/", "/Requests/editjob/MainLocation/"],
  },
  {
    active: "/Requests/ProvinceJobRequest/List",
    for: ["/Requests/job/Province/", "/Requests/editjob/Province/"],
  },
  {
    active: "/Requests/CountyJobRequest/List",
    for: ["/Requests/job/County/", "/Requests/editjob/County/"],
  },
  {
    active: "/Requests/UnionJobRequest/List",
    for: ["/Requests/job/Union/", "/Requests/editjob/Union/"],
  },
  {
    active: "/ManageRequests/SecretariatJobRequestslist",
    for: ["/ManageRequests/SecretariatJobRequestslist"],
  },

  {
    active: "/GuildsActivation/CountySecretariatCartable",
    for: ["/GuildsActivation/CountySecretariat/Confirm/"],
  },
  {
    active: "/GuildsActivation/ProvinceSecretariatCartable",
    for: ["/GuildsActivation/ProvinceSecretariat/Confirm/"],
  },
  {
    active: "/GuildsActivation/CountySecretariatGuildActivation",
    for: ["/GuildsActivation/CountySecretariat/Details/"],
  },
  {
    active: "/GuildsActivation/ProvinceSecretariatGuildActivation",
    for: ["/GuildsActivation/ProvinceSecretariat/Details/"],
  },
  {
    active: "/GuildsActivation/ProvinceItManagerCartable",
    for: ["/GuildsActivation/ProvinceItManager/Confirm/"],
  },
  {
    active: "/GuildsActivation/CountyItManagerCartable",
    for: ["/GuildsActivation/CountyItManager/Confirm/"],
  },
  {
    active: "/GuildsActivation/CountyManagerCartable",
    for: ["/GuildsActivation/CountyManager/Confirm/"],
  },
  {
    active: "/GuildsActivation/CountyViceManagerCartable",
    for: ["/GuildsActivation/CountyViceManager/Confirm/"],
  },
  {
    active: "/GuildsActivation/CountyExecutiveManagerCartable",
    for: ["/GuildsActivation/CountyExecutiveManager/Confirm/"],
  },
  {
    active: "/GuildsActivation/CountyManagerGuildActivation",
    for: ["/GuildsActivation/CountyManager/Details/"],
  },
  {
    active: "/GuildsActivation/CountyViceManagerGuildActivation",
    for: ["/GuildsActivation/CountyViceManager/Details/"],
  },
  {
    active: "/GuildsActivation/CountyExecutiveManagerGuildActivation",
    for: ["/GuildsActivation/CountyExecutiveManager/Details/"],
  },

  {
    active: "/GuildsActivation/ProvinceManagerCartable",
    for: ["/GuildsActivation/ProvinceManager/Confirm/"],
  },
  {
    active: "/GuildsActivation/ProvinceViceManagerCartable",
    for: ["/GuildsActivation/ProvinceViceManager/Confirm/"],
  },
  {
    active: "/GuildsActivation/ProvinceExecutiveManagerCartable",
    for: ["/GuildsActivation/ProvinceExecutiveManager/Confirm/"],
  },
  {
    active: "/GuildsActivation/ProvinceManagerGuildActivation",
    for: ["/GuildsActivation/ProvinceManager/Details/"],
  },
  {
    active: "/GuildsActivation/ProvinceViceManagerGuildActivation",
    for: ["/GuildsActivation/ProvinceViceManager/Details/"],
  },
  {
    active: "/GuildsActivation/ProvinceExecutiveManagerGuildActivation",
    for: ["/GuildsActivation/ProvinceExecutiveManager/Details/"],
  },

  {
    active: "/UnionsActivation/UnionManagerCartable",
    for: ["/UnionsActivation/UnionManager/Confirm/"],
  },
  {
    active: "/UnionsActivation/UnionViceManagerCartable",
    for: ["/UnionsActivation/UnionViceManager/Confirm/"],
  },
  {
    active: "/UnionsActivation/UnionExecutiveManagerCartable",
    for: ["/UnionsActivation/UnionExecutiveManager/Confirm/"],
  },
  {
    active: "/UnionsActivation/UnionManagerGuildActivation",
    for: ["/UnionsActivation/UnionManager/Details/"],
  },
  {
    active: "/UnionsActivation/UnionViceManagerGuildActivation",
    for: ["/UnionsActivation/UnionViceManager/Details/"],
  },
  {
    active: "/UnionsActivation/UnionExecutiveManagerGuildActivation",
    for: ["/UnionsActivation/UnionExecutiveManager/Details/"],
  },
  {
    active: "/UnionsActivation/UnionSecretariatCartable",
    for: [
      "/UnionsActivation/UnionSecretariat/Confirm/",
      "/UnionsActivation/UnionSecretariat/Details/",
    ],
  },
  {
    active: "/UnionsActivation/UnionSecretariatGuildActivation",
    for: ["/UnionsActivation/UnionSecretariat/Details/"],
  },

  {
    active: "/UnionsRequests/Union/List",
    for: ["/UnionsActivation/Union/"],
  },
  {
    active: "/GuildsRequests/County/List",
    for: ["/GuildsActivation/County/"],
  },
  {
    active: "/GuildsRequests/Province/List",
    for: ["/GuildsActivation/Province/"],
  },
  {
    active: "/License/List",
    for: ["/License/Issued/"],
  },

  {
    active: "/ManageLicense/IssuingResponsible/MyCartable",
    for: [
      "/ManageLicense/IssuingResponsible/Matching/",
      "/ManageLicense/IssuingResponsible/ConfirmDocuments/",
      "/ManageLicense/IssuingResponsible/FacilityAndOperationLicense/",
      "/IssueingResponsible/Inspection/",
      "/ManageLicense/IssuingResponsible/Cartable/DetailsRequest/",
      "/ManageLicense/IssuingResponsible/SetDistrictResult",
      "/ManageLicense/IssuingResponsible/Cartable/Cancellation",
    ],
  },
  {
    active: "/ManageLicense/JahadCenterManager/MyCartable",
    for: [
      "/ManageLicense/JahadCenter/Cartable/SendJahadIdea/",
      "/ManageLicense/JahadCenter/Cartable/DetailsRequest/",
      "/JahadCenterManager/Inspection/",
    ],
  },
  {
    active: "/ManageLicense/IssuingResponsible/AllRequests",
    for: ["/ManageLicense/IssuingResponsible/DetailsRequest/"],
  },
  { active: "/Land/SetCountyPolygon/Track", for: ["/Land/SetCountyPolygon/"] },
  {
    active: "/JahadCenter",
    for: ["/JahadCenter/Users/"],
  },
  {
    active: "/ManageLicense/IssuingManager/MyCartable",
    for: ["/ManageLicense/IssuingManager/DetailsRequest/"],
  },
  {
    active: "/ManageLicense/MyCartable",
    for: [
      "/License/SetPrimaryInfo/Issued/",
      "/ManageLicense/Expert/RequestDetails/",
      "/Inspection",
      "/License/Land/",
    ],
  },
  {
    active: "/ManageLicense/Secreteriat/MyCartable/",
    for: ["/ManageLicense/Secreteriat/Cartable/DetailsRequest/"],
  },
  {
    active: "/ManageLicense/Secreteriat/AllRequests",
    for: ["/ManageLicense/Secreteriat/DetailsRequest/"],
  },
  {
    active: "/ManageLicense/UnionManager/MyCartable",
    for: ["/ManageLicense/UnionManager/DetailsRequest/"],
  },
  {
    active: "/BasicInformation/Products/ProductsCategory",
    for: ["/BasicInformation/Products/ProductsCategory/"],
  },
  {
    active: "/BasicInformation/FieldJob/Document/Issued",
    for: ["/BasicInformation/FieldJob/Document/Cancellation"],
  },

  {
    active: "/Guilds/province",
    for: ["/GuildsDetails/Province"],
  },
  {
    active: "/Guilds/county",
    for: ["/GuildsDetails/County"],
  },
  {
    active: "/Unions/",
    for: ["/UnionsDetails/Union"],
  },
  {
    active: "/GuildsDetails/MainLocation/RegisteryDocs",
    for: ["/GuildsDetails/MainLocation"],
  },

  {
    active: "/PersonalInfo/PersonalDocuments",
    for: [
      "/PersonalInfo/PersonalDocuments",
      "/PersonalInfo/CancellationDocuments",
    ],
  },
  {
    active: "/MyLicense",
    for: [
      "/MyLicense/Cancellation/CancellationReason/New",
      "/MyLicense/Cancellation/CancellationReason",
    ],
  },
  {
    active: "/ChangeUserInfoManagement/IssuingResponsible/list",
    for: ["/ChangeUserInfoManagement/IssuingResponsible/Details/"],
  },
  {
    active: "/ChangeUserInfoManagement/UnionManager/list",
    for: ["/ChangeUserInfoManagement/UnionManager/Details/"],
  },
  {
    active: "/ChangePersonalInfo/List",
    for: ["/ChangePersonalInfo/Request/"],
  },
];
