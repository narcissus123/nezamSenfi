import { IdentityChangeStatusEnum } from "../enums/identity-change-status.enum";
import { FullOptionSel } from "../models";

export const IdentityChangeStatusData: FullOptionSel[] = [
  {
    label: "انتخاب کنید...",
    options: [
      {
        value: IdentityChangeStatusEnum.WatingForUploadDocunet,
        label: "در مرحله بارگزاری اسناد هویتی جدید",
      },
      {
        value: IdentityChangeStatusEnum.InvestigatingByIssuingResponsible,
        label: "در مرحله بررسی توسط مسئول صدور",
      },
      {
        value: IdentityChangeStatusEnum.WatingForPayment,
        label: "در انتظار پرداخت",
      },
      {
        value: IdentityChangeStatusEnum.Rejectd,
        label: "رد درخواست  تغییرات اطلاعات هویتی",
      },
      {
        value: IdentityChangeStatusEnum.Done,
        label: "ثبت تغیییرات با موفقیت انجام شد",
      },
    ],
  },
];

//         [Description("در مرحله بارگزاری اسناد هویتی جدید")]
//         WatingForUploadDocunet=1,
//         [Description("در مرحله بررسی توسط مسئول صدور")]
//         InvestigatingByIssuingResponsible =2,
//         [Description("در انتظار پرداخت")]
//         WatingForPayment =3,
//         [Description("رد درخواست  تغییرات اطلاعات هویتی")]
//         Rejectd=4,
//         [Description("ثبت تغیییرات با موفقیت انجام شد")]
//         Done=5