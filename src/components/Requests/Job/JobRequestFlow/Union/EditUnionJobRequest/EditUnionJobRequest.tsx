import { Formik } from "formik";
import React, { FC, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { EditJobFlowUnionDetailsValidate } from "../../../../../../core/validations/jobflow-union-details.validations";
import BreadCrumbs from "../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { FormDivider } from "../../../../../common/Form";
import { UploadDocuments } from "../../UploadDocuments/UploadDocuments";
import { Details } from "./Details";

const EditUnionJobRequest: FC = () => {
  const [initialValues, setInitialValues] = useState<any>({
    serviceType: { value: 1, label: "" },
    rankStatus: null,
    employmentLicense: "",
    employmentLicenseStatus: null,
    activityLicenseStatus: "",
    examCertificateStatus: "",
    yearOfServices: null,
    tradeUnionLicenseStatus: 0,
    certificateExaminationStatus: 0,
  });

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="درخواست شغل"
        breadCrumbParent="لیست درخواست ها"
        parentLink="/Requests/UnionJobRequest/List"
        breadCrumbActive="ویرایش اطلاعات"
      />
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={EditJobFlowUnionDetailsValidate}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <Card>
            <CardBody>
              <FormDivider textHeader="اطلاعات">
                <CardBody>
                  <Details
                    values={values}
                    setInitialValues={setInitialValues}
                  />
                </CardBody>
              </FormDivider>
            </CardBody>
            <hr style={{ margin: "0 30px" }} />
            <CardBody>
              <UploadDocuments
                detailValues={values}
                validate={EditJobFlowUnionDetailsValidate}
                redirectLink="/Requests/UnionJobRequest/List"
              />
            </CardBody>
          </Card>
        )}
      </Formik>
    </>
  );
};

export { EditUnionJobRequest };
