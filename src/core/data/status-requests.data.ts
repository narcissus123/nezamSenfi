import { JobRequestStatus } from "../enums/job-request-status";

export const statusTypeRequest = [
  {
    label: "یک وضعیت را انتخاب کنید",
    options: [
      {
        value: JobRequestStatus.Archived,
        label: "بایگانی توسط دبیرخانه و توقف کار",
      },
      {
        value: JobRequestStatus.MatchAndModifyLetters,
        label:
          "بارگزاری پاسخ استعلامات و در مرحله تطبیق و اصلاح نامه ها توسط دبیرخانه ",
      },
      {
        value: JobRequestStatus.ConfirmByManager,
        label: "تایید توسط مدیر  و در انتظار نامه استعلامات توسط دبیر خانه",
      },
      {
        value: JobRequestStatus.WaitingForPayment,
        label: "تایید اصل نامه ها و در انتظار پرداخت",
      },
      {
        value: JobRequestStatus.RejectInquiryLetters,
        label: "عدم تایید اصل نامه ها و بایگانی توسط دبیرخانه ",
      },

      {
        value: JobRequestStatus.InvestigationByManager,
        label: "در مرحله ی بررسی توسط مدیر",
      },
      {
        value: JobRequestStatus.InvestigationBySecretariat,
        label: "در مرحله بررسی توسط دبیرخانه",
      },
      {
        value: JobRequestStatus.LettersOfInquiriesBySecretariat,
        label:
          "اعلان نامه های استعلام توسط دبیر خانه و در انتظار بارگزاری پاسخ استعلامات توسط متقاضی",
      },

      {
        value: JobRequestStatus.RejectBySecretariat,
        label: "اعلان نقص توسط دبیرخانه",
      },
      {
        value: JobRequestStatus.ResumeFile,
        label: "درخواست شغل و در مرحله ی بارگزاری رزومه",
      },
      {
        value: JobRequestStatus.SendInquiryLetterBySecretariat,
        label:
          "ارسال نامه ی استعلامات مورد نیاز توسط دبیرخانه به مدیر  و در انتظار تایید و امضای نامه",
      },
      {
        value: JobRequestStatus.SignAndConfirmInquirylettersByManager,
        label:
          "امضا و تایید نامه ی استعلامات توسط مدیر و در انتظار اعلان نامه توسط دبیرخانه",
      },
      {
        value: JobRequestStatus.UploadInquiryResponseLetters,
        label:
          "بارگزاری پاسخ استعلامات و در انتظار حضور در اتحادیه و تحویل اصل مدارک",
      },
      {
        value: JobRequestStatus.VisitedByApplicantUser,
        label: "عدم پذیرش توسط مدیر و در مرحله بایگانی توسط دبیرخانه",
      },
      {
        value: JobRequestStatus.WattingForSelectBySecretariat,
        label: "بارگزاری رزومه و در انتظار پذیرش توسط دبیرخانه",
      },
      {
        value: JobRequestStatus.ConfirmPayment,
        label: "در انتظار بررسی توسط مدیر",
      },
      {
        value: JobRequestStatus.SettingPresentDate,
        label: "در انتظار اعلان زمان حضور  توسط دبیرخانه",
      },
      {
        value: JobRequestStatus.ConfirmByUpManager,
        label: "تایید درخواست توسط مدیر و در مرحله بررسی توسط اتاق صنف  ",
      },
      {
        value: JobRequestStatus.GiveMoneyBackAndWatingForArchive,
        label: "رد درخواست و برگشت مالی و در مرحله بایگانی ",
      },
      {
        value: JobRequestStatus.WaitingForAttachmentsAndGuarantors,
        label: "در انتظار حضور درخواست کننده",
      },
      {
        value: JobRequestStatus.WaitingForSignatureAndArchive,
        label: "در انتظار امضای قرارداد و تفکیک و بایگانی",
      },
      {
        value: JobRequestStatus.FinishSuccessfully,
        label: "دریافت کد پرسنلی و پایان کار",
      },
    ],
  },
];
