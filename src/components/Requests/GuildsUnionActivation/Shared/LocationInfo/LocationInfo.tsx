import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../core/enums";
import { GuildsActivation } from "../../../../../core/enums/guilds-activation-status.enums";
import {
  useGetAllCitiesWithPartByCountyId,
  useGetAllCountyByProvinceId,
  useGetLocationInformation,
  useShowServeGuildRoomFileByAdmins,
  useShowServeUnionFileByAdmins,
} from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { GoToTruePage } from "../../../../../core/utils/context/StatusProvider";
import { isSameString } from "../../../../../core/utils/same-string.utils";
import { UnionsLocationInfoValidate } from "../../../../../core/validations/unions-location-info.validations";
import {
  FileInput,
  SubmitButton,
  TextArea,
  TextInput,
} from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { StatusWrapper } from "../../../../common/Wrapper/StatusWrapper/StatusWrapper";
import { LandDetails } from "./LandDetails/LandDetails";

interface IPropTypes {
  locationInfoMutation: any;
  setRequestId?: any;
  requestDetail: any;
  type: any;
  refetch: any;
}

const LocationInfo: FC<IPropTypes> = ({
  locationInfoMutation,
  setRequestId,
  requestDetail,
  type,
  refetch,
}) => {
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
  const [polyLine, setPolyline] = useState<{ lat: number; lng: number }[]>([]);

  const [initialValues, setInitialValues] = useState<any>({
    province: null,
    township: null,
    city: null,
    address: "",
    postalCode: "",
    phone: "",
    fax: "",
    email: "",
    files: null,
    longitude: "",
    latitude: "",
  });

  const locationMutation = locationInfoMutation();
  const getLocationInformationMutation = useGetLocationInformation();

  const { req_id: id }: any = useParams();

  useEffect(() => {
    if(setRequestId){
      setRequestId(id);
    }
  }, [id]);

  useEffect(() => {
    if (requestDetail) {
      setInitialValues({
        address: requestDetail.address,
        postalCode: requestDetail.postalCode,
        phone: requestDetail.phone,
        email: requestDetail.email,
        fax: requestDetail.fax,
        province: {
          value: requestDetail.requestedProvinceId,
          label: requestDetail.requestedProvinceTitle,
        },
        township: !isSameString(type, "province")
          ? {
              value: requestDetail.requestedLocationId,
              label: requestDetail.requestedLocationTitle,
            }
          : null,
        longitude: requestDetail.positionLong,
        latitude: requestDetail.positionLat,
      });

      let newFiles: any = [];
      if (requestDetail.locationFiles) {
        requestDetail.locationFiles.forEach((row: any) => {
          newFiles.push({
            fileName: row,
            guildRoomRequestId: id,
            isUnion: isSameString(type, "union"),
          });
        });
      }

      setInitialValues((prev: any) => {
        return { ...prev, files: newFiles };
      });

      if (requestDetail && requestDetail.cityId) {
        getLocationInformationMutation.mutate(requestDetail.cityId, {
          onSuccess: (val: any) => {
            const result = val.data.result;
            // setInitialValues((prev: any) => {
            //   return {
            //     ...prev,
            //     province: { value: result.provinceId, label: result.province },
            //   };
            // });
            getAllcounty.mutate(result.provinceId, {
              onSuccess: (val: any) => {
                const resultCounty = val.data.result;
                setInitialValues((prev: any) => {
                  return {
                    ...prev,
                    township: { value: result.countyId, label: result.county },
                  };
                });
                getAllcity.mutate(result.countyId, {
                  onSuccess: (val: any) => {
                    const resultCity = val.data.result;
                    setInitialValues((prev: any) => {
                      return {
                        ...prev,
                        city: {
                          value: result.cityOrVillageId,
                          label: result.city,
                        },
                      };
                    });
                  },
                });
              },
            });
          },
        });
      } else {
        getAllcounty.mutate(requestDetail.requestedProvinceId);
        if (!isSameString(type, "province")) {
          getAllcity.mutate(requestDetail.requestedLocationId);
        }
      }
    }
  }, [requestDetail]);

  // const { data, isSuccess, isFetching } = useGetAllprovinces();
  const getAllcounty = useGetAllCountyByProvinceId();
  const getAllcity = useGetAllCitiesWithPartByCountyId();

  const history = useHistory();

  // useEffect(() => {
  //   if (data) {
  //     let queryData: any = data;
  //     let newOptions: any = [];
  //     let newProvinces = [
  //       {
  //         label: "سرلیست استان",
  //         options: [],
  //       },
  //     ];

  //     queryData.data.result.forEach((row: any) => {
  //       newOptions.push({ value: row.id, label: row.title });
  //     });
  //     newProvinces[0].options = newOptions;
  //     setProvince(newProvinces);
  //     // getAllcounty.mutate()
  //   }
  // }, [isSuccess, data]);

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
      setTownship(pro);
    }
  }, [getAllcounty.isSuccess, getAllcounty.data]);

  const [fileServer, setFileServer] = useState<Blob[]>([]);
  const [fileServerName, setFileServerName] = useState<File[]>([]);

  const serveFile = useShowServeGuildRoomFileByAdmins();
  const serveUnionFile = useShowServeUnionFileByAdmins();

  useEffect(() => {
    const loadData = async () => {
      if (requestDetail) {
        setFileServer([]);
        setFileServerName([]);
        const files = requestDetail.locationFiles;
        const filesObj: any = [];
        await files.forEach(async (file: any) => {
          filesObj.push({
            fileName: file,
            guildRoomRequestId: requestDetail.id,
            isUnion: isSameString(type, "union"),
          });
          let result: any = {};
          if (isSameString(type, "union")) {
            result = await serveUnionFile.mutateAsync({
              fileName: file,
              guildRoomRequestId: requestDetail.id,
            });
          } else if (type)
            result = await serveFile.mutateAsync({
              fileName: file,
              guildRoomRequestId: requestDetail.id,
            });

          try {
            const fileBlob = new Blob([result.data]);
            const fileUpload = new File(
              [fileBlob],
              "untitled." + file.split(".").pop()
            );

            setFileServer((old: Blob[]) => [...old, fileBlob]);
            setFileServerName((old: File[]) => [...old, fileUpload]);
          } catch (error) {}
        });
        setInitialValues((old: any) => ({
          ...old,
          files: filesObj,
        }));
      }
    };

    loadData();
  }, [requestDetail]);

  const onSubmit = (value: any) => {
    if (!value.files || !(value.files.length > 0)) {
      return showToast(["لطفا اسناد مورد نیاز را انتخاب کنید!"], "error");
    }

    const formData = new FormData();

    // console.log("servefiles", fileServer);
    // console.log("files", value.files);

    if (value.files && !value.files[0].fileName) {
      value.files.forEach((file: File) => {
        formData.append(`Files`, file);
      });
    } else if (fileServerName.length > 0) {
      fileServerName.forEach((img: any) => {
        formData.append("Files", img);
      });
    }

    formData.append("CountyId", value.township.value);
    formData.append("ProvinceId", value.province.value);
    formData.append("Id", id);
    formData.append("CityId", value.city.value);
    formData.append("Address", value.address);
    formData.append("PostalCode", value.postalCode);
    formData.append("Phone", value.phone);
    formData.append("Email", value.email);
    formData.append("Fax", value.fax);
    formData.append("PositionLat", value.latitude);
    formData.append("PositionLong", value.longitude);

    locationMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], ToastTypes.success);
        refetch.mutate(+id);
        if (isSameString(type, "union") && requestDetail.status !== 7) {
          GoToTruePage(3, "UnionApplicantFlow", id);
        } else if (isSameString(type, "County") && requestDetail.status !== 7)
          history.push("/GuildsActivation/County/3/LocationInfo/" + id);
        else if (isSameString(type, "province") && requestDetail.status !== 7)
          history.push("/GuildsActivation/Province/3/LocationInfo/" + id);
      },
    });
  };

  // const provinceOnChange = (opt: any, e: any, setFieldValue: any) => {
  //   getAllcounty.mutate(opt.value);
  //   setFieldValue("province", {
  //     value: opt.value,
  //     label: opt.label,
  //   });
  //   setFieldValue("township", null);
  //   setFieldValue("city", { value: 0, label: "انتخاب کنید..." });
  //   setTownship([]);
  //   setCity([]);
  // };

  const townshipOnChange = (opt: any, e: any, setFieldValue: any) => {
    getAllcity.mutate(opt.value);
    setFieldValue("township", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("city", { value: 0, label: "انتخاب کنید..." });
    setCity([]);
  };

  // const cityOnChange = (opt: any, e: any, setFieldValue: any) => {
  //   setFieldValue("city", {
  //     value: opt.value,
  //     label: opt.label,
  //   });
  // };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>مشخصات مکانی</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={UnionsLocationInfoValidate}
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
                    {refetch.isLoading ? (
                      <FallBackSpinner />
                    ) : (
                      <>
                        <Row>
                          <Col md="4">
                            <Row>
                              <Col>
                                <TextInput
                                  lableText="طول جغرافیایی"
                                  name="longitude"
                                  placeholder="عرض (متر)"
                                  significant
                                  type="number"
                                  hasInfo
                                  infoUniqueId="longitudeHint"
                                  infoTitle="راهنما"
                                  info="می تواند از نقشه موجود در انتهای صفحه مختصات مورد نظر را انتخاب کنید."
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <TextInput
                                  lableText="عرض جغرافیایی"
                                  name="latitude"
                                  placeholder="مساحت (متر)"
                                  significant
                                  type="number"
                                  hasInfo
                                  infoUniqueId="latitudeHint"
                                  infoTitle="راهنما"
                                  info="می تواند از نقشه موجود در انتهای صفحه مختصات مورد نظر را انتخاب کنید."
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <BasicSelectOption
                                  lableText="استان"
                                  significant={true}
                                  placeHolder="انتخاب کنید..."
                                  name="province"
                                  data={province}
                                  isDisabled
                                  // isLoading={isFetching}
                                  // onChange={(opt: any, e: any) =>
                                  //   provinceOnChange(opt, e, setFieldValue)
                                  // }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <BasicSelectOption
                                  lableText="شهرستان"
                                  significant={true}
                                  placeHolder="انتخاب کنید..."
                                  name="township"
                                  data={township}
                                  isLoading={getAllcounty.isLoading}
                                  onChange={(opt: any, e: any) =>
                                    townshipOnChange(opt, e, setFieldValue)
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <BasicSelectOption
                                  lableText="شهر مرکزی شهرستان"
                                  significant={true}
                                  placeHolder="انتخاب کنید..."
                                  name="city"
                                  data={city}
                                  isLoading={getAllcity.isLoading}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col md="4">
                            <Row>
                              <Col>
                                <TextInput
                                  id="postalCode"
                                  lableText="کد پستی"
                                  name="postalCode"
                                  significant
                                  placeholder="کد پستی خود را وارد کنید"
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <TextInput
                                  id="phone"
                                  lableText="تلفن"
                                  name="phone"
                                  placeholder="مثل 091111111"
                                  significant
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <TextArea
                                  lableText="آدرس"
                                  name="address"
                                  placeholder="آدرس را وارد کنید"
                                  significant
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col md="4">
                            <Row>
                              <Col>
                                <TextInput
                                  id="fax"
                                  lableText="فکس"
                                  name="fax"
                                  placeholder="فکس را وارد کنید"
                                  significant
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <TextInput
                                  id="email"
                                  lableText="ایمیل"
                                  name="email"
                                  placeholder="مثل example@email.com"
                                  significant
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FileInput
                                  removeServedFiles={() => {
                                    setFileServer([]);
                                  }}
                                  files={values.files}
                                  outLine
                                  fileServer={fileServer}
                                  isServerFile={true}
                                  accept="image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
                                  setFieldValue={(val: any) => {
                                    setFieldValue("files", val);
                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <StatusWrapper
                              curStatus={[
                                requestDetail ? requestDetail.status : 1,
                              ]}
                              guildStatus={[
                                GuildsActivation.AddedDocument,
                                GuildsActivation.AddedMember,
                                GuildsActivation.AddedLocation,
                                GuildsActivation.RjectedBySecretariat,
                              ]}
                            >
                              <SubmitButton
                                isLoading={locationMutation.isLoading}
                                schema={UnionsLocationInfoValidate}
                                values={values}
                                initialValue={initialValues}
                              />
                            </StatusWrapper>
                          </Col>
                        </Row>
                      </>
                    )}

                    <Row>
                      <Col md="12">
                        <LandDetails
                          requestDetail={requestDetail}
                          point={{
                            lat: values.latitude,
                            lng: values.longitude,
                          }}
                          setPoint={(point) => {
                            setFieldValue("longitude", point.lng);
                            setFieldValue("latitude", point.lat);
                          }}
                          setPolyline={setPolyline}
                          polyLine={polyLine}
                        />
                      </Col>
                    </Row>
                  </>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { LocationInfo };
