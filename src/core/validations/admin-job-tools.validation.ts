import * as Yup from "yup";
import {
  isLimitedNumberNullableRegex,
  isLimitedNumberRegex,
  isNumberRegex,
  isPersian,
  isPersianNullable,
} from "./../utils/regex.utils";

const addJobCategoryValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان گروه را وارد کنید")
    .typeError("لطفا عنوان گروه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberRegex(1, 1),
      "کد گروه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .required("لطفا کد گروه را وارد کنید")
    .typeError("لطفا کد گروه را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const addJobSectionValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان بخش را وارد کنید")
    .typeError("لطفا عنوان بخش را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isPersian(),
      "کد بخش وارد شده نا معتبر است لطفا حرف فارسی به طول یک وارد کنید"
    )
    .test(
      "code",
      "کد بخش وارد شده نا معتبر است لطفا حرف فارسی به طول یک وارد کنید",
      (val: any) => {
        if (val && val.length > 0) {
          return val.length === 1 || val === "الف";
        }
        return true;
      }
    )
    .required("لطفا کد بخش را وارد کنید")
    .typeError("لطفا کد بخش را درست وارد کنید"),
});

const addJobSubSectionValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان قسمت را وارد کنید")
    .typeError("لطفا عنوان قسمت را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberRegex(2, 2),
      "کد قسمت وارد شده نا معتبر است لطفا عدد دو رقمی وارد کنید"
    )
    .required("لطفا کد قسمت را وارد کنید")
    .typeError("لطفا کد قسمت را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const addJobClassValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان طبقه را وارد کنید")
    .typeError("لطفا عنوان طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberRegex(1, 1),
      "کد طبقه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .required("لطفا کد طبقه را وارد کنید")
    .typeError("لطفا کد طبقه را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobCategoryId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});
const addJobSubClassValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان زیر طبقه را وارد کنید")
    .typeError("لطفا عنوان زیر طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberRegex(1, 1),
      "کد زیر طبقه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .required("لطفا کد زیر طبقه را وارد کنید")
    .typeError("لطفا کد زیر طبقه را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobCategoryId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobClassId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const addJobValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان شغل را وارد کنید")
    .typeError("لطفا عنوان شغل را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberRegex(2, 2),
      "کد شغل وارد شده نا معتبر است لطفا ورودی دو رقمی وارد کنید"
    )
    .required("لطفا کد شغل را وارد کنید")
    .typeError("لطفا کد شغل را درست وارد کنید"),
  useTypeId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobCategoryId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobClassId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubClassId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobType: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobCategoryType: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const searchJobCategoryValidation = Yup.object().shape({
  title: Yup.string()
    .notRequired()
    .typeError("لطفا عنوان گروه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 1),
      "کد گروه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .notRequired()
    .typeError("لطفا کد گروه را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .notRequired()
    .nullable()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .notRequired()
    .nullable()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const searchJobSectionValidation = Yup.object().shape({
  title: Yup.string()
    .notRequired()
    .typeError("لطفا عنوان قسمت را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isPersian(),
      "کد گروه وارد شده نا معتبر است لطفا حرف فارسی به طول یک وارد کنید"
    )
    .test(
      "code",
      "کد گروه وارد شده نا معتبر است لطفا حرف فارسی به طول یک وارد کنید",
      (val: any) => {
        if (val && val.length > 0) {
          return val.length === 1 || val === "الف";
        }
        return true;
      }
    )
    .notRequired()
    .typeError("لطفا کد قسمت را درست وارد کنید"),
});

const searchJobSubSectionValidation = Yup.object().shape({
  title: Yup.string()
    .notRequired()
    .typeError("لطفا عنوان قسمت را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 1),
      "کد قسمت وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .notRequired()
    .typeError("لطفا کد قسمت را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .notRequired()
    .nullable()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const searchJobClassValidation = Yup.object().shape({
  title: Yup.string()
    .notRequired()
    .typeError("لطفا عنوان طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 1),
      "کد طبقه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .notRequired()
    .typeError("لطفا کد طبقه را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .notRequired()
    .nullable()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .notRequired()
    .nullable()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobCategoryId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .notRequired()
    .nullable()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const searchJobValidation = Yup.object().shape({
  title: Yup.string()
    .notRequired()
    .typeError("لطفا عنوان طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(2, 2),
      "کد طبقه وارد شده نا معتبر است لطفا عدد دو رقمی وارد کنید"
    )
    .notRequired()
    .typeError("لطفا کد طبقه را درست وارد کنید"),
});

const searchJobSubClassValidation = Yup.object().shape({
  title: Yup.string()
    .notRequired()
    .typeError("لطفا عنوان زیر طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 1),
      "کد زیر طبقه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .notRequired()
    .typeError("لطفا کد زیر طبقه را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .notRequired()
    .nullable()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .notRequired()
    .nullable()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobCategoryId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .notRequired()
    .nullable()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobClassId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .notRequired()
    .nullable()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const editJobSubSectionValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان قسمت را وارد کنید")
    .typeError("لطفا عنوان قسمت را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(2, 2),
      "کد قسمت وارد شده نا معتبر است لطفا عدد دو رقمی وارد کنید"
    )
    .required("لطفا کد قسمت را وارد کنید")
    .typeError("لطفا کد قسمت را درست وارد کنید"),
});

const editJobSubSectionTreeValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان قسمت را وارد کنید")
    .typeError("لطفا عنوان قسمت را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(2, 2),
      "کد قسمت وارد شده نا معتبر است لطفا عدد دو رقمی وارد کنید"
    )
    .required("لطفا کد قسمت را وارد کنید")
    .typeError("لطفا کد قسمت را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const editJobSectionValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان قسمت را وارد کنید")
    .typeError("لطفا عنوان قسمت را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isPersian(),
      "کد گروه وارد شده نا معتبر است لطفا حرف فارسی به طول یک وارد کنید"
    )
    .test(
      "code",
      "کد گروه وارد شده نا معتبر است لطفا حرف فارسی به طول یک وارد کنید",
      (val: any) => {
        if (val && val.length > 0) {
          return val.length === 1 || val === "الف";
        }
        return true;
      }
    )
    .required("لطفا کد قسمت را وارد کنید")
    .typeError("لطفا کد قسمت را درست وارد کنید"),
});
const editJobCategoryTreeValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان گروه را وارد کنید")
    .typeError("لطفا عنوان گروه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 1),
      "کد گروه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .required("لطفا کد گروه را وارد کنید")
    .typeError("لطفا کد گروه را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const editJobClassTreeValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان طبقه را وارد کنید")
    .typeError("لطفا عنوان طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 1),
      "کد طبقه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .required("لطفا کد طبقه را وارد کنید")
    .typeError("لطفا کد طبقه را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobCategoryId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const editJobSubClassTreeValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان طبقه را وارد کنید")
    .typeError("لطفا عنوان طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 1),
      "کد طبقه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .required("لطفا کد طبقه را وارد کنید")
    .typeError("لطفا کد طبقه را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobCategoryId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobClassId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const editJobTreeValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان طبقه را وارد کنید")
    .typeError("لطفا عنوان طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 2),
      "کد وارد شده نا معتبر است لطفا عدد یک یا دو رقمی وارد کنید"
    )
    .required("لطفا کد طبقه را وارد کنید")
    .typeError("لطفا کد طبقه را درست وارد کنید"),
  jobSectionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobSubSectionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobCategoryId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobClassId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobCategoryType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const editJobCategoryValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان گروه را وارد کنید")
    .typeError("لطفا عنوان گروه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 1),
      "کد گروه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .required("لطفا کد گروه را وارد کنید")
    .typeError("لطفا کد گروه را درست وارد کنید"),
});
const editJobClassValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان طبقه را وارد کنید")
    .typeError("لطفا عنوان طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 1),
      "کد طبقه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .required("لطفا کد طبقه را وارد کنید")
    .typeError("لطفا کد طبقه را درست وارد کنید"),
});
const editJobSubClassValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان زیر طبقه را وارد کنید")
    .typeError("لطفا عنوان زیر طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 1),
      "کد زیر طبقه وارد شده نا معتبر است لطفا عدد یک رقمی وارد کنید"
    )
    .required("لطفا کد زیر طبقه را وارد کنید")
    .typeError("لطفا کد زیر طبقه را درست وارد کنید"),
});
const editJobValidation = Yup.object().shape({
  title: Yup.string()
    .required("لطفا عنوان زیر طبقه را وارد کنید")
    .typeError("لطفا عنوان زیر طبقه را درست وارد کنید"),
  code: Yup.string()
    .matches(
      isLimitedNumberNullableRegex(1, 2),
      "کد وارد شده نا معتبر است لطفا عدد یک یا دو رقمی وارد کنید"
    )
    .required("لطفا کد زیر طبقه را وارد کنید")
    .typeError("لطفا کد زیر طبقه را درست وارد کنید"),
});

export {
  editJobSectionValidation,
  searchJobSectionValidation,
  addJobSectionValidation,
  searchJobValidation,
  editJobValidation,
  addJobValidation,
  addJobCategoryValidation,
  searchJobCategoryValidation,
  editJobCategoryValidation,
  addJobClassValidation,
  editJobClassValidation,
  searchJobClassValidation,
  addJobSubClassValidation,
  searchJobSubClassValidation,
  editJobSubClassValidation,
  addJobSubSectionValidation,
  searchJobSubSectionValidation,
  editJobSubSectionValidation,
  editJobSubSectionTreeValidation,
  editJobCategoryTreeValidation,
  editJobClassTreeValidation,
  editJobSubClassTreeValidation,
  editJobTreeValidation,
};
