import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import {
  useServeLicenseRequestFileWithoutDownload,
  useSetExpertIdeaLicenseRequest,
  useSetExpertIdeaLicenseRequestSection,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { ExpertDescriptionValidation } from "../../../../../../../core/validations/expert-description.validation";
import {
  FileInput,
  SubmitButton,
  TextArea,
} from "../../../../../../common/Form";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { CardWrapper } from "../../../../../../common/Wrapper/CardWrapper/CardWrapper";
import { SendExpertizingToMatching } from "./SendExpertizingToMatching/SendExpertizingToMatching";

interface ISetType {
  description: string;
  files: File[] | null;
}

interface IPropTypes {
  useGetDescriptionLicenseRequest: any;
  isExpert?: boolean;
}

const ExpertDescription: FC<IPropTypes> = ({
  useGetDescriptionLicenseRequest,
  isExpert,
}) => {
  const [initialValues, setInitialValues] = useState<ISetType>({
    description: "",
    files: null,
  });

  const { req_id, section_id } =
    useParams<{ req_id: string; section_id: string }>();

  const getDetails = useGetDescriptionLicenseRequest(
    section_id ? +section_id : req_id
  );
  const serveFile = useServeLicenseRequestFileWithoutDownload();
  const setIdeaSection = useSetExpertIdeaLicenseRequestSection();
  const setIdea = useSetExpertIdeaLicenseRequest();

  const loadData = async () => {
    try {
      const result = getDetails.data.data.result;
      console.log(result);

      const files: string[] = result.files;

      let localFiles: File[] = [];

      for (let index = 0; index < files.length; index++) {
        const served = await serveFile.mutateAsync({
          fileName: files[index],
          licenseRequestId: req_id,
        });

        const blob = served.data.result;
        const exportFile: File = new File([blob], files[index]);

        localFiles.push(exportFile);
      }

      setInitialValues({
        description: result.idea,
        files: localFiles,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (getDetails.isSuccess) {
      loadData();
    }
  }, [getDetails.isSuccess]);

  const onSubmit = (value: ISetType) => {
    const formData = new FormData();

    if (value.files) {
      value.files.forEach((file) => formData.append("Files", file));
    }

    formData.append("Idea", value.description);

    if (section_id) {
      formData.append("SectionId", section_id);
    } else formData.append("LicenseRequestId", req_id);

    section_id
      ? setIdeaSection.mutate(formData, {
          onSuccess: () => {
            showToast(["با موفقیت انجام شد"], ToastTypes.success);
          },
        })
      : setIdea.mutate(formData, {
          onSuccess: () => {
            showToast(["با موفقیت انجام شد"], ToastTypes.success);
          },
        });
  };

  return (
    <CardWrapper text="توضیحات کارشناس">
      {getDetails.isLoading || serveFile.isLoading ? (
        <FallBackSpinner setHeight={300} />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={isExpert ? onSubmit : () => {}}
          enableReinitialize
          validationSchema={ExpertDescriptionValidation}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Row>
                <Col sm="6">
                  <TextArea
                    lableText="توضیحات"
                    name="description"
                    placeholder="توضیحات را وارد کنید..."
                    significant
                    disabled={!isExpert}
                  />
                </Col>
                {/* 
              <Col sm="6">
                <DropZone
                  significant
                  name="files"
                  lableText="فایل ها"
                  placeholder="فایل ها را انتخاب کنید یا در این قسمت بکشید..."
                />
              </Col> */}

                <Col sm="6">
                  <FileInput
                    files={values.files}
                    outLine
                    disabled={!isExpert}
                    inputText="بارگذاری فایل"
                    setFieldValue={(val: any) => {
                      setFieldValue("files", val);
                    }}
                  />
                </Col>

                {isExpert && (
                  <Col sm="12">
                    <SubmitButton
                      isLoading={setIdeaSection.isLoading || setIdea.isLoading}
                      btnText="ثبت"
                      values={values}
                      schema={ExpertDescriptionValidation}
                    />
                  </Col>
                )}
              </Row>
            </Form>
          )}
        </Formik>
      )}
      <Row>
        <Col>
          <SendExpertizingToMatching />
        </Col>
      </Row>
    </CardWrapper>
  );
};

export { ExpertDescription };
