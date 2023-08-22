import { Form, Formik } from "formik";
import React, { FC } from "react";
import { Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import * as utm from "utm";
import { ToastTypes } from "../../../../../../../core/enums";
import { showToast } from "../../../../../../../core/utils";
import { SubmitButton, TextInput } from "../../../../../../common/Form";

interface IPropTypes {
  setTableData: (val: any) => void;
  oldData: any;
  countyPolygon: any
}

const AddUtm: FC<IPropTypes> = ({ setTableData, oldData, countyPolygon }) => {
  const onSubmit = (value: any, { resetForm }: any) => {
    var zonenum = value.zone.match(/(\d+)/);
    var zoneLetter = value.zone.replace(zonenum[0], "");
    const result = utm.toLatLon(
      value.easting,
      value.northing,
      +zonenum[0],
      zoneLetter
    );

    // if (
    //   !PointInPolygon(
    //     { lat: result.latitude, lng: result.longitude },
    //     countyPolygon
    //   )
    // ) {
    //   return showToast(
    //     ["مختصات وارد شده خارج از شهرستان می باشد!"],
    //     ToastTypes.error
    //   );
    // }

    const dataTable: any = {
      easting: value.easting,
      northing: value.northing,
      zone: value.zone,
      id: oldData.length + 1,
      lat: result.latitude,
      lng: result.longitude,
    };

    setTableData((old: any) => [...old, dataTable]);
    resetForm();
  };

  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{ easting: "", northing: "", zone: "" }}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <Row>
                <Col sm="3">
                  <TextInput
                    name="easting"
                    placeholder="easting"
                    lableText="easting"
                    significant
                  />
                </Col>

                <Col sm="3">
                  <TextInput
                    name="northing"
                    placeholder="northing"
                    lableText="northing"
                    significant
                  />
                </Col>

                <Col sm="3">
                  <TextInput
                    name="zone"
                    placeholder="zone"
                    lableText="zone"
                    significant
                  />
                </Col>
                <Col sm="3" className="mt-2">
                  <SubmitButton isLoading={false} btnText="افزودن" />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export { AddUtm };
