import { Form, Formik } from "formik";
import React, { FC } from "react";
import { Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import { LatLngValidate } from "../../../../../../../core/validations/lat-lng.validations";
import {
  SimpleSubmitButton,
  SubmitButton,
  TextInput,
} from "../../../../../../common/Form";

interface IPropTypes {
  setTableData: (val: any) => void;
  oldData: any;
  countyPolygon: any
}

const AddLatLng: FC<IPropTypes> = ({ setTableData, oldData, countyPolygon }) => {
  const onSubmit = (value: any, { resetForm }: any) => {
    

    // if(!PointInPolygon(value , countyPolygon)){
    //   return showToast(["مختصات وارد شده خارج از شهرستان می باشد!"], ToastTypes.error);
    // }

    const dataTable: any = {
      id: oldData.length + 1,
      lat: value.lat,
      lng: value.lng,
    };

    setTableData((old: any) => [...old, dataTable]);
    resetForm();
  };

  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{ lat: "", lng: "" }}
          onSubmit={onSubmit}
          validationSchema={LatLngValidate}
        >
          {({ submitForm }) => (
            <Form>
              <Row>
                <Col sm="3">
                  <TextInput
                    name="lat"
                    placeholder="عرض جغرافیایی"
                    lableText="عرض جغرافیایی"
                    significant
                  />
                </Col>

                <Col sm="3">
                  <TextInput
                    name="lng"
                    placeholder="طول جغرافیایی"
                    lableText="طول جغرافیایی"
                    significant
                  />
                </Col>

                <Col sm="3" className="mt-2">
                  <SimpleSubmitButton
                    isLoading={false}
                    btnText="افزودن"
                    type="button"
                    onCLick={() => submitForm()}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export { AddLatLng };
