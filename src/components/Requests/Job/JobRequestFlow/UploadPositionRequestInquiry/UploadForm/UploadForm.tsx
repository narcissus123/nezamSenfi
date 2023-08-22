import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Alert, Col, FormGroup, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { useServeFileByAdmins } from "../../../../../../core/services/api";
import { IsIncludes, showToast } from "../../../../../../core/utils";
import { SimpleSubmitButton, TextArea } from "../../../../../common/Form";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { FileUpload } from "../../FileUpload/FileUpload";

export interface JobRequestProps {
  index: number;
  inquiryList: any;
  files: any;
  setFormData: (val: any) => void;
  serverFile: File[];
}

const UploadForm: React.FC<JobRequestProps> = ({
  index,
  setFormData,
  inquiryList,
  files,
  serverFile,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    letterTitle: inquiryList ? inquiryList.letterTitle : "",
    id: null,
    creditStartDate: null,
    appendix: "",
    letterCotent: "",
    letterNumber: null,
  });

  const [isAdded, setIsAdded] = useState(true);

  const getFile = useServeFileByAdmins();

  const history = useHistory();
  const location = useLocation();

  const { req_id, id, status = "1" }: any = useParams();

  useEffect(() => {
    if (!initialValues.files) {
      setInitialValues({
        letterTitle: inquiryList ? inquiryList.letterTitle : "",
        id: inquiryList ? inquiryList.id : null,
        creditStartDate: inquiryList ? inquiryList.creditStartDate : "",
        appendix: inquiryList ? inquiryList.appendix : "",
        letterCotent: inquiryList ? inquiryList.letterCotent : "",
        letterNumber: inquiryList ? inquiryList.letterNumber : null,
      });
    }
  }, [inquiryList]);

  const [isLoading, setIsLoading] = useState(false);

  const setOnEdit = () => {
    setFormData((val: any) => {
      const newVal = val.filter((item: any) => item.id !== index);
      return [...newVal];
    });

    setIsAdded(true);
  };

  const onSubmit = async (value: any) => {
    if (
      (!value.files || !(value.files.length > 0)) &&
      serverFile.length === 0
    ) {
      return showToast(["لطفا اسناد مورد نیاز را انتخاب کنید!"], "error");
    } else {
      setIsLoading(true);
      setFormData((val: any) => {
        const newVal = val.filter((item: any) => item.id !== index);
        return [...newVal, { id: index, value: value }];
      });
      setIsLoading(false);
      showToast(["ذخیره گردید"], ToastTypes.success);
      setIsAdded(false);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        //validationSchema={JobFlowUploadDocumentsValidate}
        onSubmit={(value: any) => onSubmit(value)}
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
            <Form key={index}>
              <>
                {status && +status === 12 && !isAdded && (
                  <Alert color="info">با موفقیت ذخیره گردید</Alert>
                )}
                <Row>
                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <TextInput
                          lableText="عنوان نامه"
                          name="letterTitle"
                          placeholder="عنوان نامه ثبت شده"
                          disabled
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <TextInput
                          lableText="شماره ثبت نامه"
                          name="letterNumber"
                          disabled
                          placeholder="شماره ثبت نامه"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <TextArea
                          lableText="متن نامه"
                          name="letterCotent"
                          placeholder="متن نامه"
                          disabled
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <TextInput
                          name="appendix"
                          placeholder="پیوست نامه"
                          hasLabel
                          lableText="پیوست"
                          disabled
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <TextInput
                            lableText="تاریخ شروع اعتبار"
                            name="creditStartDate"
                            placeholder="تاریخ شروع اعتبار"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    {status > 12 &&
                    IsIncludes(location.pathname, "UploadInquiry") ? (
                      <></>
                    ) : (
                      <Row>
                        <Col md="12">
                          <FileUpload
                            files={values.files ? values.files : files}
                            color="info"
                            getFileMutation={getFile}
                            disabled={
                              IsIncludes(
                                location.pathname,
                                "UploadProvinceInquiry"
                              ) ||
                              IsIncludes(
                                location.pathname,
                                "UploadCountyInquiry"
                              ) ||
                              IsIncludes(
                                location.pathname,
                                "UploadUnionInquiry"
                              ) ||
                              IsIncludes(
                                location.pathname,
                                "UploadMainLocationInquiry"
                              ) ||
                              status > 12
                                ? true
                                : !isAdded
                                ? true
                                : false
                            }
                            inputText="بارگذاری اسناد"
                            accept="image/jpeg, image/png, image/jpg, image/tif,image/tiff"
                            setFieldValue={(val: any) =>
                              setFieldValue("files", val)
                            }
                          />
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>

                {!IsIncludes(location.pathname, "UploadProvinceInquiry") &&
                  !IsIncludes(location.pathname, "UploadCountyInquiry") &&
                  !IsIncludes(location.pathname, "UploadUnionInquiry") &&
                  !IsIncludes(
                    location.pathname,
                    "UploadMainLocationInquiry"
                  ) && (
                    <>
                      <SubmitButton
                        isLoading={isLoading}
                        submitOutLine
                        isDisabled={!isAdded ? true : false}
                        btnText="ثبت موقت"
                        clearable
                        noSubmit={+status > 12}
                        clearableTxt="مشاهده نامه"
                        onClear={() =>
                          window.open(
                            `/ManageRequests/ApplicantRequest/${
                              req_id ? req_id : id
                            }/letter/${inquiryList.id}`,
                            "_blank"
                          )
                        }
                      />

                      {!isAdded && (
                        <SimpleSubmitButton
                          className="mt-1"
                          isLoading={false}
                          btnText="ویرایش استعلام"
                          outLine
                          onCLick={setOnEdit}
                          type="button"
                        />
                      )}
                    </>
                  )}

                {+status > 12 && (
                  <SubmitButton
                    isLoading={false}
                    submitOutLine
                    type={+status > 12 ? "button" : "submit"}
                    btnText="مشاهده نامه"
                    onClick={() =>
                      window.open(
                        `/ManageRequests/ApplicantRequest/${
                          req_id ? req_id : id
                        }/letter/${inquiryList.id}`,
                        "_blank"
                      )
                    }
                  />
                )}
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { UploadForm };
