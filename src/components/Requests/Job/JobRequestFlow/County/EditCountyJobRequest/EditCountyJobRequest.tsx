import { Formik } from "formik";
import React, { FC, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { EditJobFlowCountyDetailsValidate } from "../../../../../../core/validations/jobflow-county-details.validations";
import BreadCrumbs from "../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { FormDivider } from "../../../../../common/Form";
import { UploadDocuments } from "../../UploadDocuments";
import { Details } from "./Details";

const EditCountyJobRequest: FC = () => {
  const [initialValues, setInitialValues] = useState<any>({
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
        parentLink="/Requests/CountyJobRequest/List"
        breadCrumbActive="ویرایش اطلاعات"
      />
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={EditJobFlowCountyDetailsValidate}
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
                validate={EditJobFlowCountyDetailsValidate}
                redirectLink="/Requests/CountyJobRequest/List"
              />
            </CardBody>
          </Card>
        )}
      </Formik>
    </>
  );
};

export { EditCountyJobRequest };
