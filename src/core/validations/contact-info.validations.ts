import {
  isHomePhone,
  isLimitedNumberRegex,
  isNumberRegex,
} from "./../utils/regex.utils";
import * as Yup from "yup";

export const ContactInfoValidate = Yup.object().shape({
  addresses: Yup.array()
    .of(
      Yup.object().shape(
        {
          province: Yup.object()
            .test("", "یک گزینه انتخاب کنید", (obj: any) => obj.value > 0)
            .required()
            .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
          township: Yup.object()
            .test("", "یک گزینه انتخاب کنید", (obj: any) => obj.value > 0)
            .required()
            .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
          city: Yup.object()
            .shape({
              value: Yup.number(),
              label: Yup.string().nullable(),
            })
            .when("village", (village: any, schema: any) => {
              if (!village) {
                return schema
                  .required("یک گزینه را انتخاب کنید")
                  .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
              }
              return schema.nullable().notRequired();
            }),
          village: Yup.object()
            .shape({
              value: Yup.number(),
              label: Yup.string().nullable(),
            })
            .when("city", (city: any, schema: any) => {
              if (!city) {
                return schema
                  .required("یک گزینه را انتخاب کنید")
                  .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
              }
              return schema.nullable().notRequired();
            }),

          homePhone: Yup.string()
            .matches(isHomePhone(), "شماره تلفن وارد شده نا معتبر است")
            .required("شماره محل سکونت خود را ثبت کنید")
            .typeError("لطفا شماره تلفن را وارد کنید"),
          postalCode: Yup.string()
            .matches(
              isLimitedNumberRegex(10, 10),
              "کدپستی باید ده رقم و عدد باشد"
            )
            .required("کد پستی خود را ثبت کنید")
            .typeError("لطفا کد پستی را وارد کنید"),
          address: Yup.string()
            .required("لطفا آدرس خود را وارد کنيد")
            .typeError("لطفا شماره آدرس خود را وارد کنید"),
        },
        [["city", "village"]]
      )
    )

    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  cellphone: Yup.string()
    .matches(isNumberRegex(), "بايد عدد وارد شود")
    .required("شماره تلفن همراه خود را ثبت کنید")
    .typeError("لطفا شماره تلفن را وارد کنید"),
  email: Yup.string()
    .email("ایمیل را به درستی وارد کنید")
    .required("ایمیل خود را ثبت کنید")
    .typeError("آدرس ایمیل خود را وارد کنید"),
});

export const LegalContactInfoValidate = Yup.object().shape(
  {
    addresses: Yup.array()
      .of(
        Yup.object().shape(
          {
            province: Yup.object()
              .test("", "یک گزینه انتخاب کنید", (obj: any) => obj.value > 0)
              .required()
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
            township: Yup.object()
              .test("", "یک گزینه انتخاب کنید", (obj: any) => obj.value > 0)
              .required()
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
            city: Yup.object().when("village", (village: any, schema: any) => {
              return village && village.value < 1
                ? schema
                    .test(
                      "",
                      "یک گزینه انتخاب کنید",
                      (obj: any) => obj.value > 0
                    )
                    .required()
                    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!")
                : schema.nullable().notRequired();
            }),
            village: Yup.object().when("city", (city: any, schema: any) => {
              return city && city.value < 1
                ? schema
                    .test(
                      "",
                      "یک گزینه انتخاب کنید",
                      (obj: any) => obj.value > 0
                    )
                    .required()
                    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!")
                : schema.nullable().notRequired();
            }),

            homePhone: Yup.string()
              .matches(isHomePhone(), "شماره تلفن وارد شده نا معتبر است")
              .required("شماره محل شرکت خود را ثبت کنید")
              .typeError("لطفا شماره تلفن را وارد کنید"),
            postalCode: Yup.string()
              .matches(
                isLimitedNumberRegex(10, 10),
                "کدپستی باید ده رقم و عدد باشد"
              )
              .required("کد پستی شرکت را ثبت کنید")
              .typeError("لطفا کد پستی را وارد کنید"),
            address: Yup.string()
              .required("لطفا آدرس شرکت را وارد کنيد")
              .typeError("لطفا آدرس را وارد کنید")
              .typeError("لطفا آدرس خود را وارد کنید"),
          },
          [["city", "village"]]
        )
      )
      .required("لطفا یک گزینه را انتخاب کنید")
      .typeError("لطفا یک گزینه را انتخاب کنید"),

    cellphone: Yup.string()
      .matches(isNumberRegex(), "بايد عدد وارد شود")
      .required("شماره تلفن همراه خود را ثبت کنید")
      .typeError("لطفا شماره تلفن را وارد کنید"),

    email: Yup.string()
      .email("ایمیل را به درستی وارد کنید")
      .required("ایمیل خود را ثبت کنید")
      .typeError("لطفا ایمیل را وارد کنید"),
  },
  [["city", "village"]]
);
