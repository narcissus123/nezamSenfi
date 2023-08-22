import { Formik } from "formik";
import React, { FC, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { EditJobFlowMainLocationDetailsValidate } from "../../../../../../core/validations/jobflow-mainlocation-details.validations";
import BreadCrumbs from "../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { FormDivider } from "../../../../../common/Form";
import { UploadDocuments } from "../../UploadDocuments/UploadDocuments";
import { Details } from "./Details/Details";

const EditMainLocationJobRequest: FC = () => {
  const [initialValues, setInitialValues] = useState<any>({
    serviceType: { value: 2, label: "" },
    rankStatus: null,
    employmentLicense: "",
    employmentLicenseStatus: null,
    activityLicenseStatus: "",
    examCertificateStatus: "",
    yearOfServices: null,
    provine: { value: 1, label: "" },
    tradeUnionLicenseStatus: 0,
    certificateExaminationStatus: 0,
  });

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="درخواست شغل"
        breadCrumbParent="لیست درخواست ها"
        parentLink="/Requests/MainLocationJobRequest/List"
        breadCrumbActive="ویرایش اطلاعات"
      />
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={EditJobFlowMainLocationDetailsValidate}
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
                validate={EditJobFlowMainLocationDetailsValidate}
                redirectLink="/Requests/MainLocationJobRequest/List"
              />
            </CardBody>
          </Card>
        )}
      </Formik>
    </>
  );
};

export { EditMainLocationJobRequest };
