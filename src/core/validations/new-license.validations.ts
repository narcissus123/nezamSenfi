import * as Yup from "yup";

export const NewLicenseValidate = Yup.object().shape(
  {
    useType: Yup.object()
      .test("", "یک گزینه انتخاب کنید", (obj: any) => obj && obj.value > 0)
      .required()
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    job: Yup.object()
      .test("", "یک گزینه انتخاب کنید", (obj: any) => obj && obj.value > 0)
      .required()
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    province: Yup.object()
      .test("", "یک گزینه انتخاب کنید", (obj: any) => obj && obj.value > 0)
      .required()
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    township: Yup.object()
      .test("", "یک گزینه انتخاب کنید", (obj: any) => obj && obj.value > 0)
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
    guildType: Yup.object()
      .test("", "یک گزینه انتخاب کنید", (obj: any) => obj && obj.value > 0)
      .required()
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),

    typeOneBiggestArea: Yup.number()
      .when(
        ["useType", "guildType"],
        (useType: any, guildType: any, schema: any) => {
          if (
            useType &&
            (useType.useTypeEnum === 1 || useType.useTypeEnum === 2) &&
            guildType &&
            guildType.value === 1
          ) {
            return schema
              .required("این فیلد باید پر شود!")
              .typeError("لطفا فقط عدد وارد کنید!")
              .min(1, "حداقل مساحت باید یک باشد!");
          }
          return schema.nullable().notRequired();
        }
      )
      .test("", "", function (obj: any) {
        let typeOneSumOfArea = this.parent.typeOneSumOfArea;
        let typeOneCount = this.parent.typeOneCount;

        let useType = this.parent.useType;
        let guildType = this.parent.guildType;
        if (
          useType &&
          (useType.useTypeEnum == 1 || useType.useTypeEnum == 2) &&
          guildType &&
          guildType.value == 1
        ) {
          if (obj && typeOneSumOfArea && typeOneCount) {
            return (typeOneSumOfArea / typeOneCount).toFixed(2) > obj
              ? this.createError({
                  message: `مساحت بزرگترین قطعه باید بزرگتر یا مساوی ${(
                    typeOneSumOfArea / typeOneCount
                  ).toFixed(2)} باشد.`,
                  path: "typeOneBiggestArea",
                })
              : true;
          }
        }
        return true;
      }),
    typeOneSumOfArea: Yup.number()
      .when(
        ["useType", "guildType"],
        (useType: any, guildType: any, schema: any) => {
          if (
            useType &&
            (useType.useTypeEnum === 1 || useType.useTypeEnum === 2) &&
            guildType &&
            guildType.value === 1
          ) {
            return schema
              .required("این فیلد باید پر شود!")
              .typeError("لطفا فقط عدد وارد کنید!")
              .min(1, "حداقل مساحت باید یک باشد!");
          }
          return schema.nullable().notRequired();
        }
      )
      .test(
        "",
        "مجموع مساحت نمی تواند از مساحت بزرگترین قطعه کوچک تر باشد!",
        function (obj: any) {
          let typeOneBiggestArea = this.parent.typeOneBiggestArea;

          let useType = this.parent.useType;
          let guildType = this.parent.guildType;
          if (
            useType &&
            (useType.useTypeEnum == 1 || useType.useTypeEnum == 2) &&
            guildType &&
            guildType.value == 1
          ) {
            if (obj && typeOneBiggestArea) {
              return obj < typeOneBiggestArea ? false : true;
            }
          }
          return true;
        }
      ),
    typeOneCount: Yup.number()
      .test(
        "",
        "مساحت بزرگترین قطعه کوچکتر از مجموع مساحت قطعات  است! تعداد قطعات باید بزرگتر از 1 باشد!",
        function (obj: any) {
          let typeOneBiggestArea = this.parent.typeOneBiggestArea;
          let typeOneSumOfArea = this.parent.typeOneSumOfArea;

          let useType = this.parent.useType;
          let guildType = this.parent.guildType;

          if (
            useType &&
            (useType.useTypeEnum == 1 || useType.useTypeEnum == 2) &&
            guildType &&
            guildType.value == 1
          ) {
            if (obj && typeOneBiggestArea && typeOneSumOfArea) {
              if (typeOneBiggestArea < typeOneSumOfArea) {
                return obj == 1 ? false : true;
              }
            }
          }
          return true;
        }
      )
      .test(
        "",
        "مجموع مساحت قطعات با مساحت بزرگترین قطعه برابر است! تعداد قطعات نمی تواند بیشتر از 1 باشد",
        function (obj: any) {
          let typeOneBiggestArea = this.parent.typeOneBiggestArea;
          let typeOneSumOfArea = this.parent.typeOneSumOfArea;

          let useType = this.parent.useType;
          let guildType = this.parent.guildType;
          if (
            useType &&
            (useType.useTypeEnum == 1 || useType.useTypeEnum == 2) &&
            guildType &&
            guildType.value == 1
          ) {
            if (obj && typeOneBiggestArea && typeOneSumOfArea) {
              if (typeOneBiggestArea === typeOneSumOfArea && obj != 1) {
                return false;
              }
            }
          }

          return true;
        }
      )
      .when(
        ["useType", "guildType"],
        (useType: any, guildType: any, schema: any) => {
          if (
            useType &&
            (useType.useTypeEnum === 1 || useType.useTypeEnum === 2) &&
            guildType &&
            guildType.value === 1
          ) {
            return schema
              .required("این فیلد باید پر شود!")
              .typeError("لطفا فقط عدد وارد کنید!")
              .min(1, "حداقل تعداد قطعات باید یک باشد!");
          }
          return schema.nullable().notRequired();
        }
      ),
    guildBiggestArea: Yup.number().when(
      ["useType", "guildType"],
      (useType: any, guildType: any, schema: any) => {
        if (
          useType &&
          useType.useTypeEnum !== 1 &&
          useType.useTypeEnum !== 2 &&
          guildType &&
          guildType.value === 1
        ) {
          return schema
            .required("این فیلد باید پر شود!")
            .typeError("لطفا فقط عدد وارد کنید!")
            .min(1, "حداقل مساحت باید یک باشد!");
        }
        return schema.nullable().notRequired();
      }
    ),
    guildSumOfArea: Yup.number()
      .test(
        "",
        "مساحت کل واحد صنفی باید برابر یا بیشتر از مجموع مساحت واحد صنفی و مساحت تاسیسات واحد صنفی باشد!",
        function (obj: any) {
          let guildFacilitiesArea = this.parent.guildFacilitiesArea;
          let guildBiggestArea = this.parent.guildBiggestArea;
          let useType = this.parent.useType;
          let guildType = this.parent.guildType;
          if (
            useType &&
            useType.useTypeEnum != 1 &&
            useType.useTypeEnum != 2 &&
            guildType &&
            guildType.value == 1
          ) {
            if (obj && guildFacilitiesArea && guildBiggestArea) {
              if (guildFacilitiesArea + guildBiggestArea > obj) {
                return false;
              }
            }
          }
          return true;
        }
      )
      .when(
        ["useType", "guildType"],
        (useType: any, guildType: any, schema: any) => {
          if (
            useType &&
            useType.useTypeEnum !== 1 &&
            useType.useTypeEnum !== 2 &&
            guildType &&
            guildType.value === 1
          ) {
            return schema
              .required("این فیلد باید پر شود!")
              .typeError("لطفا فقط عدد وارد کنید!")
              .min(1, "حداقل مساحت باید یک باشد!");
          }
          return schema.nullable().notRequired();
        }
      ),
    guildFacilitiesArea: Yup.number().when(
      ["useType", "guildType"],
      (useType: any, guildType: any, schema: any) => {
        if (
          useType &&
          useType.useTypeEnum !== 1 &&
          useType.useTypeEnum !== 2 &&
          guildType &&
          guildType.value === 1
        ) {
          return schema
            .required("این فیلد باید پر شود!")
            .typeError("لطفا فقط عدد وارد کنید!")
            .min(1, "حداقل مساحت باید یک باشد!");
        }
        return schema.nullable().notRequired();
      }
    ),
  },
  [["city", "village"]]
);
