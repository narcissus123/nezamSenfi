import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { DocumentTypeEnum } from "../../../../../../../core/enums/document-category-type.enum";
import { FullOptionSel } from "../../../../../../../core/models";
import { useGetDocumentByDocumentCategoryTypeEnum, useSendJahadIdeaForLicenseRequest } from "../../../../../../../core/services/api";
import {
  getCurrentJalaliDate,
  showToast,
} from "../../../../../../../core/utils";
import { SetJahadIdeaValidate } from "../../../../../../../core/validations/set-jahad-idea.validations";
import {
  DropZone,
  FormDivider,
  ModernDatePicker,
  MultiSelectOption,
  SubmitButton,
  TextInput,
} from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import TreeColumn from "../../../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import { RejectRequest } from "./RejectRequest/RejectRequest";

const SendJahadIdea: FC = () => {

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
  ] = useState<FullOptionSel[]>([
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
  
  const [isRejectByJahad, setIsRejectByJahad] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const sentJahadIdea = useSendJahadIdeaForLicenseRequest();

  const onSubmit = (values: any) => {
    const formData = new FormData();
    values.files.forEach((file: any) => {
      formData.append("Files", file);
    });

    formData.append("LicenseRequestId", id);


    for (let i = 0; i < values.FacilityAndOperationDocumentIds.length; i++) {
      formData.append(`FacilityAndOperationDocumentIds[${i}]`, values.FacilityAndOperationDocumentIds[i].value);
    }

    formData.append(
      "FacilityAndOperationLicenseNumber",
      values.facilityAndOperationLicenseNumber
    );
    formData.append(
      "FacilityAndOperationLicenseIssuingDate",
      values.facilityAndOperationLicenseIssuingDate
    );
    formData.append(
      "FacilityAndOperationLicenseStatus",
      values.facilityAndOperationLicenseStatus.value
    );
    formData.append(
      "JahadResponseLetterNumber",
      values.jahadResponseLetterNumber
    );
    formData.append("JahadResponseLetterDate", values.jahadResponseLetterDate);

    sentJahadIdea.mutate(formData, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        history.push("/ManageLicense/JahadCenterManager/MyCartable");
      },
    });
  };

  return (
    <Card>
      <CardBody>
        <FormDivider textHeader="ثبت نظر جهاد">
          <RejectRequest
            isOpen={isRejectByJahad}
            toggleModal={() => setIsRejectByJahad(false)}
            backdrop
          />
          <CardBody>
            <Formik
              initialValues={{
                FacilityAndOperationDocumentIds: null,
                facilityAndOperationLicenseNumber: "",
                facilityAndOperationLicenseIssuingDate: "",
                facilityAndOperationLicenseStatus: null,
                jahadResponseLetterNumber: "",
                jahadResponseLetterDate: "",
                files: null,
              }}
              onSubmit={onSubmit}
              validationSchema={SetJahadIdeaValidate}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <TreeColumn>
                    <>
                      <MultiSelectOption
                        options={FacilityAndOperationDocumentIdsData}
                        name="FacilityAndOperationDocumentIds"
                        hasLabel
                        labelText="نوع تسهیلات و پروانه بهره برداری"
                        significant={false}
                        onChange={(e) =>
                          setFieldValue("FacilityAndOperationDocumentIds", e)
                        }
                        isLoading={getLicenseTypeMutation.isLoading}
                        placeHolder="نوع تسهیلات و پروانه بهره برداری را وارد کنید..."
                      />

                      <BasicSelectOption
                        data={FacilityAndOperationLicenseStatusData}
                        name="facilityAndOperationLicenseStatus"
                        lableText="وضعیت و مجوز بهره برداری"
                        placeHolder="وضعیت و مجوز بهره برداری را وارد کنید..."
                        significant
                      />

                      <DropZone
                        lableText="انتخاب فایل"
                        name="files"
                        significant={true}
                      />
                    </>

                    <>
                      <TextInput
                        name="facilityAndOperationLicenseNumber"
                        placeholder="شماره تسهیلات و پروانه بهره برداری..."
                        lableText="شماره تسهیلات و پروانه بهره برداری"
                        significant
                      />
                      <TextInput
                        name="jahadResponseLetterNumber"
                        placeholder="شماره نامه پاسخ جهاد..."
                        lableText="شماره نامه پاسخ جهاد"
                        significant
                      />
                    </>

                    <>
                      <ModernDatePicker
                        name="facilityAndOperationLicenseIssuingDate"
                        lableText="تاریخ صدور پروانه بهره برداری"
                        placeholder="...تاریخ صدور پروانه بهره برداری"
                        significant
                        minimumDate={getCurrentJalaliDate()}
                        hasMaximum={false}
                      />
                      <ModernDatePicker
                        name="jahadResponseLetterDate"
                        lableText="تاریخ نامه پاسخ جهاد"
                        placeholder="...تاریخ نامه پاسخ جهاد"
                        significant
                        //minimumDate={getCurrentJalaliDate()}
                        // hasMaximum={false}
                      />
                    </>
                  </TreeColumn>

                  <SubmitButton
                    isLoading={sentJahadIdea.isLoading}
                    btnText="ثبت"
                    schema={SetJahadIdeaValidate}
                    values={values}
                    clearable
                    clearableTxt="رد کردن"
                    onClear={() => setIsRejectByJahad(true)}
                  />
                </Form>
              )}
            </Formik>
          </CardBody>
        </FormDivider>
      </CardBody>
    </Card>
  );
};

export { SendJahadIdea };
