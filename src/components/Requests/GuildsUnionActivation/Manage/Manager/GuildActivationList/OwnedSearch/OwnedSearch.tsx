import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { SubmitButton, TextInput } from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { CanRenderByPath } from "../../../../../../common/Wrapper/CanRenderByPath/CanRenderByPath";

interface IPropTypes {
  ownedProvince?: any;
  allCounty?: any;
  isLoading: boolean;
  onSearch: (obj: any) => void;
  isAllGuildRoom?: boolean;
}

const OwnedSearch: FC<IPropTypes> = ({
  ownedProvince,
  allCounty,
  isLoading,
  onSearch,
  isAllGuildRoom,
}) => {
  const ProvinceUrls = [
    "/GuildsActivation/ProvinceSecretariatGuildActivation",
    "/GuildsActivation/CountySecretariatGuildActivation",
    "/GuildsActivation/CountySecretariatCartable",
    "/GuildsActivation/ProvinceSecretariatCartable",
    "/UnionsActivation/UnionManagerCartable",
    "/UnionsActivation/UnionViceManagerCartable",
    "/UnionsActivation/UnionExecutiveManagerCartable",
    "/GuildsActivation/ProvinceManagerGuildActivation",
    "/GuildsActivation/ProvinceViceManagerGuildActivation",
    "/GuildsActivation/ProvinceExecutiveManagerGuildActivation",
    "/GuildsActivation/CountyManagerGuildActivation",
    "/GuildsActivation/CountyViceManagerGuildActivation",
    "/GuildsActivation/CountyExecutiveManagerGuildActivation",
    "/GuildsActivation/CountyManagerCartable",
    "/GuildsActivation/CountyViceManagerCartable",
    "/GuildsActivation/CountyExecutiveManagerCartable",
    "/GuildsActivation/ProvinceManagerCartable",
    "/GuildsActivation/ProvinceViceManagerCartable",
    "/GuildsActivation/ProvinceExecutiveManagerCartable",
    "/UnionsActivation/UnionManagerGuildActivation",
    "/UnionsActivation/UnionViceManagerGuildActivation",
    "/UnionsActivation/UnionExecutiveManagerGuildActivation",
  ];

  const CountyUrls = [
    "/GuildsActivation/CountySecretariatGuildActivation",
    "/GuildsActivation/CountySecretariatCartable",
    "/UnionsActivation/UnionManagerGuildActivation",
    "/UnionsActivation/UnionViceManagerGuildActivation",
    "/UnionsActivation/UnionExecutiveManagerGuildActivation",
    "/GuildsActivation/CountyManagerGuildActivation",
    "/GuildsActivation/CountyViceManagerGuildActivation",
    "/GuildsActivation/CountyExecutiveManagerGuildActivation",
    "/GuildsActivation/CountyManagerCartable",
    "/GuildsActivation/CountyViceManagerCartable",
    "/GuildsActivation/CountyExecutiveManagerCartable",
    "/UnionsActivation/UnionManagerCartable",
    "/UnionsActivation/UnionViceManagerCartable",
    "/UnionsActivation/UnionExecutiveManagerCartable",
  ];

  const [province, setProvince] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [county, setCounty] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [statusSelect, setStatusSelect] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "ثبت اسناد ثبتی شرکت و در  انتظار ثبت اعضا" },
        { value: 2, label: "ثبت اعضا و در انتظار ثبت مشخصات مکانی" },
        { value: 3, label: "ثبت مشخصات مکانی  و در انتظار ارسال نهایی" },
        { value: 4, label: "ثبت مشخصات مکانی انتظار پذیرش توسط دبیرخانه" },
        { value: 5, label: "در مرحله بررسی و تطبیق توسظ دبیرخانه" },
        {
          value: 6,
          label: "رد در خواست توسط دبیرخانه و در انتظار ویرایش اطلاعات",
        },
        { value: 7, label: "تایید درخواست توسط دبیرخانه و در انتظار نظر مدیر" },
        { value: 8, label: "در انتظار اعمال نظر مدیر توسط دبیرخانه" },
        {
          value: 9,
          label:
            "تایید توسط دبیرخانه و در انتظار فعال سازی توسط فناوری اطلاعات کشور",
        },
        { value: 10, label: "فعال سازی و پایان کار" },
        { value: 11, label: "رد درخواست به دلیل تکرار بالای درخواست" },
      ],
    },
  ]);

  const defaultValue = {
    nationalId: null,
    name: "",
    cityId: null,
    status: 0,
    province: null,
    county: null,
  };

  const [initialValues, setInitialValues] = useState({
    nationalId: null,
    name: "",
    cityId: null,
    status: 0,
    province: null,
    county: null,
  });

  useEffect(() => {
    if (ownedProvince && ownedProvince.data && ownedProvince.data.data) {
      const result = ownedProvince.data.data.result;

      let province2: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((item: any) => {
        province2[0].options.push({
          value: item.id,
          label: item.proviceTitle ? item.proviceTitle : item.title,
        });
      });
      setProvince(province2);
      if (!isAllGuildRoom)
        setInitialValues((state: any) => {
          return {
            ...state,
            province: province2[0].options[0],
          };
        });

      if (allCounty && province2[0].options.length > 0) {
        allCounty.mutate(province2[0].options[0].value);
      }
    }
  }, [ownedProvince ? ownedProvince.isSuccess : false]);

  useEffect(() => {
    if (allCounty && allCounty.data && allCounty.data.data) {
      const result = allCounty.data.data.result;

      let county2: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        county2[0].options.push({
          value: county.id,
          label: county.countyTitle ? county.countyTitle : county.title,
        });
      });
      setCounty(county2);
    }
  }, [allCounty ? allCounty.isSuccess : false]);

  const onSubmit = (value: any) => {
    onSearch(value);
  };

  const onClear = (resetForm: any, values: any) => {
    onSearch({
      ...defaultValue,
      province: values.province,
      county: values.county,
      cityId: null,
      name: values.name,
      nationalId: values.nationalId,
      status: values.status,
    });
    setInitialValues({
      ...defaultValue,
      province: values.province,
    });
    resetForm();
  };

  const handleOnProvinceChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("province", { value: opt.value, label: opt.label });
    if (allCounty) allCounty.mutate(opt.value);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ values, errors, handleChange, resetForm, setFieldValue }) => (
        <Form>
          <Row>
            <CanRenderByPath url={ProvinceUrls}>
              <Col md="4">
                <BasicSelectOption
                  data={province}
                  name="province"
                  hasLabel
                  lableText="استان"
                  isLoading={ownedProvince ? ownedProvince.isLoading : false}
                  placeHolder="انتخاب کنید..."
                  onChange={(opt: any, e: any) =>
                    handleOnProvinceChange(opt, e, setFieldValue)
                  }
                />
              </Col>
            </CanRenderByPath>
            <CanRenderByPath url={CountyUrls}>
              <Col sm="4">
                <BasicSelectOption
                  data={county}
                  name="county"
                  hasLabel
                  lableText="شهرستان"
                  placeHolder="انتخاب کنید..."
                  isLoading={allCounty ? allCounty.isLoading : false}
                />
              </Col>
            </CanRenderByPath>

            <Col sm="4">
              <TextInput
                name="name"
                placeholder="نام صنف را وارد کنید"
                hasLabel
                lableText="نام صنف"
              />
            </Col>

            <Col sm="4">
              <TextInput
                lableText="شناسه ملی"
                name="nationalId"
                placeholder="شناسه ملی را وارد کنید"
              />
            </Col>

            <Col sm="4">
              <BasicSelectOption
                placeHolder="وضعیت درخواست"
                name="status"
                data={statusSelect}
                lableText="وضعیت درخواست"
              />
            </Col>
          </Row>

          <div className="mb-2 mt-1">
            <SubmitButton
              btnText="جستجو"
              isLoading={isLoading ? isLoading : false}
              clearable
              onClear={() => onClear(resetForm, values)}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { OwnedSearch };
