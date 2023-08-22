import { isPersian } from "./../utils/regex.utils";
import * as Yup from "yup";
import { PersianToEnglish } from "../utils/persian-to-english-number.utils";

export const checkNumber = (value: string | undefined | null): boolean => {
  if (value === undefined || value === null) {
    return false;
  }
  value = PersianToEnglish(value);
  var patt = new RegExp(`^09[0-9]{2}[0-9]{7}$`);
  return patt.test(value);
};

// const nationalCodeIsValid = (value: string | undefined | null): boolean => {
//   if (value === undefined || value === null) {
//     return false;
//   }
//   value = PersianToEnglish(value);
//   var patt = new RegExp(`^[0-9]{10}$`);
//   return patt.test(value);
// };

const nationalIdValidation = (value: string | undefined | null): boolean => {
  if (value === undefined || value === null) {
    return false;
  }
  value = PersianToEnglish(value);
  var patt = new RegExp(`^[0-9]{11}$`);
  return patt.test(value);
};

function isValidIranianNationalCode(input: any) {
  if (!/^\d{10}$/.test(input)) return false;

  var check = +input[9];
  var sum = 0;
  var i;
  for (i = 0; i < 9; ++i) {
    sum += +input[i] * (10 - i);
  }
  sum %= 11;

  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
}
export const registerValidation = Yup.object({
  nationalCode: Yup.mixed().when("userType", {
    is: (val: any) => {
      return val === 1;
    },
    then: Yup.string()
      .required("لطفا کد ملی خود را وارد کنید")
      .test("nationalCode", "کد ملی وارد شده نامعتبر است", (value) =>
        isValidIranianNationalCode(value)
      )
      .typeError("لطفا کد ملی را درست وارد کنید"),
  }),
  nationalId: Yup.mixed().when("userType", {
    is: (val: any) => {
      return val === 2;
    },
    then: Yup.string()
      .required("لطفا شماره شناسه ملی خود را وارد کنید")
      .test("nationalId", "َشناسه ملی وارد شده نامعتبر است", (value) =>
        nationalIdValidation(value)
      )
      .typeError("لطفا شناسه ملی را درست وارد کنید"),
  }),
  cellphone: Yup.string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .test("cellphone", "شماره تلفن وارد شده نامعتبر است", (value) =>
      checkNumber(value)
    )
    .typeError("لطفاشماره موبایل را درست وارد کنید"),
});

// LegalRegister-Validation
export const legalRegisterValidation = Yup.object({
  name: Yup.string()
    .required("لطفا نام خود را وارد کنید ")
    .matches(isPersian(), "نام را درست وارد کنید"),
  companyType: Yup.number()
    .test("companyType", "لطفا نوع شرکت خود را انتخاب کنید ", (val) => {
      if (val === undefined || val === null) {
        return false;
      }
      return val > 0;
    })
    .typeError("لطفا نوع شرکت را درست وارد کنید"),
  email: Yup.string()
    .required("لطفا ایمیل خود را وارد کنید ")
    .email("ایمیل وارد شده نامعتبر است")
    .typeError("لطفا ایمیل را درست وارد کنید"),
  userName: Yup.string()
    .required("لطفا نام کاربری خود را وارد کنید ")
    .typeError("لطفا نام کاربری را وارد کنید"),
  password: Yup.string()
    .required("لطفا رمز عبور خود را وارد کنید ")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
      `
    رمز عبور خود را بیشتر از هشت کاراکتر انتخاب کنید 
    رمز عبور باید شامل عدد , حروف بزرگ , کوچک و کاراکتر های خاص باشد `
    )
    .typeError("لطفا رمز عبور را وارد کنید"),
  confirmPassword: Yup.string()
    .required("لطفا تکرار رمز عبور را وارد کنید")
    .test("confirmPassword", "تکرار رمز عبور نادرست است", function (value) {
      return this.parent.password === value;
    })
    .typeError("لطفا رمز عبور را درست وارد کنید"),
});

// Natural-Validation
export const NaturalRegisterValidation = Yup.object({
  name: Yup.string()
    .required("لطفا نام خود را وارد کنید ")
    .matches(isPersian(), "نام را درست وارد کنید")
    .typeError("لطفا نام را درست وارد کنید"),
  lastName: Yup.string()
    .required("لطفا نام خانوادگی خود را وارد کنید ")
    .matches(isPersian(), "نام خانوادگی را درست وارد کنید")
    .typeError("لطفا نام خانوادگی را درست وارد کنید"),
  email: Yup.string()
    .required("لطفا ایمیل خود را وارد کنید ")
    .email("ایمیل وارد شده نامعتبر است")
    .typeError("لطفا ایمیل را درست وارد کنید"),
  username: Yup.string().required("لطفا نام کاربری خود را وارد کنید "),
  password: Yup.string()
    .required("لطفا رمز عبور خود را وارد کنید ")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
      `
      رمز عبور خود را بیشتر از هشت کاراکتر انتخاب کنید 
      رمز عبور باید شامل عدد , حروف بزرگ , کوچک و کاراکتر های خاص باشد(مثل @و$)`
    )
    .typeError("لطفا رمز عبور را درست وارد کنید"),
  confirmPassword: Yup.string()
    .required("لطفا تکرار رمز عبور را وارد کنید")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
      `
      رمز عبور خود را بیشتر از هشت کاراکتر انتخاب کنید 
      رمز عبور باید شامل عدد , حروف بزرگ , کوچک و کاراکتر های خاص باشد(مثل @و$)`
    )
    .test("confirmPassword", "تکرار رمز عبور نادرست است", function (value) {
      return this.parent.password === value;
    })
    .typeError("لطفا تکرار رمز عبور را درست وارد کنید"),
});
