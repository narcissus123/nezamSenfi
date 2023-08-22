import * as React from "react";
import { useState } from "react";
import { Row, Col } from "reactstrap";
import { Formik, Form } from "formik";

import { ILegalJobInfo } from "../../../../../core/models";
import { TextInput } from "../../../../common/Form";
import { LegalJobInfoValidate } from "../../../../../core/validations/legal-job-info.validations";
import {
  useLegalJobInfoData,
  usePostLegalJobInfoData,
} from "../../../../../core/services/api";
import { SubmitButton } from "../../../../common/Form";
import { showToast } from "../../../../../core/utils";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { ObjectPersianToEnglish } from "../../../../../core/utils";

import Styles from "./LegalJobInfo.module.scss";

export interface JobInfoProps {}

const LegalJobInfo: React.FC<JobInfoProps> = () => {
  const [initialValues, setInitialValues] = useState<any>({
    workExperience: "",
  });

  const postLegalJobInfoDataMutation: any = usePostLegalJobInfoData();

  const { isFetching, data } = useLegalJobInfoData();

  const onSubmit = (value: any) => {
    value = ObjectPersianToEnglish(value);
    const jobObject: ILegalJobInfo = {
      workExperience:
        value.workExperience.length > 0 ? parseInt(value.workExperience) : 0,
    };

    postLegalJobInfoDataMutation.mutate(jobObject, {
      onSuccess: (data: any) => {
        typeof data.data == "object" &&
          showToast(["با موفقیت انجام شد."], "success");
        // : showToast(["مشکلی پیش آمد"], "error");
      },
      // onError: (error: any) => {
      //   showToast(["مشکلی پیش آمد"], "error");
      // },
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          workExperience: data ? data.data.result.workExperience : "",
        }}
        validationSchema={LegalJobInfoValidate}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, touched, getFieldProps }) => {
          return (
            <Form>
              {isFetching ? (
                <>
                  <FallBackSpinner />
                </>
              ) : (
                <>
                  <div className={Styles.contentContainer}>
                    <Row>
                      <Col md="4">
                        <TextInput
                          lableText="مدت سابقه کار (سال)"
                          name="workExperience"
                          placeholder=""
                          type="text"
                        />
                      </Col>
                    </Row>
                  </div>
                  <SubmitButton
                    backTo="/PersonalInfo/LegalContactInfo"
                    isLoading={postLegalJobInfoDataMutation.isLoading}
                    schema={LegalJobInfoValidate}
                    values={values}
                    initialValue={initialValues}
                  />
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { LegalJobInfo };
