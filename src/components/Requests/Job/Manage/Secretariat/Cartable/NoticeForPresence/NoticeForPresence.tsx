import { Form, Formik } from "formik";
import React, { FC, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import {
  getCurrentJalaliDate,
  RemoveCurrencyMask,
  showToast,
} from "../../../../../../../core/utils";
import { NoticeForPresenceValidation } from "../../../../../../../core/validations/notice-for-presence.validations";
import {
  ModernDatePicker,
  MoneyMask,
  SubmitButton,
  TextArea,
  TextInput,
} from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import TreeColumn from "../../../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";

interface IPropTyopes {
  sendInvitation: any;
  redirectTo: string;
}

const NoticeForPresence: FC<IPropTyopes> = ({ sendInvitation, redirectTo }) => {
  const guaranteeType = [
    {
      label: "نوع تضمین را انتخاب کنید",
      options: [
        { value: 2, label: "سفته" },
        { value: 1, label: "چک" },
      ],
    },
  ];

  const [guaranteeAmount, setGuaranteeAmount] = useState("");

  const { id }: any = useParams();
  const history = useHistory();

  const onSubmit = (values: any) => {
    const sendInvitationObj = {
      positionRequestId: +id,
      invitationDate: values.presenceDate,
      guaranteeType: values.guaranteeType.value,
      guaranteeAmount: +RemoveCurrencyMask(values.guaranteeAmount),
      guaranteeDescription: values.description,
      guarantorCount: values.guarantorCount,
    };

    sendInvitation.mutate(sendInvitationObj, {
      onSuccess: () => {
        showToast(["اعلان با موفقیت ارسال شد"], ToastTypes.success);
        history.push(redirectTo);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>اعلان برای حضور</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            presenceDate: "",
            guaranteeType: null,
            guaranteeAmount: "",
            guarantorCount: "",
            description: "",
          }}
          onSubmit={onSubmit}
          validationSchema={NoticeForPresenceValidation}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <TreeColumn>
                <>
                  <ModernDatePicker
                    name="presenceDate"
                    hasLabel
                    hasMaximum={false}
                    minimumDate={getCurrentJalaliDate()}
                    lableText="تاریخ حضور"
                    placeholder="تاریخ حضور را وارد کنید"
                    significant
                  />

                  <TextArea
                    lableText="سایر توضیحات"
                    name="description"
                    placeholder="توضیحات را وارد کنید"
                    significant
                  />
                </>
                <>
                  <BasicSelectOption
                    data={guaranteeType}
                    name="guaranteeType"
                    hasLabel
                    lableText="نوع تضمین"
                    significant
                    placeHolder="نوع تضمین را انتخاب کنید"
                  />
                  <TextInput
                    lableText="تعداد ضامن"
                    name="guarantorCount"
                    placeholder="تعداد ..."
                    significant
                  />
                </>
                <MoneyMask
                  lableText="مبلغ کل ضمانت"
                  name="guaranteeAmount"
                  touched={touched}
                  errors={errors}
                  onChange={(val: string) => {
                    setFieldValue("guaranteeAmount", val);
                    setGuaranteeAmount(val);
                  }}
                  value={guaranteeAmount}
                  significant
                  placeholder="مبلغ کل ضمانت را وارد کنید"
                />
              </TreeColumn>

              <SubmitButton
                isLoading={sendInvitation.isLoading}
                btnText="ثبت اعلان"
                schema={NoticeForPresenceValidation}
                values={values}
              />
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};
export { NoticeForPresence };
