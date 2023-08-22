import { LicenseRequestStatusEnum } from "../enums/license-request-status.enums";

export const LicenseRequestStatusData = [
  {
    label: "یک وضعیت را انتخاب کنید",
    options: [
      {
        value: LicenseRequestStatusEnum.LicenseRequestAndWaitingForPayment,
        label: "درخواست پروانه و درانتظار پرداخت",
      },
      {
        value: LicenseRequestStatusEnum.ChoosingExpert,
        label: "پرداخت و مرحله انتخاب کارشناس",
      },
      {
        value: LicenseRequestStatusEnum.WaitingForExpert,
        label: "مرحله پذیرش توسط کارشناس",
      },
      {
        value: LicenseRequestStatusEnum.ChoosingExpertAgain,
        label: "عدم پذیرش توسط کارشناس و در مرحله انتخاب مجدد کارشناس",
      },
      {
        value: LicenseRequestStatusEnum.SetingLicenseRequestVisitDate,
        label: "پذیرش توسط کارشناس و در مرحله اعلام قرار بازدید",
      },
      {
        value: LicenseRequestStatusEnum.AcceptingAfterVisit,
        label: "اعلام قرار بازدید و انجام و تایید بازدید",
      },
      {
        value: LicenseRequestStatusEnum.AcceptedAndSetPrimaryInformation,
        label: "انجام و تایید بازدید و  در مرحله ی ثبت اطلاعات اولیه ",
      },
      {
        value: LicenseRequestStatusEnum.Expertise,
        label: "کارشناسی",
      },
      {
        value: LicenseRequestStatusEnum.WaitingForIssuingResponsible,
        label: "در انتظار انتخاب توسط مسئول صدور",
      },
      {
        value: LicenseRequestStatusEnum.Matching,
        label: "در مرحله تطبیق اطلاعات",
      },
      {
        value: LicenseRequestStatusEnum.WaitingForUploadDocumentsByApplicant,
        label: "در انتظار نظر هیات بدوی",
      },
      {
        value: LicenseRequestStatusEnum.WattingForRequestOriginalDocuments,
        label: "در انتظار تکمیل مدارک توسط درخواست دهنده",
      },
      {
        value: LicenseRequestStatusEnum.WattingForGetOriginalDocuments,
        label: "در انتظار دریافت اصل اسناد",
      },
      {
        value: LicenseRequestStatusEnum.AcceptedDoucumnets,
        label: "تایید اسناد و در انتظار ثبت پروانه تاسیسات و بهره برداری",
      },
      {
        value: LicenseRequestStatusEnum.WatingForJahadInvastigation,
        label: "ارسال برای جهاد و در انتظار نظر جهاد",
      },
      {
        value:
          LicenseRequestStatusEnum.WatingForIssuingResponsibleConformationOfJahadIdea,
        label: "تیت مشخصات توسط جهاد و در انتظار تایید توسط مسئول صدور",
      },
      {
        value:
          LicenseRequestStatusEnum.WatingForIssuingResponsibleRejectionOfJahadIdea,
        label: "رد مشخصات توسط جهاد و در انتظار رد مسئول صدور",
      },
      {
        value: LicenseRequestStatusEnum.WaitingForPaymentAfterMatching,
        label: "در انتظار پرداخت بعد از تطبیق",
      },
      {
        value: LicenseRequestStatusEnum.CanNotIssuingLicense,
        label: "عدم امکان صدور پروانه",
      },
      {
        value: LicenseRequestStatusEnum.Cansel,
        label: "ابطال",
      },
      {
        value: LicenseRequestStatusEnum.WattingForIssuingManagerAfterPay,
        label: "در انتظار تایید بعد از پرداخت",
      },

      // {
      //   value: LicenseRequestStatusEnum.WattingForSecretariatToSelect,
      //   label: "در انتظار انتخاب توسط دبیر خانه",
      // },
      // {
      //   value: LicenseRequestStatusEnum.WattingForGuildId,
      //   label: "در انتظار صدور شناسه صنفی توسط دبیر خانه",
      // },
      {
        value: LicenseRequestStatusEnum.GuildIdHasSet,
        label: "شناسه صنفی ثبت شده ",
      },
      {
        value: LicenseRequestStatusEnum.WaitingForUploadDocumentsByApplicant,
        label: "در انتظار تکمیل مدارک توسط درخواست دهنده",
      },

      {
        value: LicenseRequestStatusEnum.CancellationRequestUpload,
        label: "در انتظار آپلود",
      },
      {
        value: LicenseRequestStatusEnum.CancellationPayment,
        label: "درانتظار پرداخت هزینه ی ابطال",
      },
      {
        value:
          LicenseRequestStatusEnum.CancellationInvestigationbyIssuingResponsible,
        label: "در انتظار بررسی توسط مسئول صدور",
      },
      {
        value:
          LicenseRequestStatusEnum.CancellationConfirmationByIssuingManager,
        label: "در انتظار تایید توسط مدیر صدور",
      },
      {
        value: LicenseRequestStatusEnum.CancellationUpdateDocument,
        label: "در انتظار ویرایش اسناد",
      },
      {
        value: LicenseRequestStatusEnum.CancellationRejected,
        label: "رد درخواست ابطال",
      },

      {
        value:
          LicenseRequestStatusEnum.CancellationSettingNumebrAndDateBySecratriate,
        label: "در انتظار ثبت ابطال در دبیرخانه",
      },

      {
        value: LicenseRequestStatusEnum.Cancel,
        label: "ابطال",
      },
    ],
  },
];




// //[Description("در انتظار انتخاب توسط دبیر خانه")]
  // //WattingForSecretariatToSelect = 22,

  // //[Description("در انتظار صدور شناسه صنفی توسط دبیر خانه")]
  // //WattingForGuildId = 23,

  // [Description("شناسه صنفی ثبت شده ")]
  // GuildIdHasSet = 24,
  // [Description("در انتظار تکمیل مدارک توسط درخواست دهنده")]
  // WaitingForUploadDocumentsByApplicant = 25,

  // #region Cansellation

  // [Description("در انتظار آپلود")]
  // CancellationRequestUpload = 100,

  // [Description("درانتظار پرداخت هزینه ی ابطال")]
  // CancellationPayment = 101,

  // [Description("در انتظار بررسی توسط مسئول صدور")]
  // CancellationInvestigationbyIssuingResponsible = 102,

  // [Description("در انتظار تایید توسط مدیر صدور")]
  // CancellationConfirmationByIssuingManager = 103,

  // [Description("در انتظار ویرایش اسناد ")]
  // CancellationUpdateDocument = 104,

  // [Description("رد درخواست ابطال")]
  // CancellationRejected = 105,

  // [Description("در انتظار ثبت ابطال در دبیرخانه")]
  // CancellationSettingNumebrAndDateBySecratriate = 106,

  // [Description("ابطال")]
  // Cancel = 107,
