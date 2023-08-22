import { Formik, Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes, UserRoles } from "../../../../../../core/enums";
import { GuildsActivation } from "../../../../../../core/enums/guilds-activation-status.enums";
import {
  useSetMainLocationGuildRoomDocument,
  useShowServeGuildRoomFileByAdmins,
  useShowServeMainLocationGuildRoomFileByAdmins,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { GoToTruePage } from "../../../../../../core/utils/context/StatusProvider";
import { isSameString } from "../../../../../../core/utils/same-string.utils";
import {
  RegisteryDocsValidate,
  MergedCountyDocsValidate,
  MergedProvicneDocsValidate,
} from "../../../../../../core/validations/registery-docs.validations";
import { FileInput, FormDivider, SubmitButton, TextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { Can } from "../../../../../common/Wrapper/Can/Can";
import { StatusWrapper } from "../../../../../common/Wrapper/StatusWrapper/StatusWrapper";

interface IPropTypes {
  isAdd?: boolean;
  getProvince?: any;
  getCounty?: any;
  requestDetail?: any;
  type: string;
  refetch: any;
  isDetail?: boolean;
}

const RegisteryDocs: FC<IPropTypes> = ({
  isAdd,
  getProvince,
  getCounty,
  requestDetail,
  type,
  refetch,
  isDetail,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    Name: "",
    stablishNumber: "",
    nationalId: "",
    economicCode: "",
    newspaperNumber: "",
    files: null,
    logoFiles:null,
    province: null,
  });

  const [province, setProvince] = useState<any>([]);
  const [county, setCounty] = useState<any>([]);
  const [polyLine, setPolyline] = useState<{ lat: number; lng: number }[]>([]);

  const { req_id }: any = useParams();

  useEffect(() => {
    if (requestDetail) {
      setInitialValues((old: any) => ({
        ...old,
        Name: requestDetail.name,
        stablishNumber: requestDetail.registrationNumber,
        nationalId: requestDetail.nationalId,
        economicCode: requestDetail.economicCode,
        newspaperNumber: requestDetail.officialNewspaperNumber,
      }));
    }
  }, [requestDetail]);

  const serveMainLocationFile = useShowServeMainLocationGuildRoomFileByAdmins();
  const [fileServer, setFileServer] = useState<Blob[]>([]);
  const [fileServerName, setFileServerName] = useState<File[]>([]);
  const [logoFileServer, setLogoFileServer] = useState<Blob[]>([]);
  const [logoFileServerName, setLogoFileServerName] = useState<File[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (requestDetail) {
        const files = requestDetail.ducumentFiles;
        const filesObj: any = [];
        await files.forEach(async (file: string) => {
          filesObj.push({
            fileName: file,
            guildRoomRequestId: requestDetail.id,
            isUnion: isSameString(type, "union"),
            isMainLocation:true,
          });
          let result: any = {};

          result = await serveMainLocationFile.mutateAsync({
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

      if (requestDetail) {
        const logoFiles = requestDetail.logoImageFilePath;
        const logoFilesObj: any = [];

        logoFilesObj.push({
          fileName: logoFiles,
          guildRoomRequestId: requestDetail.id,
          isUnion: isSameString(type, "union"),
          isMainLocation: true,
        });
        let result: any = {};

        result = await serveMainLocationFile.mutateAsync({
          fileName: logoFiles,
          guildRoomRequestId: requestDetail.id,
        });

        try {
          const logoFileBlob = new Blob([result.data]);
          const logoFileUpload = new File(
            [logoFileBlob],
            "untitled." + logoFiles.split(".").pop()
          );

          setLogoFileServer((old: Blob[]) => [...old, logoFileBlob]);
          setLogoFileServerName((old: File[]) => [...old, logoFileUpload]);
        } catch (error) {}

        setInitialValues((old: any) => ({
          ...old,
          logoFiles: logoFilesObj,
        }));
      }
    };

    loadData();
  }, [requestDetail]);


  const setMainLocationDoc = useSetMainLocationGuildRoomDocument();

  const history = useHistory();

  const onSubmit = (value: any) => { 
    if (!value.files || !(value.files.length > 0)) {
      return showToast(["لطفا اسناد مورد نیاز را انتخاب کنید!"], "error");
    }
    if (!value.logoFiles || !(value.logoFiles.length > 0)) {
      return showToast(["لطفا فایل لوگو را انتخاب کنید!"], "error");
    }


    const formData = new FormData();

    if (value.logoFiles && !value.logoFiles[0].fileName)
      value.logoFiles.forEach((file: any) => {
        formData.append(`LogoImageFile`, file);
      });

    else if ( logoFileServerName.length > 0)
      logoFileServerName.forEach((img: any) => {
        formData.append("LogoImageFile", img);
      });



    if (value.files && !value.files[0].fileName)
      value.files.forEach((file: any) => {
        formData.append(`Files`, file);
      });
    else if (fileServerName.length > 0)
      fileServerName.forEach((img: any) => {
        formData.append("Files", img);
      });
    if (value.province) {
      formData.append(`ProvinceId`, value.province.value);
    }

    if (value.county) {
      formData.append("CountyId", value.county.value);
    }


    formData.append("Name", value.Name);
    formData.append("RegistrationNumber", value.stablishNumber);
    formData.append("NationalId", value.nationalId);
    formData.append("EconomicCode", value.economicCode);
    formData.append("OfficialNewspaperNumber", value.newspaperNumber);
    formData.append("PositionLat", value.latitude);
    formData.append("PositionLong", value.longitude);

    formData.append("BankShabaNumber", value.bankShabaNumber);
    formData.append("BankAcountNumber", value.bankAcountNumber );
    formData.append("BankName", value.bankName);
    formData.append("BankBranchName", value.bankBranchName);
    formData.append("BankBranchCode", value.bankBranchCode);


    setMainLocationDoc.mutate(formData, {
      onSuccess: (data) => {
        showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
      },
    });
  };

  return (
    <>
      <Card>
        {!isDetail && (
          <CardHeader>
            <CardTitle>
              {isAdd
                ? getProvince
                  ? "درخواست اتاق استانی"
                  : isSameString(type, "County")
                  ? "درخواست اتاق شهرستانی"
                  : "درخواست اتاق اتحادیه"
                : "اسناد ثبتی"}
            </CardTitle>
          </CardHeader>
        )}
        <CardBody>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={
              isAdd
                ? isSameString(type, "province")
                  ? MergedProvicneDocsValidate
                  : isSameString(type, "county")
                  ? MergedCountyDocsValidate
                  : RegisteryDocsValidate
                : RegisteryDocsValidate
            }
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
                <>
                  {!isAdd && refetch.isLoading ? (
                    <FallBackSpinner />
                  ) : (
                    <Form>
                      <>
                        <Row>
                          {isAdd && (
                            <Col sm="4">
                              {getProvince ? (
                                <BasicSelectOption
                                  data={province}
                                  name="province"
                                  lableText="استان"
                                  significant={!isDetail}
                                  isLoading={
                                    getProvince && getProvince.isLoading
                                  }
                                  placeHolder="استان مورد نظر را انتخاب کنید..."
                                  isDisabled={isDetail}
                                />
                              ) : (
                                <BasicSelectOption
                                  data={county}
                                  name="county"
                                  lableText="شهرستان"
                                  significant={!isDetail}
                                  isDisabled={isDetail}
                                  isLoading={getCounty && getCounty.isLoading}
                                  placeHolder="شهرستان مورد نظر را انتخاب کنید..."
                                />
                              )}
                            </Col>
                          )}
                          <Col sm="4">
                            <TextInput
                              id="Name"
                              lableText={
                                isSameString(type, "Union")
                                  ? "نام اتحادیه"
                                  : "نام صنف"
                              }
                              name="Name"
                              placeholder={
                                isSameString(type, "Union")
                                  ? "نام اتحادیه را وارد کنید"
                                  : "نام صنف را وارد کنید"
                              }
                              significant={!isDetail}
                              disabled={isDetail}
                            />
                          </Col>
                          <Col sm="4">
                            <TextInput
                              id="economicCode"
                              lableText="کد اقتصادی"
                              name="economicCode"
                              placeholder="کد اقتصادی را وارد کنید"
                              significant={!isDetail}
                              disabled={isDetail}
                            />
                          </Col>
                          <Col sm="4">
                            <TextInput
                              id="stablishNumber"
                              lableText="شماره آگهی ثبتی تاسیس یا تغییر"
                              name="stablishNumber"
                              placeholder="شماره آگهی ثبتی تاسیس یا تغییر را وارد کنید"
                              significant={!isDetail}
                              disabled={isDetail}
                            />
                          </Col>
                          <Col sm="4">
                            <TextInput
                              id="nationalId"
                              lableText="شناسه ملی"
                              name="nationalId"
                              placeholder="شناسه ملی خود را وارد کنید"
                              significant={!isDetail}
                              disabled={isDetail}
                            />
                          </Col>

                          <Col sm="4">
                            <TextInput
                              id="newspaperNumber"
                              lableText="شماره روزنامه رسمی"
                              name="newspaperNumber"
                              placeholder="شماره روزنامه رسمی را وارد کنید"
                              significant={!isDetail}
                              disabled={isDetail}
                            />
                          </Col>

                          <Col sm="4">
                            <FileInput
                              files={values.files}
                              outLine
                              fileServer={fileServer}
                              isServerFile={true}
                              disabled={isDetail}
                              accept="image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
                              setFieldValue={(val: any) =>
                                setFieldValue("files", val)
                              }
                            />
                          </Col>

                          <Col sm="4">
                            <FileInput
                              files={values.logoFiles}
                              name="logoFiles"
                              isSingle={true}
                              inputText="بارگزاری لوگو"
                              outLine
                              fileServer={logoFileServer}
                              isServerFile={true}
                              disabled={isDetail}
                              accept="image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
                              setFieldValue={(val: any) =>
                                setFieldValue("logoFiles", val)
                              }
                            />
                          </Col>
                        </Row>

                        {!isDetail && (
                          <Row>
                            <Col>
                              <Can roles={[UserRoles.Admin]}>
                                <SubmitButton
                                  isLoading={setMainLocationDoc.isLoading}
                                  schema={
                                    getProvince
                                      ? MergedProvicneDocsValidate
                                      : getCounty
                                      ? MergedCountyDocsValidate
                                      : RegisteryDocsValidate
                                  }
                                  values={values}
                                  btnText={!isAdd ? "ویرایش اطلاعات" : "ثبت"}
                                  initialValue={initialValues}
                                />
                              </Can>
                            </Col>
                          </Row>
                        )}
                      </>
                    </Form>
                  )}
                </>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { RegisteryDocs };
