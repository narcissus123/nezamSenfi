import { Col, Row } from "reactstrap";
import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";

import {
  ModernDatePicker,
  SubmitButton,
  TextInput,
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
  getLocationListMutation: any;
}

const OwnedSearch: FC<IPropTypes> = ({
  ownedProvince,
  ownedCounty,
  isLoading,
  ownedUnion,
  ownedMainLocation,
  onSearch,
  isAllGuildRoom,
  getLocationListMutation,
}) => {
  const ProvinceUrls = ["/ManageCartable/ProvinceUpManagerJobRequestCartable"];

  const CountyUrls = ["/ManageCartable/CountyUpManagerJobRequestCartable"];

  const UnionUrls = ["/ManageCartable/UnionUpManagerJobRequestCartable"];

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
    startCreateDate: "",
    endCreateDate: "",
    userNationalCode: "",
    employmentLicenseStatus: null,
    ratingStatus: null,
    historyOfServiceAfterGraduation: null,
    ratingTitle: "",
    status: null,
  };

  const [initialValues, setInitialValues] = useState({
    province: null,
    county: null,
    union: null,
    mainLocation: null,
    startCreateDate: "",
    endCreateDate: "",
    userNationalCode: "",
    employmentLicenseStatus: null,
    ratingStatus: null,
    historyOfServiceAfterGraduation: null,
    ratingTitle: "",
    status: null,
  });

  const [employmentLicenseStatusData, setEmploymentLicenseStatusData] =
    useState<any>([
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
      setProvince(mainLocation2);
    }
  }, [ownedMainLocation ? ownedMainLocation.isSuccess : false]);

  useEffect(() => {
    if (ownedProvince && ownedProvince.data && ownedProvince.data.data) {
      try {
        const provinceResult = ownedProvince.data.data.result;

        let province2: any = [
          {
            label: "انتخاب کنید...",
            options: [],
          },
        ];
        provinceResult.forEach((province: any) => {
          province2[0].options.push({
            value: province.id,
            label: province.title,
          });
        });
        setProvince(province2);

        console.log("-- be inja reside --");

        setInitialValues((state: any) => {
          return {
            ...state,
            province: {
              value: provinceResult[0].id,
              label: provinceResult[0].title,
            },
          };
        });
      } catch (e) {}
    }
  }, [ownedProvince ? ownedProvince.isSuccess : false]);

  useEffect(() => {
    if (ownedProvince && ownedProvince.data && ownedProvince.data.data) {
      try {
        const countyResult =
          getLocationListMutation.data.data.result.countyGuildRooms;
        let county2: any = [
          {
            label: "انتخاب کنید...",
            options: [],
          },
        ];
        countyResult.forEach((county: any) => {
          county2[0].options.push({ value: county.id, label: county.title });
        });
        setCounty(county2);
      } catch (e) {}
    }
  }, [getLocationListMutation ? getLocationListMutation.isSuccess : false]);

  useEffect(() => {
    if (ownedCounty && ownedCounty.data && ownedCounty.data.data) {
      try {
        const countyResult = ownedCounty.data.data.result;

        let county2: any = [
          {
            label: "انتخاب کنید...",
            options: [],
          },
        ];
        countyResult.forEach((county: any) => {
          county2[0].options.push({ value: county.id, label: county.title });
        });
        setCounty(county2);
        setInitialValues((state: any) => {
          return {
            ...state,
            county: { value: countyResult[0].id, label: countyResult[0].title },
          };
        });
        const unionResult = getLocationListMutation.data.data.result;
        setInitialValues((state: any) => {
          return {
            ...state,
            union: {
              value: unionResult.unions[0].id,
              label: unionResult.unions[0].unionTitle,
            },
          };
        });
        let union2: any = [
          {
            label: "انتخاب کنید...",
            options: [],
          },
        ];
        unionResult.unions.forEach((union: any) => {
          union2[0].options.push({ value: union.id, label: union.unionTitle });
        });
        setUnion(union2);
      } catch (e) {}
    }
  }, [ownedCounty ? ownedCounty.isSuccess : false]);

  useEffect(() => {
    if (ownedCounty && ownedCounty.data && ownedCounty.data.data) {
      try {
        const unionResult = getLocationListMutation.data.data.result;
        let union2: any = [
          {
            label: "انتخاب کنید...",
            options: [],
          },
        ];
        unionResult.unions.forEach((union: any) => {
          union2[0].options.push({
            value: union.id,
            label: union.unionTitle,
          });
        });
        setUnion(union2);
      } catch (e) {}
    }
  }, [getLocationListMutation ? getLocationListMutation.isSuccess : false]);

  const onSubmit = (value: any) => {
    onSearch(value);
  };

  const onClear = (resetForm: any, values: any) => {
    onSearch({
      ...defaultValue,
      province: values.province,
      county: values.county,
      union: values.union,
      mainLocationId: values.mainLocationId,
    });
    setInitialValues({
      ...defaultValue,
      province: values.province,
      county: values.county,
      union: values.union,
      mainLocation: values.mainLocation,
      startCreateDate: "",
      endCreateDate: "",
      employmentLicenseStatus: null,
      ratingStatus: null,
      historyOfServiceAfterGraduation: null,
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
              <CanRenderByPath url={ProvinceUrls}>
                <BasicSelectOption
                  data={province}
                  name="province"
                  hasLabel
                  lableText="استان"
                  isLoading={
                    ownedMainLocation ? ownedMainLocation.isLoading : false
                  }
                  placeHolder="انتخاب کنید..."
                />
              </CanRenderByPath>

              <CanRenderByPath url={CountyUrls}>
                <BasicSelectOption
                  data={province}
                  name="province"
                  hasLabel
                  lableText="استان"
                  isLoading={ownedProvince ? ownedProvince.isLoading : false}
                  placeHolder="انتخاب کنید..."
                  onChange={(opt, e) => {
                    setFieldValue("province", {
                      value: opt.value,
                      label: opt.label,
                    });
                    setFieldValue("county", null);
                    setCounty([]);
                    getLocationListMutation.mutate(opt.value, {
                      onSuccess: (val: any) => {
                        try {
                          console.log("----- loggg--", val);
                          const countyResult = val.data.result.countyGuildRooms;
                          let county2: any = [
                            {
                              label: "انتخاب کنید...",
                              options: [],
                            },
                          ];
                          countyResult.forEach((county: any) => {
                            county2[0].options.push({
                              value: county.id,
                              label: county.title,
                            });
                          });
                          setCounty(county2);
                        } catch (e) {}
                      },
                    });
                  }}
                />
              </CanRenderByPath>
              <CanRenderByPath url={UnionUrls}>
                <BasicSelectOption
                  data={county}
                  name="county"
                  hasLabel
                  lableText="شهرستان"
                  placeHolder="انتخاب کنید..."
                  isLoading={ownedCounty ? ownedCounty.isLoading : false}
                  onChange={(opt, e) => {
                    setFieldValue("county", {
                      value: opt.value,
                      label: opt.label,
                    });
                    setFieldValue("union", null);
                    setUnion([]);
                    getLocationListMutation.mutate(
                      {
                        page: 1,
                        pageSize: 500,
                        countyId: opt.value,
                      },
                      {
                        onSuccess: (val: any) => {
                          try {
                            const unionResult = val.data.result;

                            let union2: any = [
                              {
                                label: "انتخاب کنید...",
                                options: [],
                              },
                            ];
                            unionResult.unions.forEach((union: any) => {
                              union2[0].options.push({
                                value: union.id,
                                label: union.unionTitle,
                              });
                            });
                            setUnion(union2);
                          } catch (e) {}
                        },
                      }
                    );
                  }}
                />
              </CanRenderByPath>
            </Col>
            <CanRenderByPath url={[...CountyUrls, ...UnionUrls]}>
              <Col md="3">
                <CanRenderByPath url={CountyUrls}>
                  <BasicSelectOption
                    data={county}
                    name="county"
                    hasLabel
                    lableText="شهرستان"
                    placeHolder="انتخاب کنید..."
                    isLoading={
                      getLocationListMutation
                        ? getLocationListMutation.isLoading
                        : false
                    }
                  />
                </CanRenderByPath>

                <CanRenderByPath url={UnionUrls}>
                  <BasicSelectOption
                    data={union}
                    name="union"
                    hasLabel
                    lableText="اتحادیه"
                    placeHolder="انتخاب کنید..."
                    isLoading={
                      getLocationListMutation
                        ? getLocationListMutation.isLoading
                        : false
                    }
                  />
                </CanRenderByPath>
              </Col>
            </CanRenderByPath>

            <Col sm="3">
              <TextInput
                name="userNationalCode"
                placeholder="نام کاربری"
                hasLabel
                lableText="کد ملی یا شناسه"
              />
            </Col>

            <Col sm="3">
              <ModernDatePicker
                lableText="از تاریخ"
                name="startCreateDate"
                clearable
                hasMaximum
                placeholder="تاریخ را وارد کنید"
              />
            </Col>
            <Col sm="3">
              <ModernDatePicker
                lableText="تا تاریخ"
                name="endCreateDate"
                clearable
                hasMaximum
                placeholder="تاریخ را وارد کنید"
              />
            </Col>

            <Col sm="3">
              <BasicSelectOption
                placeHolder="وضعیت پروانه اشتغال"
                name="employmentLicenseStatus"
                data={employmentLicenseStatusData}
                lableText="وضعیت پروانه اشتغال"
              />
            </Col>

            <Col sm="3">
              <BasicSelectOption
                placeHolder="وضعیت رتبه"
                name="ratingStatus"
                data={rankStatusData}
                lableText="وضیعیت رتبه"
              />
            </Col>
            <Col sm="3">
              <BasicSelectOption
                placeHolder="انتخاب کنید ..."
                name="historyOfServiceAfterGraduation"
                data={yearOfServicesData}
                lableText="سابقه خدمت پس از تحصیل"
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
