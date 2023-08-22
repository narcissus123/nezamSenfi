import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { showToast } from "../../../../../../core/utils";
import { GoToTruePage } from "../../../../../../core/utils/context/StatusProvider";
import { isSameString } from "../../../../../../core/utils/same-string.utils";
import { BankInfoValidate } from "../../../../../../core/validations/bank-info.validations";

import { UnionsLocationInfoValidate } from "../../../../../../core/validations/unions-location-info.validations";
import { FormDivider, SubmitButton, TextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";


interface IPropTypes {
  bankInfoMutation: any;
  setRequestId?: any;
  requestDetail: any;
  type: any;
  refetch: any;
}

const BankInfo: FC<IPropTypes> = ({
  bankInfoMutation,
  setRequestId,
  requestDetail,
  type,
  refetch,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    bankShabaNumber: "",
    bankAcountNumber: "",
    bankAccountType: null,
    bankName: "",
    bankBranchName: "",
    bankBranchCode: "",
  });

  const bankAccountTypeData = [
    { value: 1, label: "حساب قرض الحسنه" },
    { value: 2, label: "حساب قرض الحسنه جاری" },
    { value: 3, label: "حساب قرض الحسنه پس انداز" },
    { value: 4, label: "حساب سرمایه گذاری" },
    { value: 5, label: "حساب سرمایه گذاری کوتاه مدت" },
    { value: 6, label: "حساب سرمایه گذاری مدت دار" },
  ];

  const { req_id: id }: any = useParams();

  const setMutation = bankInfoMutation()

  useEffect(() => {
    if (setRequestId) {
      setRequestId(id);
    }
  }, [id]);

  useEffect(() => {
    if (requestDetail) {
      setInitialValues({
        bankShabaNumber: requestDetail.bankShabaNumber,
        bankAcountNumber: requestDetail.bankAcountNumber,
        bankName: requestDetail.bankName,
        bankBranchName: requestDetail.bankBranchName,
        bankBranchCode: requestDetail.bankBranchCode,
        bankAccountType: { value: requestDetail.bankAccountType, label: "" },
      });
    }
  }, [requestDetail]);

  const history = useHistory();

  const onSubmit = (value: any) => {
    
    const formData = new FormData();


    formData.append("BankAccountType", value.bankAccountType.value);
    formData.append("BankShabaNumber", value.bankShabaNumber);
    formData.append("Id", "0");
    formData.append("BankAcountNumber", value.bankAcountNumber);
    formData.append("BankName", value.bankName);
    formData.append("BankBranchName", value.bankBranchName);
    formData.append("BankBranchCode", value.bankBranchCode);

    setMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], ToastTypes.success);
        refetch.mutate(+id);
        if (isSameString(type, "union") && requestDetail.status === 2) {
          GoToTruePage(12, "UnionApplicantFlow", id);
        } else if (isSameString(type, "County") && requestDetail.status === 2)
          history.push("/GuildsActivation/County/3/UserDetails/" + id);
        else if (isSameString(type, "province") && requestDetail.status === 2)
          history.push("/GuildsActivation/Province/3/UserDetails/" + id);
      },
    });

  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>اطلاعات بانکی</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={BankInfoValidate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              getFieldProps,
              setFieldValue,
            }) => {
              return (
                <Form>
                  <Row>
                    <Col md="12">
                      <Row>
                        <Col sm="4">
                          <TextInput
                            id="bankShabaNumber"
                            lableText="کد شبا"
                            name="bankShabaNumber"
                            placeholder="کد شبا را وارد کنید ..."
                            significant
                          />
                        </Col>
                        <Col sm="4">
                          <TextInput
                            id="bankAcountNumber"
                            lableText="شماره حساب"
                            name="bankAcountNumber"
                            placeholder="شماره حساب را وارد کنید"
                            significant
                          />
                        </Col>
                        <Col sm="4">
                          <BasicSelectOption
                            lableText="نوع حساب"
                            significant={true}
                            placeHolder="انتخاب کنید..."
                            name="bankAccountType"
                            data={bankAccountTypeData}
                            isLoading={false}
                          />
                        </Col>
                        <Col sm="4">
                          <TextInput
                            id="bankName"
                            lableText="نام بانک"
                            name="bankName"
                            placeholder="نام بانک را وارد کنید"
                            significant
                          />
                        </Col>
                        <Col sm="4">
                          <TextInput
                            id="bankBranchName"
                            lableText="نام شعبه"
                            name="bankBranchName"
                            placeholder="نام شعبه"
                            significant
                          />
                        </Col>
                        <Col sm="4">
                          <TextInput
                            id="bankBranchCode"
                            lableText="کد شعبه"
                            name="bankBranchCode"
                            placeholder="کد شعبه را وارد کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <SubmitButton
                            isLoading={setMutation.isLoading}
                            initialValue={initialValues}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { BankInfo };
