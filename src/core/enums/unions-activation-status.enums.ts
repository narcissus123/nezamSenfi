export enum UnionsActivation {
  AddedDocument = 1,
  AddedMember = 2,
  AddedLocation = 3,
  AddedSubcategoryJobs = 4,
  WaitingForSecretariat = 5,
  InvestigationBySecretariat = 6,
  RjectedBySecretariat = 7,
  AcceptedBySecretariat = 8,
  ApplyBySecretariat = 9,
  WaitingForITManger = 10,
  Finish = 11,
  RejectAndFnish = 12,
}

// public enum UnionRequestStatusEnum
//     {
//         [Description("ثبت اسناد ثبتی شرکت و در  انتظار ثبت اعضا")]
//         AddedDocument = 1,
//         [Description("ثبت اعضا و در انتظار ثبت مشخصات مکانی")]
//         AddedMember = 2,
//         [Description("ثبت مشخصات مکانی  و در انتظار ارسال ثبت مشاغل زیر مجموعه")]
//         AddedLocation = 3,
//         [Description("ثبت مشاغل زیر مجموعه  و در انتظار ارسال نهایی")]
//         AddedSubcategoryJobs = 4,
//         [Description("ثبت مشاغل زیر مجموعه و انتظار پذیرش توسط دبیرخانه")]
//         WaitingForSecretariat = 5,
//         [Description("در مرحله بررسی و تطبیق توسظ دبیرخانه")]
//         InvestigationBySecretariat = 6,
//         [Description("رد در خواست توسط دبیرخانه و در انتظار ویرایش اطلاعات")]
//         RjectedBySecretariat = 7,
//         [Description("تایید درخواست توسط دبیرخانه و در انتظار نظر مدیر")]
//         AcceptedBySecretariat = 8,
//         [Description("در انتظار اعمال نظر مدیر توسط دبیرخانه")]
//         ApplyBySecretariat = 9,
//         [Description("تایید توسط دبیرخانه و در انتظار فعال سازی توسط فناوری اطلاعات کشور")]
//         WaitingForITManger = 10,
//         [Description("فعال سازی و پایان کار")]
//         Finish = 11,
//         [Description("رد درخواست به دلیل تکرار بالای درخواست")]
//         RejectAndFnish = 12,
//     }
