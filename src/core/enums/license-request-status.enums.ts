export enum LicenseRequestStatusEnum {
  LicenseRequestAndWaitingForPayment = 1,
  ChoosingExpert = 2,
  WaitingForExpert = 3,
  ChoosingExpertAgain = 4,
  SetingLicenseRequestVisitDate = 5,
  AcceptingAfterVisit = 6,
  AcceptedAndSetPrimaryInformation = 7,
  Expertise = 8,
  WaitingForIssuingResponsible = 10,
  Matching = 11,
  //WatingForDistrictCourt = 11,
  WattingForRequestOriginalDocuments = 12,
  WattingForGetOriginalDocuments = 13,
  AcceptedDoucumnets = 14,
  WatingForJahadInvastigation = 15,
  WatingForIssuingResponsibleConformationOfJahadIdea = 16,
  WatingForIssuingResponsibleRejectionOfJahadIdea = 17,
  WaitingForPaymentAfterMatching = 18,
  CanNotIssuingLicense = 19,
  Cansel = 20,
  WattingForIssuingManagerAfterPay = 21,
  // WattingForSecreteriatSelect = 22,
  //WattingForGuildId = 23,
  GuildIdHasSet = 24,
  WaitingForUploadDocumentsByApplicant = 25,



  // region Cansellation
  CancellationRequestUpload = 100,
  CancellationPayment = 101,
  CancellationInvestigationbyIssuingResponsible = 102,
  CancellationConfirmationByIssuingManager = 103,
  CancellationUpdateDocument = 104,

  CancellationRejected = 105,
  CancellationSettingNumebrAndDateBySecratriate = 106,
  Cancel = 107,
  // #region Cansellation
}




  // [Description("درخواست پروانه و درانتظار پرداخت")]
  // LicenseRequestAndWaitingForPayment = 1,

  // [Description("پرداخت و مرحله انتخاب کارشناس")]
  // ChoosingExpert = 2,

  // [Description(" مرحله پذیرش توسط کارشناس")]
  // WaitingForExpert = 3,

  // [Description("عدم پذیرش توسط کارشناس و در مرحله انتخاب مجدد کارشناس")]
  // ChoosingExpertAgain = 4,

  // [Description("پذیرش توسط کارشناس و در مرحله اعلام قرار بازدید")]
  // SetingLicenseRequestVisitDate = 5,

  // [Description("اعلام قرار بازدید و انجام و تایید بازدید")]
  // AcceptingAfterVisit = 6,

  // [Description("انجام و تایید بازدید و  در مرحله ی ثبت اطلاعات اولیه ")]
  // AcceptedAndSetPrimaryInformation = 7,

  // [Description("کارشناسی")]
  // Expertise = 8,

  // #region Matching

  // [Description("در انتظار انتخاب توسط مسئول صدور")]
  // WaitingForIssuingResponsible = 10,

  // [Description("در مرحله تطبیق اطلاعات")]
  // Matching = 11,

  // //[Description("در انتظار نظر هیات بدوی")]
  // //WatingForDistrictCourt = 11,

  // [Description("تایید پیشنویس و در انتظار درخواست اصل مدرک")]
  // WattingForRequestOriginalDocuments = 12,

  // [Description("در انتظار دریافت اصل مدارک")]
  // WattingForGetOriginalDocuments = 13,

  // [Description("تایید مدارک و در انتظار ثبت پروانه تاسیسات و بهره برداری ")]
  // AcceptedDoucumnets = 14,

  // [Description("ارسال برای جهاد و در انتظار نظر جهاد")]
  // WatingForJahadInvastigation = 15,

  // [Description("تیت مشخصات توسط جهاد و در انتظار تایید توسط مسئول صدور")]
  // WatingForIssuingResponsibleConformationOfJahadIdea = 16,

  // [Description("رد مشخصات توسط جهاد و در انتظار رد مسئول صدور")]
  // WatingForIssuingResponsibleRejectionOfJahadIdea = 17,

  // #endregion Matching

  // [Description("در انتظار پرداخت بعد از تطبیق")]
  // WaitingForPaymentAfterMatching = 18,

  // [Description("عدم امکان صدور پروانه")]
  // CanNotIssuingLicense = 19,

  // [Description("ابطال")]
  // Cansel = 20,

  // [Description("در انتظار تایید بعد از پرداخت")]
  // WattingForIssuingManagerAfterPay = 21,

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
