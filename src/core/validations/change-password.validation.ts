import * as Yup from "yup";

export const ChangePasswordValidate = Yup.object({
  oldPassword: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!"),
  password: Yup.string()
    .required("لطفا رمز عبور خود را وارد کنید ")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
      `
    رمز عبور خود را بیشتر از هشت کاراکتر انتخاب کنید 
    رمز عبور باید شامل عدد , حروف بزرگ , کوچک و کاراکتر های خاص باشد `
    )
    .typeError("لطفا رمز عبور را وارد کنید"),
  repeatPassword: Yup.string()
    .required("لطفا تکرار رمز عبور را وارد کنید")
    .test("confirmPassword", "تکرار رمز عبور نادرست است", function (value) {
      return this.parent.password === value;
    })
    .typeError("لطفا رمز عبور را درست وارد کنید"),
});
