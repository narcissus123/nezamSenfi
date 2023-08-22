import React, { useEffect, useState } from "react";
import { Col, Button, Alert, CardBody } from "reactstrap";
import { Formik, Form, FieldArray } from "formik";

import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
} from "../../../common/Form";
import { TextArea } from "../../../common/Form";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ChangeCell } from "../../../common/ChangeCell/ChangeCell";
import { LegalContactInfoValidate } from "../../../../core/validations/contact-info.validations";
import {
  useGetAllCitiesWithPartByCountyId,
  useGetAllVillagesWithPartByCountyId,
  useUpdateUserContact,
  useGetLocationInformation,
  useGetAllCountyByProvinceId,
  useGetAllprovinceByMainLocationId,
  useUserLegalContact,
} from "../../../../core/services/api";
import { SubmitButton } from "../../../common/Form";
import { ISetRealContactInfo } from "../../../../core/models";
import { ObjectPersianToEnglish } from "../../../../core/utils";
import { useGlobalState } from "../../../../core/utils/context/GlobalContext";
import { FieldWrapper } from "../../../common/Form";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";

import Styled from "./LegalContactInfo.module.scss";

const LegalContactInfo = () => {
  const [province, setProvince] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [township, setTownship] = useState<any>([
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
  const [village, setVillage] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const { data, isFetching, isLoading, isSuccess } = useUserLegalContact();

  const getAllprovince = useGetAllprovinceByMainLocationId();
  const getAllcounty = useGetAllCountyByProvinceId();
  const getAllcity = useGetAllCitiesWithPartByCountyId();
  const getAllvillage = useGetAllVillagesWithPartByCountyId();
  const LocationInfo: any = useGetLocationInformation();

  const { mainLocationId } = useGlobalState();

  useEffect(() => {
    getAllprovince.mutate(mainLocationId[0]);
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

  const [modal, setModal] = useState(false);

  const [initialValues, setInitialValues] = useState<any>({
    addresses: [
      {
        province: null,
        township: null,
        city: { value: 0, label: "انتخاب کنید..." },
        homePhone: "",
        postalCode: "",
        village: { value: 0, label: "انتخاب کنید..." },
        address: "",
      },
    ],
    email: "",
    cellphone: "09111111111",
  });

  const getAllVillageArray = (village: any) => {
    let allVillage: any = [
      {
        label: "انتخاب کنید...",
        options: [],
      },
    ];
    try {
      village.forEach((village: any) => {
        village.villages.forEach((eachVillage: any) => {
          delete Object.assign(eachVillage, { value: eachVillage["id"] })["id"];
          delete Object.assign(eachVillage, { label: eachVillage["title"] })[
            "title"
          ];
        });

        allVillage.push({
          label: village.partTitle,
          options: village.villages,
        });
      });
    } catch (error) {}
    return allVillage;
  };

  const getAllCountyArray = (county: any) => {
    let pro: any = [
      {
        label: "انتخاب کنید...",
        options: [],
      },
    ];
    try {
      county.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
    } catch (error) {}
    return pro;
  };

  const getAllCityArray = (city: any) => {
    let allCity: any = [];

    try {
      city.forEach((county: any) => {
        county.citis.forEach((eachCity: any) => {
          delete Object.assign(eachCity, { value: eachCity["id"] })["id"];
          delete Object.assign(eachCity, { label: eachCity["title"] })["title"];
        });

        allCity.push({
          label: county.partTitle,
          options: county.citis,
        });
      });
    } catch (error) {}
    return allCity;
  };

  const [isLoadingLoc, setisLoadingLoc] = useState<boolean>(false);
  useEffect(() => {
    const loadData = async () => {
      if (isSuccess) {
        setisLoadingLoc(true);
        const values = data?.data.result;

        let addresses: any = [];

        for (let index = 0; index < values.addresses.length; index++) {
          const ad = values.addresses[index];

          let localAddress: any = {
            homePhone: ad.homePhone,
            address: ad.address,
            postalCode: ad.postalCode,
          };

          if (ad.locationId) {
            try {
              const locInfo = await LocationInfo.mutateAsync(ad.locationId);

              const county = await getAllcounty.mutateAsync(
                locInfo.data.result.provinceId
              );
              const city = await getAllcity.mutateAsync(
                locInfo.data.result.countyId
              );
              const village = await getAllvillage.mutateAsync(
                locInfo.data.result.countyId
              );

              const allVillage = getAllVillageArray(village.data.result);
              const allCounty = getAllCountyArray(county.data.result);
              const allCity = getAllCityArray(city.data.result);

              setVillage((old: any) => [...old, allVillage]);
              setTownship((old: any) => [...old, allCounty]);
              setCity((old: any) => [...old, allCity]);

              localAddress["province"] = locInfo.data.result.provinceId
                ? {
                    value: locInfo.data.result.provinceId,
                    label: locInfo.data.result.province,
                  }
                : null;

              localAddress["township"] = locInfo.data.result.countyId
                ? {
                    value: locInfo.data.result.countyId,
                    label: locInfo.data.result.county,
                  }
                : null;

              localAddress["city"] = locInfo.data.result.city
                ? {
                    value: locInfo.data.result.cityOrVillageId,
                    label: locInfo.data.result.city,
                  }
                : null;

              localAddress["village"] = locInfo.data.result.village
                ? {
                    value: locInfo.data.result.cityOrVillageId,
                    label: locInfo.data.result.village,
                  }
                : null;
            } catch (error) {}
          }

          addresses.push(localAddress);
        }

        setInitialValues((state: any) => {
          return {
            ...state,
            email: values.email,
            addresses: addresses,
            cellphone: values.cellphone,
          };
        });
        setisLoadingLoc(false);
      }
    };
    try {
      loadData();
    } catch (error) {
      setisLoadingLoc(false);
    }
  }, [isSuccess]);

  const UpdateUserContact: any = useUpdateUserContact();

  const onSubmit = async (values: any) => {
    values = ObjectPersianToEnglish(values);

    const obj: ISetRealContactInfo = {
      email: values.email,

      addresses: values.addresses.map((address: any) => ({
        postalCode: address.postalCode,
        address: address.address,
        homePhone: address.homePhone,
        locationId:
          address.city && address.city.value !== 0
            ? address.city.value
            : address.village && address.village.value !== 0
            ? address.village.value
            : address.township.value,
      })),
    };

    UpdateUserContact.mutate(obj);
  };

  const provinceOnChange = async (
    opt: any,
    e: any,
    setFieldValue: any,
    name: string,
    index: number
  ) => {
    setFieldValue(name + "province", {
      value: opt.value,
      label: opt.label,
    });
    setTownship([]);
    setFieldValue(name + "township", null);
    setFieldValue(name + "city", null);
    setFieldValue(name + "village", null);
    const countyArray = await getAllcounty.mutateAsync(opt.value);

    let county = [...township];
    const allCounty = getAllCountyArray(countyArray.data.result);
    county[index] = allCounty;
    setTownship(county);

    //setTownship([]);
    setCity([]);
    setVillage([]);
  };

  const townshipOnChange = async (
    opt: any,
    e: any,
    setFieldValue: any,
    name: string,
    index: number
  ) => {
    setFieldValue(name + "township", {
      value: opt.value,
      label: opt.label,
    });
    setCity([]);
    setVillage([]);
    setFieldValue(name + "city", null);
    setFieldValue(name + "village", null);
    const cityArray = await getAllcity.mutateAsync(opt.value);

    let localCity = [...city];
    const allCity = getAllCityArray(cityArray.data.result);
    localCity[index] = allCity;
    setCity(localCity);

    const villageArray = await getAllvillage.mutateAsync(opt.value);

    let localvillage = [...city];
    const allVillage = getAllVillageArray(villageArray.data.result);
    localvillage[index] = allVillage;
    setVillage(localvillage);
  };

  const cityOnChange = (opt: any, e: any, setFieldValue: any, name: string) => {
    setFieldValue(name + "city", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue(name + "village", null);
  };

  const villageOnChange = (
    opt: any,
    e: any,
    setFieldValue: any,
    name: string
  ) => {
    setFieldValue(name + "village", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue(name + "city", null);
  };

  return isFetching || isLoadingLoc ? (
    <FallBackSpinner />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={LegalContactInfoValidate}
      enableReinitialize={true}
      onSubmit={(value) => onSubmit(value)}
    >
      {({
        values,
        errors,
        handleChange,
        touched,
        setFieldValue,
        setFieldError,
      }) => {
        return (
          <FieldWrapper
            setFieldError={setFieldError}
            useMutate={UpdateUserContact}
          >
            <Form noValidate>
              <Alert color="info">لطفا شهر یا روستا را انتخاب کنید</Alert>
              <ChangeCell
                isOpen={modal}
                toggleModal={() => setModal((val) => !val)}
              />

              <TwoColumn>
                <TextInput
                  lableText="ايميل"
                  name="email"
                  type="email"
                  placeholder="مثلا name@email.com"
                  significant
                />
                <Col
                  md="12"
                  sm="12"
                  className={`d-flex align-items-center ${Styled["cellphone-holder"]}`}
                >
                  <TextInput
                    lableText="تلفن همراه"
                    name="cellphone"
                    type="tell"
                    placeholder="مثلا 09111231234"
                    significant
                    disabled
                    //value="09111111111"
                    className={Styled.disabled}
                  />
                  <Button
                    onClick={() => setModal(true)}
                    className={Styled["change-phone-number"]}
                    outline
                    color="warning"
                  >
                    تغییر شماره تلفن
                  </Button>
                </Col>
              </TwoColumn>

              <FieldArray
                name="addresses"
                render={(arrayHelpers) => (
                  <div>
                    {values.addresses && values.addresses.length > 0 ? (
                      values.addresses.map((friend: any, index: any) => (
                        <div key={index}>
                          <FormDivider textHeader="آدرس">
                            <CardBody>
                              <SimpleSubmitButton
                                isLoading={false}
                                type="button"
                                className="mb-1"
                                outLine
                                color="danger"
                                onCLick={() => arrayHelpers.remove(index)}
                                btnText="حذف"
                              />

                              <TwoColumn>
                                <div>
                                  <BasicSelectOption
                                    lableText="استان محل شرکت"
                                    significant={true}
                                    name={`addresses.${index}.province`}
                                    placeHolder="انتخاب کنید..."
                                    data={province}
                                    isLoading={getAllprovince.isLoading}
                                    onChange={(opt: any, e: any) =>
                                      provinceOnChange(
                                        opt,
                                        e,
                                        setFieldValue,
                                        `addresses.${index}.`,
                                        index
                                      )
                                    }
                                  />
                                  <BasicSelectOption
                                    lableText="شهرستان محل شرکت"
                                    significant={true}
                                    name={`addresses.${index}.township`}
                                    placeHolder="انتخاب کنید..."
                                    data={township ? township[index] : []}
                                    isLoading={getAllcounty.isLoading}
                                    onChange={(opt: any, e: any) =>
                                      townshipOnChange(
                                        opt,
                                        e,
                                        setFieldValue,
                                        `addresses.${index}.`,
                                        index
                                      )
                                    }
                                  />
                                  <BasicSelectOption
                                    lableText="شهر محل شرکت"
                                    significant={true}
                                    name={`addresses.${index}.city`}
                                    placeHolder="انتخاب کنید..."
                                    data={city ? city[index] : []}
                                    isLoading={getAllcity.isLoading}
                                    onChange={(opt: any, e: any) =>
                                      cityOnChange(
                                        opt,
                                        e,
                                        setFieldValue,
                                        `addresses.${index}.`
                                      )
                                    }
                                  />

                                  <TextArea
                                    lableText="آدرس دقیق پستی محل سکونت"
                                    name={`addresses.${index}.address`}
                                    placeholder="آدرس دقیق پستی محل سکونت"
                                    significant
                                  />
                                </div>

                                <div>
                                  <TextInput
                                    lableText="تلفن محل سکونت"
                                    name={`addresses.${index}.homePhone`}
                                    type="tell"
                                    placeholder="تلفن محل سکونت"
                                    significant
                                  />
                                  <TextInput
                                    lableText="کد پستي محل سکونت"
                                    name={`addresses.${index}.postalCode`}
                                    placeholder="کد پستي محل سکونت"
                                    significant
                                  />

                                  <BasicSelectOption
                                    lableText="روستاي محل شرکت"
                                    significant={true}
                                    placeHolder="انتخاب کنید..."
                                    name={`addresses.${index}.village`}
                                    data={village ? village[index] : []}
                                    isLoading={getAllvillage.isLoading}
                                    onChange={(opt: any, e: any) =>
                                      villageOnChange(
                                        opt,
                                        e,
                                        setFieldValue,
                                        `addresses.${index}.`
                                      )
                                    }
                                  />
                                </div>
                              </TwoColumn>
                            </CardBody>
                          </FormDivider>
                          {arrayHelpers.form.values.addresses.length - 1 >
                            +index && <hr />}
                        </div>
                      ))
                    ) : (
                      <SimpleSubmitButton
                        isLoading={false}
                        type="button"
                        className="mb-1"
                        outLine
                        onCLick={() =>
                          arrayHelpers.push({
                            province: null,
                            township: null,
                            city: null,
                            homePhone: "",
                            postalCode: "",
                            village: null,
                            address: null,
                          })
                        }
                        btnText="افزودن آدرس"
                      />
                    )}
                    {arrayHelpers.form.values.addresses.length > 0 && (
                      <SimpleSubmitButton
                        isLoading={false}
                        type="button"
                        className="mb-1"
                        outLine
                        onCLick={() =>
                          arrayHelpers.insert(
                            arrayHelpers.form.values.addresses.length,
                            {
                              province: null,
                              township: null,
                              city: null,
                              homePhone: "",
                              postalCode: "",
                              village: null,
                              address: null,
                            }
                          )
                        }
                        btnText="افزودن آدرس"
                      />
                    )}

                    <SubmitButton
                      isLoading={UpdateUserContact.isLoading}
                      nextTo="/PersonalInfo/LegalJobInfo"
                      backTo="/PersonalInfo/LegalIdentityInfo"
                      schema={LegalContactInfoValidate}
                      values={values}
                      initialValue={initialValues}
                    />
                  </div>
                )}
              />
            </Form>
          </FieldWrapper>
        );
      }}
    </Formik>
  );
};

export { LegalContactInfo };
