import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../core/enums";
import {
  useGetAllCitiesWithPartByCountyId,
  useGetAllCountyByProvinceId,
  useGetAllprovinceByMainLocationId,
  useGetGetAllInquiries,
} from "../../../core/services/api";
import { showToast } from "../../../core/utils";
import { SetDefaultLetterValidate } from "../../../core/validations/set-default-letter.validations";
import { SubmitButton, TextArea, TextInput } from "../../common/Form";
import BasicSelectOption from "../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { CanRenderByPath } from "../../common/Wrapper/CanRenderByPath/CanRenderByPath";
import { CardWrapper } from "../../common/Wrapper/CardWrapper/CardWrapper";

export interface IProps {
  from?: any;
  selectData: any;
  isLoading: any;
  setMutation: any;
  setLoading: any;
}

const InqueryLetterSetDefaultContainer: React.FC<IProps> = ({
  from,
  selectData,
  isLoading,
  setMutation,
  setLoading,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    defaultLetterTitle: "",
    defaultLetterContent: "",
    inquiryId: null,
    provinceId: from === "Province" ? null : { value: 0, label: "" },
    countyId: from === "County" ? null : { value: 0, label: "" },
    unionId: from === "Union" ? null : { value: 0, label: "" },
    province: from === 'MainLocation' ? { value: 0, label: "" }: null,
    county: from === 'MainLocation' ? { value: 0, label: "" }: null,
    city: from === 'MainLocation' ? { value: 0, label: "" }: null,
  });

  const [inquiryData, setInquiryData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const [province, setProvince] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [countyData, setCountyData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [city, setCity] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const getAllprovince = useGetAllprovinceByMainLocationId();
  const getAllcounty = useGetAllCountyByProvinceId();
  const getAllcity = useGetAllCitiesWithPartByCountyId();

  useEffect(() => {
    getAllprovince.mutate(1);
  }, []);

  useEffect(() => {
    if (getAllprovince.data && getAllprovince.data.data) {
      const result = getAllprovince.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setProvince(pro);
    }
  }, [getAllprovince.isSuccess]);

  useEffect(() => {
    if (getAllcity.data && getAllcity.data.data) {
      const result = getAllcity.data.data.result;

      let allCity: any = [];

      result.forEach((county: any) => {
        county.citis.forEach((eachCity: any) => {
          delete Object.assign(eachCity, { value: eachCity["id"] })["id"];
          delete Object.assign(eachCity, { label: eachCity["title"] })["title"];
        });

        allCity.push({
          label: county.partTitle,
          options: county.citis,
        });
      });
      setCity(allCity);
    }
  }, [getAllcity.isSuccess]);

  useEffect(() => {
    if (getAllcounty.data && getAllcounty.data.data) {
      const result = getAllcounty.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setCountyData(pro);
    }
  }, [getAllcounty.isSuccess]);

  const { data, isFetching, isSuccess } = useGetGetAllInquiries();

  React.useEffect(() => {
    if (data) {
      try {
        const result = data.data.result;

        let newInquiry = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];
        let newOptions: any = [];
        data.data.result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        newInquiry[0].options = newOptions;
        setInquiryData(newInquiry);
      } catch (e) {}
    }
  }, [isSuccess, data]);

  const onSubmit = (value: any) => {
    const setDefaultObject = {
      inquiryId: value.inquiryId ? value.inquiryId.value : 0,
      leterTitle: value.defaultLetterTitle,
      leterContent: value.defaultLetterTitle,
      countyUnionId: value.unionId ? value.unionId.value : 0,
      countyGuildRoomId: value.countyId ? value.countyId.value : 0,
      provinceGuildRoomId: value.provinceId ? value.provinceId.value : 0,
      cityDistinationId: value.city.value,
    };

    setMutation.mutate(setDefaultObject, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
      },
    });
  };

  const provinceOnChange = (opt: any, e: any, setFieldValue: any) => {
    getAllcounty.mutate(opt.value);
    setFieldValue("province", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("county", null);
    setFieldValue("city", { value: 0, label: "انتخاب کنید..." });
  };

  const cityOnChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("city", {
      value: opt.value,
      label: opt.label,
    });
  };

  const townshipOnChange = (opt: any, e: any, setFieldValue: any) => {
    getAllcity.mutate(opt.value);
    setFieldValue("county", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("city", { value: 0, label: "انتخاب کنید..." });
    setCity([]);
  };

  const cityOrVillageUrls = [
    "/InqueryLetters/setDefault/Province",
    "/InqueryLetters/setDefault/County",
    "/InqueryLetters/setDefault/Union",
  ];

  return (
    <>
      <CardWrapper text="ثبت محتوای پیشفرض نامه">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={SetDefaultLetterValidate}
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
                <>
                  <Row>
                    <Col md="4">
                      <BasicSelectOption
                        lableText="استعلام"
                        name="inquiryId"
                        placeHolder="انتخاب استعلام "
                        data={inquiryData}
                        isLoading={isFetching}
                        significant
                      />
                    </Col>
                    {from !== "MainLocation" && (
                      <>
                        <Col md="4">
                          {from === "Province" && (
                            <BasicSelectOption
                              lableText="اتاق صنف استانی"
                              name="provinceId"
                              placeHolder="اتاق صنف استانی را انتخاب کنید..."
                              data={selectData}
                              isLoading={isLoading}
                              significant
                            />
                          )}
                          {from === "County" && (
                            <BasicSelectOption
                              lableText="اتاق صنف شهرستاني"
                              name="countyId"
                              placeHolder="اتاق صنف شهرستاني را انتخاب کنيد..."
                              data={selectData}
                              isLoading={isLoading}
                              significant
                            />
                          )}
                          {from === "Union" && (
                            <BasicSelectOption
                              lableText="اتحادیه"
                              name="unionId"
                              placeHolder="انتخاب اتحادیه"
                              data={selectData}
                              isLoading={isLoading}
                              significant
                            />
                          )}
                        </Col>
                      </>
                    )}

                    <Col md="4">
                      <TextInput
                        lableText="موضوع پیشفرض نامه"
                        name="defaultLetterTitle"
                        placeholder="موضوع"
                        significant
                      />
                    </Col>

                    <CanRenderByPath url={cityOrVillageUrls}>
                      <Col sm="4">
                        <BasicSelectOption
                          lableText="استان مقصد"
                          significant={true}
                          name="province"
                          placeHolder="انتخاب کنید..."
                          data={province}
                          isLoading={getAllprovince.isLoading}
                          onChange={(opt: any, e: any) =>
                            provinceOnChange(opt, e, setFieldValue)
                          }
                        />
                      </Col>

                      <Col sm="4">
                        <BasicSelectOption
                          lableText="شهرستان مقصد"
                          significant={true}
                          name="county"
                          placeHolder="انتخاب کنید..."
                          data={countyData}
                          isLoading={getAllcounty.isLoading}
                          onChange={(opt: any, e: any) =>
                            townshipOnChange(opt, e, setFieldValue)
                          }
                        />
                      </Col>

                      <Col sm="4">
                        <BasicSelectOption
                          lableText="شهر مقصد"
                          significant={true}
                          name="city"
                          placeHolder="انتخاب کنید..."
                          data={city}
                          isLoading={getAllcity.isLoading}
                          onChange={(opt: any, e: any) =>
                            cityOnChange(opt, e, setFieldValue)
                          }
                        />
                      </Col>
                    </CanRenderByPath>
                  </Row>
                  <Row>
                    <Col md="4">
                      <TextArea
                        lableText="محتوای پیشفرض نامه"
                        name="defaultLetterContent"
                        placeholder="محتوا"
                        significant
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={setLoading} //addUnionGuildMutation.isLoading}
                        schema={SetDefaultLetterValidate}
                        values={values}
                        initialValue={initialValues}
                      />
                    </Col>
                  </Row>
                </>
              </Form>
            );
          }}
        </Formik>
      </CardWrapper>
    </>
  );
};

export { InqueryLetterSetDefaultContainer };
