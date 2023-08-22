import { Form, Formik } from "formik";
import React, { FC } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
} from "reactstrap";
import { SetContractPositionValidation } from "../../../core/validations/set-contract.validations";
import { DropZone, SubmitButton } from "../../common/Form";
import BasicSelectOption from "../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import {
  useGetPositionRequestContract,
  usePostSetPositionRequestContract,
} from "../../../core/services/api";
import { showToast } from "../../../core/utils";
import { ToastTypes } from "../../../core/enums";

const SetContractPosition: FC = () => {
  const jobTypeData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "پرسنلی" },
        { value: 2, label: "پیمانکاری" },
      ],
    },
  ];

  const uploadContract = usePostSetPositionRequestContract();
  const getFile = useGetPositionRequestContract();

  const onSubmit = (value: any) => {
    const formData = new FormData();
    formData.append("ContractTypeEnum", value.contractTypeEnum.value);
    formData.append("File", value.files[0]);

    uploadContract.mutate(formData, {
      onSuccess: () => {
        showToast(["با موفقیت بارگذاری شد"], ToastTypes.success);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تنظیم قرارداد</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            contractTypeEnum: { value: 1, label: "پرسنلی" },
            files: null,
          }}
          onSubmit={onSubmit}
          validationSchema={SetContractPositionValidation}
        >
          {({ values }) => (
            <Form>
              <Col sm="6">
                <BasicSelectOption
                  data={jobTypeData}
                  name="contractTypeEnum"
                  lableText="نوع قرارداد"
                  significant
                  placeHolder="نوع قرارداد را انتخاب کنید..."
                />
              </Col>

              <Col sm="6">
                <DropZone
                  name="files"
                  lableText="فایل قرارداد"
                  significant
                  placeholder="فایل قرارداد را بارگذاری کنید ..."
                  isSingle
                  accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword"
                />
              </Col>

              <Col>
                <SubmitButton
                  isLoading={uploadContract.isLoading}
                  btnText="ثبت قرارداد"
                  values={values}
                  clearable
                  clearableTxt="دانلود قرارداد"
                  isClearableLoading={getFile.isLoading}
                  onClear={() => getFile.mutate(values.contractTypeEnum.value)}
                  schema={SetContractPositionValidation}
                />
              </Col>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export { SetContractPosition };
