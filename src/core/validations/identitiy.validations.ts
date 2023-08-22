import { CheckMaximumDate } from "./../utils/date-helper.utils";
import {
  isLimitedNumberRegex,
  isPersian,
  isNumberRegex,
  isPersianNullable,
} from "./../utils/regex.utils";
import * as Yup from "yup";

// function isValidIranianNationalCode(input: any) {
//   if (!/^\d{10}$/.test(input)) return false;

//   var check = +input[9];
//   var sum = 0;
//   var i;
//   for (i = 0; i < 9; ++i) {
//     sum += +input[i] * (10 - i);
//   }
//   sum %= 11;

//   return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
// }

export const IdentityValidate = Yup.object().shape({
  maritalStatus: Yup.object()
    .test("", "یک گزینه انتخاب کنید", (obj: any) => obj.value > 0)
    .required()
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  countOfBoyChilds: Yup.number().when(
    "maritalStatus",
    (marital: any, schema: any) => {
      return marital.value <= 1
        ? schema
        : schema
            .min(0, "تعداد پسر کمتر از صفر نمی تواند باشد")
            .required("تعداد پسر وارد شود")
            .typeError("لطفا تعداد پسر را وارد کنید");
    }
  ),
  countOfGirlChilds: Yup.number().when(
    "maritalStatus",
    (marital: any, schema: any) => {
      return marital.value <= 1
        ? schema
        : schema
            .min(0, "تعداد دختر کمتر از صفر نمی تواند باشد")
            .required("تعداد دختر وارد شود")
            .typeError("لطفا تعداد دختر را وارد کنید");
    }
  ),
  gender: Yup.object()
    .test("", "یک گزینه انتخاب کنید", (obj: any) => obj.value > 0)
    .required()
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  dutySystemState: Yup.object().when("gender", (gender: any, schema: any) => {
    return gender.value <= 1
      ? schema
      : schema
          .test("", "یک گزینه انتخاب کنید", (obj: any) => obj.value > 0)
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
  }),
  dutyEndCartNumber: Yup.string().when(
    ["gender", "dutySystemState"],
    (gender: any, dutySystemState: any, schema: any) => {
      if (gender.value <= 1 || dutySystemState.value < 2)
        return schema
          .nullable()
          .typeError("لطفا شماره کارت پایان خدمت را وارد کنید");
      else
        return schema
          .matches(isNumberRegex(), "بايد عدد وارد شود")
          .min(1)
          .max(99999999999)
          .required("لطفا شماره کارت پايان خدمت را وارد کنيد")
          .typeError("لطفا شماره کارت پایان خدمت را وارد کنید");
    }
  ),
  educationLevel: Yup.object()
    .test("", "یک گزینه انتخاب کنید", (obj: any) => obj.value > 0)
    .required("یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  educationFiled: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when("educationLevel", (educationLevel: any, schema: any) => {
      return educationLevel.value < 7
        ? schema
            .required("لطفا یک گزینه را انتخاب کنید")
            .typeError("لطفا یک گزینه را انتخاب کنید")
        : schema
            .nullable()
            .notRequired()
            .typeError("لطفا رشته خود را انتخاب کنید");
    }),
  idNumber: Yup.string()
    .matches(isLimitedNumberRegex(1, 10), "شماره شناسنامه صحیح نیست")
    .required("شماره شناسنامه نباید خالی باشد")
    .typeError("شماره شناسنامه نباید خالی باشد"),
  meli: Yup.string()
    .matches(isLimitedNumberRegex(10, 10), "کد ملی صحیح نیست")
    .required("کد ملی نباید خالی باشد")
    .typeError("لطفا کد ملی را درست وارد کنید"),
  name: Yup.string()
    .required("نام نباید خالی باشد")
    .matches(isPersian(), "نام را درست وارد کنید")
    .typeError("لطفا نام را درست وارد کنید"),
  lastName: Yup.string()
    .required("نام خانوادگی نباید خالی باشد")
    .matches(isPersian(), "نام خانوادگی را درست وارد کنید")
    .typeError("لطفا نام خانوادگی را درست وارد کنید"),
  fathersName: Yup.string()
    .required("نام پدر نباید خالی باشد")
    .matches(isPersian(), "نام پدر را درست وارد کنید")
    .typeError("نام پدر نباید خالی باشد"),
  birthDate: Yup.string()
    .required(" تاریخ تولد نباید خالی باشد")
    .test("birthDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val)
    )
    .typeError("تاریخ تولد را انتخاب کنید"),
  dutyEndCartDate: Yup.string()
    .notRequired()
    .nullable()
    .test("birthDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val, true)
    )
    .typeError("تاریخ را درست انتخاب کنید"),
  idIssuePlace: Yup.string()
    .matches(isPersianNullable(), "لطفا محل صدور را درست وارد کنید")
    .notRequired()
    .nullable(),
});

export const LegalIdentityValidate = Yup.object().shape({
  companyType: Yup.object()
    .test("", "یک گزینه انتخاب کنید", (obj: any) => obj.value > 0)
    .required()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  registrationNumber: Yup.string()
    .matches(isNumberRegex(), "شماره ثبت را درست وارد کنید")
    .required("شماره ثبت نباید خالی باشد")
    .typeError("شماره ثبت نباید خالی باشد"),
  name: Yup.string()
    .required("نام شرکت نباید خالی باشد")
    .typeError("نام شرکت را درست وارد کنید"),
  nationalId: Yup.string()
    .matches(isLimitedNumberRegex(11, 11), "شناسه ملی 11 رقمی است")
    .required("شناسه ملی نمی تواند خالی باشد")
    .typeError("شناسه ملی نباید خالی باشد"),
  economicCode: Yup.string()
    .matches(isLimitedNumberRegex(12, 12), "کد اقتصادی را درست وارد کنید")
    .required("کد اقتصادی نباید خالی باشد")
    .typeError("کد اقتصادی نباید خالی باشد"),
  companyRegistrationDate: Yup.string()
    .required("تاریخ را وارد کنید")
    .test("birthDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val)
    )
    .typeError("تاریخ را وارد کنید"),
  companyRegistrationPlace: Yup.string()
    .required("محل ثبت شرکت را وارد کنید")
    .typeError("محل ثبت شرکت را وارد کنید"),
});
