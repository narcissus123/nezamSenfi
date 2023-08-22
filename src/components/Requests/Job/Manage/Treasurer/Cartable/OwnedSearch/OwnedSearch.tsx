import { Col, Row } from "reactstrap";
import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";

import {
  ModernDatePicker,
  SubmitButton,
} from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { CanRenderByPath } from "../../../../../../common/Wrapper/CanRenderByPath/CanRenderByPath";
import { statusTypeRequest } from "../../../../../../../core/data/status-requests.data";

interface IPropTypes {
  ownedProvince?: any;
  ownedCounty?: any;
  ownedUnion?: any;
  ownedMainLocation?: any;
  isLoading: boolean;
  onSearch: (obj: any) => void;
  isAllGuildRoom?: boolean;
}

const OwnedSearch: FC<IPropTypes> = ({
  ownedProvince,
  ownedCounty,
  isLoading,
  ownedUnion,
  ownedMainLocation,
  onSearch,
  isAllGuildRoom,
}) => {
  const MainLocationUrls = [
    "/ManageCartable/MainLocationTreasurerJobRequestCartable",
  ];

  const ProvinceUrls = [
    "/ManageCartable/ProvinceTreasurerJobRequestCartable",
  ];

  const CountyUrls = [
    "/ManageCartable/CountyTreasurerJobRequestCartable",
  ];

  const UnionUrls = [
    "/ManageCartable/UnionTreasurerJobRequestCartable",
  ];

  const yearOfServicesData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "1 سال" },
        { value: 2, label: "2 سال" },
        { value: 3, label: "3 سال" },
        { value: 4, label: "4 سال" },
        { value: 5, label: "5 سال" },
        { value: 6, label: "6 تا 10 سال" },
        { value: 7, label: "11 تا 15 سال" },
        { value: 8, label: "16 تا 20 سال" },
        { value: 9, label: "21 تا 25 سال" },
        { value: 10, label: "26 تا 30 سال" },
      ],
    },
  ];

  const [mainLocation, setMainLocation] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
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
  const [union, setUnion] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [rankStatusData, setRankStatusData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "رتبه A" },
        { value: 2, label: "رتبه B" },
        { value: 3, label: "رتبه C" },
        { value: 4, label: "فاقد رتبه" },
      ],
    },
  ]);

  const defaultValue = {
    province: null,
    county: null,
    union: null,
    mainLocation: null,
    payDate: "",
    status: null,
  };

  const [initialValues, setInitialValues] = useState({
    province: null,
    county: null,
    union: null,
    mainLocation: null,
    payDate: "",
    status: null,
  });

  const [
    employmentLicenseStatusData,
    setEmploymentLicenseStatusData,
  ] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دارای اعتبار" },
        { value: 2, label: "فاقد اعتبار" },
      ],
    },
  ]);

  useEffect(() => {
    if (
      ownedMainLocation &&
      ownedMainLocation.data &&
      ownedMainLocation.data.data
    ) {
      const result = ownedMainLocation.data.data.result;

      let mainLocation2: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((item: any) => {
        mainLocation2[0].options.push({ value: item.id, label: item.title });
      });
      setMainLocation(mainLocation2);
      if (!isAllGuildRoom)
        setInitialValues((state: any) => {
          return {
            ...state,
            mainLocation: mainLocation2[0].options[0],
          };
        });
    }
  }, [ownedMainLocation ? ownedMainLocation.isSuccess : false]);
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
        province2[0].options.push({ value: item.id, label: item.title });
      });
      setProvince(province2);
      if (!isAllGuildRoom)
        setInitialValues((state: any) => {
          return {
            ...state,
            province: province2[0].options[0],
          };
        });
    }
  }, [ownedProvince ? ownedProvince.isSuccess : false]);

  useEffect(() => {
    if (ownedCounty && ownedCounty.data && ownedCounty.data.data) {
      const result = ownedCounty.data.data.result;

      let county2: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        county2[0].options.push({ value: county.id, label: county.title });
      });
      setCounty(county2);
      if (!isAllGuildRoom)
        setInitialValues((state: any) => {
          return {
            ...state,
            county: county2[0].options[0],
          };
        });
    }
  }, [ownedCounty ? ownedCounty.isSuccess : false]);

  useEffect(() => {
    if (ownedUnion && ownedUnion.data && ownedUnion.data.data) {
      const result = ownedUnion.data.data.result.unions;
      let unions: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((union: any) => {
        unions[0].options.push({
          value: union.id,
          label: union.unionTitle,
        });
      });
      setUnion(unions);
      if (!isAllGuildRoom)
        setInitialValues((state: any) => {
          return {
            ...state,
            union: unions[0].options[0],
          };
        });
    }
  }, [ownedUnion ? ownedUnion.isSuccess : false]);

  const onSubmit = (value: any) => {
    onSearch(value);
  };

  const onClear = (resetForm: any, values: any) => {
    onSearch({
      ...defaultValue,
      province: values.province,
      county: values.county,
      union: values.union,
      mainLocation: values.mainLocation,
    });
    setInitialValues({
      ...defaultValue,
      province: values.province,
      county: values.county,
      union: values.union,
      mainLocation: values.mainLocation,
    });
    resetForm();
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
            <Col md="3">
              <CanRenderByPath url={MainLocationUrls}>
                <BasicSelectOption
                  data={mainLocation}
                  name="mainLocation"
                  hasLabel
                  lableText="کشور"
                  isLoading={
                    ownedMainLocation ? ownedMainLocation.isLoading : false
                  }
                  placeHolder="انتخاب کنید..."
                />
              </CanRenderByPath>
              <CanRenderByPath url={ProvinceUrls}>
                <BasicSelectOption
                  data={province}
                  name="province"
                  hasLabel
                  lableText="استان"
                  isLoading={ownedProvince ? ownedProvince.isLoading : false}
                  placeHolder="انتخاب کنید..."
                />
              </CanRenderByPath>

              <CanRenderByPath url={CountyUrls}>
                <BasicSelectOption
                  data={county}
                  name="county"
                  hasLabel
                  lableText="شهرستان"
                  placeHolder="انتخاب کنید..."
                  isLoading={ownedCounty ? ownedCounty.isLoading : false}
                />
              </CanRenderByPath>

              <CanRenderByPath url={UnionUrls}>
                <BasicSelectOption
                  data={union}
                  name="union"
                  hasLabel
                  lableText="اتحادیه"
                  placeHolder="انتخاب کنید..."
                  isLoading={ownedUnion ? ownedUnion.isLoading : false}
                />
              </CanRenderByPath>
            </Col>
            <Col sm="3">
              <ModernDatePicker
                lableText="تاریخ پرداخت"
                name="payDate"
                clearable
                hasMaximum
                placeholder="تاریخ را وارد کنید"
              />
            </Col>
            <Col sm="3">
              <BasicSelectOption
                placeHolder="انتخاب کنید ..."
                name="status"
                data={statusTypeRequest}
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
