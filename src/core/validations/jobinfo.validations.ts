import {
  isHomePhoneNullable,
  isLimitedNumberNullableRegex,
  isNumberRegex,
  isPersianAndNumber,
} from "./../utils/regex.utils";
import * as Yup from "yup";

const JobInfoValidate = Yup.object().shape(
  {
    jobStatus: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .required("این فیلد باید پر شود!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    workEmail: Yup.string()
      .email("لطفا ایمیل را به درستی وارد کنید!")
      .notRequired()
      .typeError("ایمیل را درست وارد کنید"),
    insuranceHistory: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .required("این فیلد باید پر شود!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    insuranceType: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .required("این فیلد باید پر شود!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    workplaceNumber: Yup.string()
      .matches(isHomePhoneNullable(), "شماره تلفن وارد شده نامعتبر است")
      .notRequired()
      .typeError("شماره تلفن را درست وارد کنید"),
    workplacePostalCode: Yup.string()
      .matches(
        isLimitedNumberNullableRegex(10, 10),
        "کد پستی باید 10 رقم و عدد باشد!"
      )
      .notRequired()
      .typeError("کد پستی را درست وارد کنید"),
    supplementaryInsuranceType: Yup.string().when(
      ["supplementaryInsurance", "insuranceType"],
      (supplementaryInsurance: any, insuranceType: any, schema: any) => {
        if (insuranceType) {
          if (insuranceType.value !== "6") {
            if (
              supplementaryInsurance &&
              supplementaryInsurance.value === "1"
            ) {
              return schema.required("لطفا نوع بیمه تکمیلی را وارد کنید!");
            } else {
              return schema.notRequired().nullable();
            }
          } else {
            return schema.notRequired().nullable();
          }
        } else {
          return schema.notRequired().nullable();
        }
      }
    ),
    workplaceName: Yup.string().when(
      ["jobStatus"],
      (jobStatus: any, schema: any) => {
        if (jobStatus) {
          if (
            jobStatus.value === "5" ||
            jobStatus.value === "6" ||
            jobStatus.value === "7"
          )
            return schema.notRequired().nullable();
          else
            return schema
              .matches(isPersianAndNumber(), "نام سازمان را به درستی وارد کنید")
              .required("لطفا نام سازمان را وارد کنید!")
              .typeError("درست وارد کنید");
        } else {
          return schema
            .matches(isPersianAndNumber(), "نام سازمان را به درستی وارد کنید")
            .required("لطفا نام سازمان را وارد کنید!")
            .typeError(" درست وارد کنید");
        }
      }
    ),
    workExperience: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .when(["jobStatus"], (jobStatus: any, schema: any) => {
        if (jobStatus) {
          if (jobStatus.value === "6" || jobStatus.value === "7") {
            return schema.notRequired().nullable();
          } else {
            return schema
              .required("این فیلد باید پر شود!")
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
          }
        } else {
          return schema
            .required("این فیلد باید پر شود!")
            .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
        }
      }),

    workplace: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .when(["jobStatus"], (jobStatus: any, schema: any) => {
        if (jobStatus) {
          if (
            jobStatus.value === "5" ||
            jobStatus.value === "6" ||
            jobStatus.value === "7"
          )
            return schema.notRequired().nullable();
          else
            return schema
              .required("این فیلد باید پر شود!")
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
        } else {
          return schema
            .required("این فیلد باید پر شود!")
            .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
        }
      }),
    postInOrganization: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .when(["jobStatus"], (jobStatus: any, schema: any) => {
        if (jobStatus) {
          if (
            jobStatus.value === "5" ||
            jobStatus.value === "6" ||
            jobStatus.value === "7"
          )
            return schema.notRequired().nullable();
          else
            return schema
              .required("این فیلد باید پر شود!")
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
        } else {
          return schema
            .required("این فیلد باید پر شود!")
            .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
        }
      }),
    village: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .when(["jobStatus", "city"], (jobStatus: any, city: any, schema: any) => {
        if (jobStatus) {
          if (jobStatus.value === "6" || jobStatus.value === "7") {
            return schema.notRequired().nullable();
          }
          if (!city) {
            return schema
              .required("یک گزینه را انتخاب کنید")
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
          } else {
            return schema.nullable().notRequired();
          }
        } else {
          return schema
            .required("این فیلد باید پر شود!")
            .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
        }
      }),
    city: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .when(
        ["jobStatus", "village"],
        (jobStatus: any, village: any, schema: any) => {
          if (jobStatus) {
            if (jobStatus.value === "6" || jobStatus.value === "7") {
              return schema.notRequired().nullable();
            }
            if (!village) {
              return schema
                .required("یک گزینه را انتخاب کنید")
                .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
            } else {
              return schema.nullable().notRequired();
            }
          } else {
            return schema
              .required("این فیلد باید پر شود!")
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
          }
        }
      ),
    commendation: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .required("این فیلد باید پر شود!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    skillCertification: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .required("این فیلد باید پر شود!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    skillCertificationFromWorkplace: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .when(["jobStatus"], (jobStatus: any, schema: any) => {
        if (jobStatus) {
          if (
            jobStatus.value === "5" ||
            jobStatus.value === "6" ||
            jobStatus.value === "7"
          )
            return schema.notRequired().nullable();
          else
            return schema
              .required("این فیلد باید پر شود!")
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
        } else {
          return schema
            .required("این فیلد باید پر شود!")
            .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
        }
      }),
  },
  [["city", "village"]]
);

export { JobInfoValidate };
