import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { FullOptionSel } from "../../../../../core/models";
import { useGetAllProvinceGuildRoomsForDropDown } from "../../../../../core/services/api";
import {
  ModernDatePicker,
  MoneyMask,
  SubmitButton,
} from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  onSubmit: (val: any) => void;
  isLoading: boolean;
}

const SearchHistoryFilter: FC<IPropTypes> = ({ onSubmit, isLoading }) => {
  const [province, setProvince] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [{ value: 0, label: "پیشفرض استان ها" }],
    },
  ]);
  const [initialValue, setInitialValue] = useState<any>({
    rate: "",
    createdAt: "",
    date: "",
    province: null,
  });

  const getAllProvince = useGetAllProvinceGuildRoomsForDropDown();

  useEffect(() => {
    if (getAllProvince.isSuccess) {
      const result = getAllProvince.data.data.result;
      // console.log(result);
      const provinces: any = province;

      result.forEach((item: any) => {
        provinces[0].options.push({ value: item.id, label: item.title });
      });
      setProvince(provinces);

      setInitialValue((old: any) => ({
        ...old,
        province: { value: 0, label: "پیشفرض استان ها" },
      }));
    }
  }, [getAllProvince.isSuccess]);

  return (
    <Formik initialValues={initialValue} onSubmit={onSubmit} enableReinitialize>
      {({ errors, touched, setFieldValue, values, resetForm }) => (
        <Form>
          <Row>
            <Col sm="3">
              <MoneyMask
                lableText="مبلغ"
                name="rate"
                errors={errors}
                touched={touched}
                value={values.rate}
                onChange={(val: string) => {
                  setFieldValue("rate", val);
                }}
                placeholder="مبلغ به ریال"
              />
            </Col>

            <Col sm="3">
              <ModernDatePicker
                name="createdAt"
                initialValue={values.createdAt}
                lableText="تاریخ ثبت"
                placeholder="...تاریخ ثبت را وارد کنید"
              />
            </Col>

            <Col sm="3">
              <ModernDatePicker
                name="date"
                initialValue={values.date}
                lableText="تاریخ اعمال"
                placeholder="...تاریخ اعمال را وارد کنید"
              />
            </Col>

            <Col sm="3">
              <BasicSelectOption
                lableText="استان ها"
                hasLabel
                name="province"
                placeHolder="انتخاب کنید"
                isLoading={getAllProvince.isLoading}
                data={province}
              />
            </Col>
          </Row>
          <SubmitButton
            isLoading={isLoading}
            clearable
            clearableTxt="پاکسازی"
            btnText="جستجو"
            onClear={resetForm}
            values={values}
          />
        </Form>
      )}
    </Formik>
  );
};

export { SearchHistoryFilter };
