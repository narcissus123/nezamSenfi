export enum JobRequestStatus {
  ResumeFile = 1,
  WattingForSelectBySecretariat = 2,
  InvestigationBySecretariat = 3,
  RejectBySecretariat = 4,
  InvestigationByManager = 5,
  //RejectByManager = 6,
  VisitedByApplicantUser = 7,
  Archived = 8,
  ConfirmByManager = 9,
  SendInquiryLetterBySecretariat = 10,
  SignAndConfirmInquirylettersByManager = 11,
  LettersOfInquiriesBySecretariat = 12,
  UploadInquiryResponseLetters = 13,
  MatchAndModifyLetters = 14,
  WaitingForPayment = 15,
  RejectInquiryLetters = 16,
  ConfirmPayment = 17,
  SettingPresentDate = 18,
  ConfirmByUpManager = 19,
  GiveMoneyBackAndWatingForArchive = 20,
  WaitingForAttachmentsAndGuarantors = 21,
  WaitingForSignatureAndArchive = 22,
  FinishSuccessfully = 23,
}

// public enum PositionRequestStatusEnum
//     {
//         [Description("درخواست شغل و در مرحله ی بارگزاری رزومه")]
//         ResumeFile = 1,
//         [Description("بارگزاری رزومه و در انتظار پذیرش توسط دبیرخانه")]
//         WattingForSelectBySecretariat = 2,
//         [Description("در مرحله بررسی توسط دبیرخانه")]
//         InvestigationBySecretariat = 3,
//         [Description("اعلان نقص توسط دبیرخانه")]
//         RejectBySecretariat = 4,
//         [Description("در مرحله ی بررسی توسط مدیر ")]
//         InvestigationByManager = 5,
//         [Description("عدم پذیرش توسط مدیر و در مرحله بایگانی توسط دبیرخانه")]
//         VisitedByApplicantUser = 7,
//         [Description("بایگانی توسط دبیرخانه و توقف کار")]
//         Archived = 8,
//         [Description("تایید توسط مدیر  و در انتظار نامه استعلامات توسط دبیر خانه ")]
//         ConfirmByManager = 9,
//         [Description("ارسال نامه ی استعلامات مورد نیاز توسط دبیرخانه به مدیر  و در انتظار تایید و امضای نامه")]
//         SendInquiryLetterBySecretariat = 10,
//         [Description("امضا و تایید نامه ی استعلامات توسط مدیر")]
//         SignAndConfirmInquirylettersByManager = 11,
//         [Description("اعلان نامه های استعلام توسط دبیر خانه ")]
//         LettersOfInquiriesBySecretariat = 12,
//         /// <summary>
//         /// استفاده نشده است در مایگیرشن بعدی حذف شود.
//         /// </summary>
//         [Description("بارگزاری پاسخ استعلامات و در انتظار حضور در اتحادیه و تحویل اصل اسناد  ")]
//         UploadInquiryResponseLetters = 13,
//         [Description("بارگزاری پاسخ استعلامات و در مرحله تطبیق و اصلاح نامه ها توسط دبیرخانه ")]
//         MatchAndModifyLetters = 14,
//         [Description("تایید اصل نامه ها و در انتظار پرداخت ")]
//         WaitingForPayment = 15,
//         [Description("عدم تایید اصل نامه ها و در انتظار بایگانی")]
//         RejectInquiryLetters = 16,
//         [Description("در انتظار بررسی توسط مدیر")]
//         ConfirmPayment = 17,
//         [Description(" در انتظار اعلان زمان حضور  توسط دبیرخانه")]
//         SettingPresentDate = 18,
//         [Description("تایید درخواست توسط مدیر و در مرحله بررسی توسط اتاق صنف  ")]
//         ConfirmByUpManager = 19,
//         [Description("رد درخواست و برگشت مالی و در مرحله بایگانی ")]
//         GiveMoneyBackAndWatingForArchive = 20,
//         /// <summary>
//         /// بعد از این مرحله به امضای قرارداد و بایگانی می رود و سپس  برابیش شماره پرسنلی ایجاد می شود و پایان کار با موفقیت انجام می شود
//         /// </summary>
//         [Description("در انتظار حضور درخواست کننده")]
//         WaitingForAttachmentsAndGuarantors = 21,
//         [Description("در انتظار امضای قرارداد و تفکیک و بایگانی ")]
//         WaitingForSignatureAndArchive = 22,
//         [Description("دریافت کد پرسنلی و پایان کار ")]
//         FinishSuccessfully = 23
//     }
