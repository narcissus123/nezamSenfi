import { Formik, Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Card, CardBody, CardTitle } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import {
  ISelectInquiry,
  useGetGetAllInquiries,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { ISelectInquiryValidation } from "../../../../../../../core/validations/inqueries.validations";
import { MultiSelectOption ,SubmitButton} from "../../../../../../common/Form";
import { TwoColumn } from "../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

interface IPropTypes {
  useMutate?: any;
  url: string;
}

const SelectRequestInquiries: FC<IPropTypes> = ({ useMutate, url }) => {
  const [inquiriesOptions, setInquiriesOptions] = useState([]);

  const allInquiries = useGetGetAllInquiries();

  useEffect(() => {
    if (allInquiries.data && allInquiries.data.data) {
      const result = allInquiries.data.data.result;

      let inquiries: any = [];
      result.forEach((item: any) => {
        inquiries.push({ value: item.id, label: item.title });
      });

      setInquiriesOptions(inquiries);
    }
  }, [allInquiries.isSuccess]);

  const { id }: any = useParams();

  const onSubmit = (values: any) => {
    const inQuiries: any = [];
    values.inquiries.forEach((inquiry: any) => {
      inQuiries.push({
        inquiryId: inquiry.value,
      });
    });

    const selectInquiryObj: ISelectInquiry = {
      positionRequestId: +id,
      inquiries: inQuiries,
    };

    useMutate.mutate(selectInquiryObj);
  };

  const history = useHistory();

  useEffect(() => {
    if (useMutate.isSuccess) {
      showToast(["با موفقیت ثبت شد"], ToastTypes.success);
      history.push(url);
    }
  }, [useMutate.isSuccess]);

  return (
    <Card>
      <CardBody>
        <CardTitle>نامه استعلامات</CardTitle>
        <Formik
          initialValues={{ inquiries: null }}
          onSubmit={onSubmit}
          validationSchema={ISelectInquiryValidation}
        >
          {({ values, errors, setFieldValue }) => (
            <Form>
              <TwoColumn>
                <>
                  <MultiSelectOption
                    labelText="نامه ها"
                    name="inquiries"
                    onChange={(e) => setFieldValue("inquiries", e)}
                    hasLabel={true}
                    placeHolder="انتخاب کنید..."
                    options={inquiriesOptions}
                    significant
                    isLoading={allInquiries.isLoading}
                  />
                  <SubmitButton
                    isLoading={useMutate.isLoading}
                    btnText="ثبت"
                    values={values}
                    schema={ISelectInquiryValidation}
                  />
                </>
              </TwoColumn>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export { SelectRequestInquiries };
