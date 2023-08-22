import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import { showToast } from "../../../../../../../../core/utils";
import {
  DropZone,
  SubmitButton,
} from "../../../../../../../common/Form";

interface IPropsType {
  formData: any;
  getGuarantorsMutation: any;
  type: string;
  guaratorsRequirements: any;
}

const AddAttachments: React.FC<IPropsType> = ({
  formData,
  getGuarantorsMutation,
  type,
  guaratorsRequirements,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    files: null,
  });

  const guaratorsMutation = getGuarantorsMutation();
  const history = useHistory();

  const [guaranteeTypeData, setGuaranteeTypeData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "سفته" },
        { value: 2, label: "چک" },
      ],
    },
  ]);

  const { id } = useParams<{ id: string }>();

  const onSubmit = (value: any) => {
    if (!value.files || !(value.files.length > 0)) {
      return showToast(["لطفا اسناد مورد نیاز را انتخاب کنید!"], "error");
    } else if (!formData || !(formData.length > 0)) {
      return showToast(["لطفا ابتدا ضامن ها را وارد کنید!"], "error");
    } else if (formData.length < guaratorsRequirements.guarantorCount) {
      return showToast(
        [
          `حداقل تعداد ضامن ها می تواند ${guaratorsRequirements.guarantorCount} باشد!`,
        ],
        ToastTypes.error
      );
    }

    const formDataObj = new FormData();
    formDataObj.append("PositionRequestId", id);

    for (let i = 0; i < value.files.length; i++) {
      formDataObj.append(`attachments`, value.files[i]);
    }

    for (let i = 0; i < formData.length; i++) {
      const guarantorObject: any = {
        guaranteeType: formData[i].guaranteeType,
        guaranteeTypeNumber: formData[i].number,
        fullName: formData[i].sponsorName,
        nationalCode: formData[i].nationalCode,
        phoneNumber: formData[i].phoneNumber,
        gender: formData[i].gender,
        amount: formData[i].price,
        doDate: formData[i].date,
        homePhone: formData[i].telephone,
        Addres: formData[i].address,
        WorkAddres: formData[i].workAddress,
        postalCode: formData[i].postalCode,
      };
      // console.log(formData);

      if (formData[i].guarantorsFiles) {
        for (let j = 0; j < formData[i].guarantorsFiles.length; j++) {
          formDataObj.append(
            `guarantors[${i}].Files`,
            formData[i].guarantorsFiles[j]
          );
        }
      }

      Object.keys(guarantorObject).map(function (key) {
        formDataObj.append(`guarantors[${i}].${key}`, guarantorObject[key]);
      });
    }

    guaratorsMutation.mutate(formDataObj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        if (type === "mainlocation") {
          history.push(
            `/ManageRequests/SecretariatJobRequestslist/ConfirmMainLocation/${id}`
          );
        } else if (type === "province") {
          history.push(
            `/ManageRequests/SecretariatJobRequestslist/ConfirmProvince/${id}`
          );
        } else if (type === "county") {
          history.push(
            `/ManageRequests/SecretariatJobRequestslist/ConfirmCounty/${id}`
          );
        } else if (type === "union") {
          history.push(
            `/ManageRequests/SecretariatJobRequestslist/ConfirmUnion/${id}`
          );
        }
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>ثبت نهایی</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            //validationSchema={}
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
                    <Row>
                      <Col md="4">
                        <DropZone name="files" lableText="انتخاب فایل ضمیمه" />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <SubmitButton
                          isLoading={guaratorsMutation.isLoading}
                          //schema={ContractSubmitValidate}
                          values={values}
                          initialValue={initialValues}
                          btnText="ثبت نهایی"
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

export { AddAttachments };
