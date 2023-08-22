import * as Yup from "yup";

const SetGuildIdValidate = Yup.object().shape({
  guildId: Yup.number()
    .test("guildId", "لطفا عدد 8 یا 9 رقمی وارد کنید!", (value: any) => {
      if (value.toString().length === 8 || value.toString().length === 9) {
        return true;
      }
      return false;
    })
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!"),
});



export { SetGuildIdValidate };
