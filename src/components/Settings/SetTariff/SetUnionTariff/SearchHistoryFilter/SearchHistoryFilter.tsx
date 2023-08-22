import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { FullOptionSel } from "../../../../../core/models";
import {
  useGetAllCountyGuildRoomsByProvinceIdForDropDown,
  useGetAllProvinceGuildRoomsForDropDown,
  useGetAllUnioinByCountyGuildroomIdForDropDown,
} from "../../../../../core/services/api";
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
    county: null,
    union: null,
  });
  const [disableCounty, setDisableCounty] = useState<boolean>(true);
  const [disableUnion, setDisableUnion] = useState<boolean>(true);
  const [union, setUnion] = useState<FullOptionSel[]>([]);
  const [county, setCounty] = useState<FullOptionSel[]>([]);

  const getAllProvince = useGetAllProvinceGuildRoomsForDropDown();
  const getAllCountyByProvinceIdMutation =
    useGetAllCountyGuildRoomsByProvinceIdForDropDown();
  const getAllUnionByCountyIdMutation =
    useGetAllUnioinByCountyGuildroomIdForDropDown();

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

  const handleOnProvinceChange = (e: any, setFieldValue: any) => {
    if (e.value !== 0) {
      setDisableCounty(false);
      getAllCountyByProvinceIdMutation.mutate(e.value, {
        onSuccess: (val) => {
          let counties: any = [
            {
              label: "انتخاب کنید...",
              options: [{ value: 0, label: "پیشفرض در استان" }],
            },
          ];
          val.data.result.forEach((row: any) => {
            counties[0].options.push({
              value: row.id,
              label: row.title,
            });
          });

          setCounty(counties);
        },
      });
    } else {
      setDisableCounty(true);
      setFieldValue("county", null);
    }

    setFieldValue("province", e);
  };

  const handleOnCountyChange = (e: any, setFieldValue: any, values: any) => {
    setFieldValue("county", e);
    if (e.value !== 0) {
      setDisableUnion(false);
      getAllUnionByCountyIdMutation.mutate(e.value, {
        onSuccess: (val) => {
          let counties: any = [
            {
              label: "انتخاب کنید...",
              options: [{ value: 0, label: "پیشفرض در شهرستان" }],
            },
          ];

          val.data.result.forEach((row: any) => {
            counties.push({
              value: row.countyUnionId,
              label: row.title,
            });
          });

          setUnion(counties);
        },
      });

      setFieldValue("union", {
        value: 0,
        label: "پیشفرض در شهرستان",
      });
    } else {
      setDisableUnion(true);
      setFieldValue("union", null);
    }
  };

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
                onChange={(opt) => handleOnProvinceChange(opt, setFieldValue)}
              />
            </Col>

            <Col sm="3">
              <BasicSelectOption
                lableText="شهرستان ها"
                hasLabel
                name="county"
                isDisabled={disableCounty}
                onChange={(opt) =>
                  handleOnCountyChange(opt, setFieldValue, values)
                }
                placeHolder="انتخاب کنید"
                isLoading={getAllCountyByProvinceIdMutation.isLoading}
                data={county}
              />
            </Col>

            <Col sm="3">
              <BasicSelectOption
                lableText="اتحادیه ها"
                hasLabel
                name="union"
                isDisabled={disableUnion || disableCounty}
                placeHolder="انتخاب کنید"
                isLoading={getAllUnionByCountyIdMutation.isLoading}
                data={union}
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
