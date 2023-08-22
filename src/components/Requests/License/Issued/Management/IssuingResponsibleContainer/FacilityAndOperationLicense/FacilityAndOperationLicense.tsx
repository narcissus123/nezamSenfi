import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { DocumentTypeEnum } from "../../../../../../../core/enums/document-category-type.enum";
import { LicenseRequestStatusEnum } from "../../../../../../../core/enums/license-request-status.enums";
import {
  useGetDocumentByDocumentCategoryTypeEnum,
  useRejectByIssuingResponsibleAfterJahadRejection,
  useSendToJahad,
  useSetFacilityAndOperationLicense,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { FacilityAndOperationLicenseValidate } from "../../../../../../../core/validations/facility-and-operation.validation";
import {
  DropZone,
  ModernDatePicker,
  MultiSelectOption,
  SubmitButton,
  TextInput,
} from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { StatusWrapper } from "../../../../../../common/Wrapper/StatusWrapper/StatusWrapper";
import { SendToJahadModal } from "../SendToJahadModal/SendToJahadModal";
import { ConfirmJahadIdea } from "./ConfirmJahadIdea/ConfirmJahadIdea";

const FacilityAndOperationLicense: FC = () => {
  const [initialValue, setInitialValue] = useState<any>({
    FacilityAndOperationDocumentIds: null,
    FacilityAndOperationLicenseNumber: "",
    FacilityAndOperationLicenseIssuingDate: "",
    FacilityAndOperationLicenseStatus: null,
    Files: null,
    IsHaveFacilityAndOperationLicense: true,
  });

  const [isSendToJahad, setIsSendToJahad] = useState<boolean>(false);
  const [isConfirmingJahadIdea, setIsConfirmingJahadIdea] =
    useState<boolean>(false);
  const [isRejectingRequest, setIsRejectingRequest] = useState<boolean>(false);

  const history = useHistory();
  let { id, status } = useParams<any>();

  const [
    FacilityAndOperationDocumentIdsData,
    setFacilityAndOperationDocumentIdsData,
  ] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
      
      ],
    },
  ]);

  const [
    FacilityAndOperationLicenseStatusData,
    setFacilityAndOperationLicenseStatusData,
  ] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دارای اعتبار" },
        { value: 2, label: "فاقد اعتبار" },
      ],
    },
  ]);

  const getLicenseTypeMutation = useGetDocumentByDocumentCategoryTypeEnum();

  useEffect(() => {
    getLicenseTypeMutation.mutate(DocumentTypeEnum.ActivityLicense, {
      onSuccess: (val: any) => {
        const result = val.data.result;
        const newLicenseTypes: any = [];
        result.forEach((category: any) => {
          let opt: any = [];
          category.documents.forEach((row: any) => {
            opt.push({ value: row.documentId, label: row.documentTitle });
          });

          newLicenseTypes.push({ label: category.categoryTitle, options: opt });
        });
        setFacilityAndOperationDocumentIdsData(newLicenseTypes);
      },
    });
  }, []);

  const setMutation = useSetFacilityAndOperationLicense();

  const onSubmit = (values: any) => {
    if (!values.Files || !(values.Files.length > 0)) {
      showToast(["لطفا فایل را انتخاب کنید!"], ToastTypes.error);
      return;
    }

    const formData = new FormData();
    for (let file of values.Files) {
      formData.append(`Files`, file);
    }

    for (let i = 0; i < values.FacilityAndOperationDocumentIds.length; i++) {
      formData.append(`FacilityAndOperationDocumentIds[${i}]`, values.FacilityAndOperationDocumentIds[i].value);
    }
    
    formData.append(
      "FacilityAndOperationLicenseNumber",
      values.FacilityAndOperationLicenseNumber
    );
    formData.append(
      "FacilityAndOperationLicenseIssuingDate",
      values.FacilityAndOperationLicenseIssuingDate
    );
    formData.append(
      "FacilityAndOperationLicenseStatus",
      values.FacilityAndOperationLicenseStatus.value
    );
    formData.append(
      "IsHaveFacilityAndOperationLicense",
      values.IsHaveFacilityAndOperationLicense
    );
    formData.append("LicenseRequestId", id);

    setMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        history.push("/ManageLicense/IssuingResponsible/MyCartable");
      },
    });
  };

  return (
    <>
      <Card>
        <SendToJahadModal
          title="ارسال به جهاد"
          isOpen={isSendToJahad}
          toggleModal={() => setIsSendToJahad(false)}
          sendMutation={useSendToJahad}
        />

        <ConfirmJahadIdea
          title="رد درخواست"
          isOpen={isRejectingRequest}
          toggleModal={() => setIsRejectingRequest(false)}
          sendMutation={useRejectByIssuingResponsibleAfterJahadRejection}
        />
        <CardHeader>
          <CardTitle>ورود اطلاعات مجوز بهره برداری</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={FacilityAndOperationLicenseValidate}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="4">
                        <MultiSelectOption
                          options={FacilityAndOperationDocumentIdsData}
                          name="FacilityAndOperationDocumentIds"
                          hasLabel
                          labelText="نوع مجوز"
                          significant={false}
                          onChange={(e) => setFieldValue("FacilityAndOperationDocumentIds", e)}
                          isLoading={getLicenseTypeMutation.isLoading}
                          placeHolder="نوع مجوز را انتخاب کنید"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <TextInput
                          id="FacilityAndOperationLicenseNumber"
                          lableText="شماره مجوز"
                          name="FacilityAndOperationLicenseNumber"
                          placeholder="شماره مجوز"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <ModernDatePicker
                          lableText="تاریخ صدور"
                          name="FacilityAndOperationLicenseIssuingDate"
                          placeholder="تاریخ صدور"
                          hasMaximum={false}
                          initialValue={
                            initialValue.FacilityAndOperationLicenseIssuingDate
                          }
                          significant
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <BasicSelectOption
                          data={FacilityAndOperationLicenseStatusData}
                          name="FacilityAndOperationLicenseStatus"
                          lableText="وضعیت اعتبار مجوز"
                          placeHolder="انتخاب کنید..."
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <DropZone name="Files" lableText="پیوست اسناد مجوز" />
                      </Col>
                    </Row>

                    <Row>
                      <StatusWrapper
                        curStatus={[status]}
                        guildStatus={[
                          LicenseRequestStatusEnum.AcceptedDoucumnets,
                        ]}
                      >
                        <Col md="auto">
                          <SubmitButton
                            btnText="ذخیره"
                            isLoading={setMutation.isLoading}
                            initialValue={initialValue}
                            schema={FacilityAndOperationLicenseValidate}
                            values={values}
                            isDisabled={setMutation.isLoading}
                            clearable
                            clearableTxt="ارسال به جهاد"
                            isClearableLoading={false}
                            onClear={() => setIsSendToJahad(true)}
                          />
                        </Col>
                      </StatusWrapper>

                      <StatusWrapper
                        curStatus={[status]}
                        guildStatus={[
                          LicenseRequestStatusEnum.WatingForIssuingResponsibleRejectionOfJahadIdea,
                        ]}
                      >
                        <Col md="auto">
                          <SubmitButton
                            btnText="ذخیره"
                            isLoading={setMutation.isLoading}
                            initialValue={initialValue}
                            schema={FacilityAndOperationLicenseValidate}
                            values={values}
                            isDisabled={setMutation.isLoading}
                            clearable
                            clearableTxt="رد درخواست"
                            isClearableLoading={false}
                            onClear={() => setIsRejectingRequest(true)}
                          />
                        </Col>
                      </StatusWrapper>
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

export { FacilityAndOperationLicense };
