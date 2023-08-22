import * as Yup from "yup";
import { CheckMaximumDate } from "../utils";

const SetPrimaryInfoValidation = Yup.object().shape({
  locationOfTheUnionUnit: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  unionUnitType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),

  primaryJobId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  statusOfUnionUnit: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  visitDate: Yup.string()
    .required(" تاریخ بازدید نباید خالی باشد")
    .test("birthDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val, false, true)
    )
    .typeError("تاریخ بازدید را انتخاب کنید"),
  jahadCenterId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const SetPrimaryInfoFirst: any = Yup.object().shape({
  useTypeId: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("لطفا یکی را حداقل انتخاب کنید")
    .typeError("لفطا یکی از گزینه ها را انتخاب کنید!"),
  jobId: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("لطفا یکی را حداقل انتخاب کنید")
    .typeError("لفطا یکی از گزینه ها را انتخاب کنید!"),
});

const SetPrimaryInfoSecond: any = Yup.object().shape({
  useTypeId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobId: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("لطفا یکی را حداقل انتخاب کنید")
    .typeError("لفطا یکی از گزینه ها را انتخاب کنید!"),
});

const SetPrimaryInfoThird: any = Yup.object().shape({
  useTypeId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const MergedSetPrimaryInfoFirst =
  SetPrimaryInfoValidation.concat(SetPrimaryInfoFirst);

const MergedSetPrimaryInfoSecond =
  SetPrimaryInfoValidation.concat(SetPrimaryInfoSecond);

const MergedSetPrimaryInfoThird =
  SetPrimaryInfoValidation.concat(SetPrimaryInfoThird);

export {
  MergedSetPrimaryInfoFirst,
  MergedSetPrimaryInfoSecond,
  MergedSetPrimaryInfoThird,
};
