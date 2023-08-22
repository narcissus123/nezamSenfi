import * as Yup from "yup";

export const validationConfirmModal = Yup.object().shape({
  describe: Yup.string()
    .required("توضیحات نباید خالی باشد")
    .typeError("توضیحات نباید خالی باشد"),
});

export const validationConfirmModalAfterVisit = Yup.object().shape({
  describe: Yup.string()
    .required("توضیحات نباید خالی باشد")
    .typeError("توضیحات نباید خالی باشد"),
  CarSuppy: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export const validationRejectModal = Yup.object().shape({
  describe: Yup.string()
    .required("توضیحات نباید خالی باشد")
    .typeError("توضیحات نباید خالی باشد"),
});

export const validationRejectModalWithReason = Yup.object().shape({
  describe: Yup.string()
    .required("توضیحات نباید خالی باشد")
    .typeError("توضیحات نباید خالی باشد"),
  reason: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export const validationRejectModalWithNo = Yup.object().shape({
  describe: Yup.string()
    .required("توضیحات نباید خالی باشد")
    .typeError("توضیحات نباید خالی باشد"),
});


export const secretariatSetNumberAndDateValidate = Yup.object().shape({
  cansellationDate: Yup.string()
    .required("تاریخ نباید خالی باشد")
    .typeError("تاریخ نباید خالی باشد"),
  cansellationNumberBySecretriat: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!"),
});

export const validationRejectModalWithTypeReason = Yup.object().shape({
  describe: Yup.string()
    .required("توضیحات نباید خالی باشد")
    .typeError("توضیحات نباید خالی باشد"),
  type: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});


export const validationRejectModalWithTypeReasonAterVisit = Yup.object().shape({
  describe: Yup.string()
    .required("توضیحات نباید خالی باشد")
    .typeError("توضیحات نباید خالی باشد"),
  type: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  CarSuppy: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});