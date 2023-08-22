import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Alert, Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import * as utm from "utm";
import {
  FullOptionSel,
  OptionRow,
  OptionRowSel,
} from "../../../../../core/models";
import {
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
  useGetOwnedUserCountyGuildRoomsForAdmin,
} from "../../../../../core/services/api";
import { UtmCountyPolygonValidate } from "../../../../../core/validations/utm.validations";
import { SubmitButton, TextInput } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  setTableData: (val: any) => void;
  oldData: any;
  setSelectedCounty: (val: OptionRowSel) => void;
}

interface IUtm {
  easting: string;
  northing: string;
  zone: string;
  county: OptionRowSel | null;
  province: OptionRowSel | null;
}

const AddUtm: FC<IPropTypes> = ({
  setTableData,
  oldData,
  setSelectedCounty,
}) => {
  const [initialValues, setInitialValues] = useState<IUtm>({
    easting: "",
    northing: "",
    zone: "",
    county: null,
    province: null,
  });
  const [county, setCounty] = useState<FullOptionSel[]>([]);
  const [province, setProvince] = useState<FullOptionSel[]>([]);

  const getProvince = useGetAllprovinces();

  const getCounty = useGetAllCountyByProvinceId();

  useEffect(() => {
    if (getProvince.isSuccess) {
      try {
        const result = getProvince.data.data.result;
        let provinceList: FullOptionSel[] = [
          { label: "انتخاب کنید", options: [] },
        ];
        result.forEach((item: OptionRow) => {
          provinceList[0].options.push({ value: +item.id, label: item.title });
        });
        setProvince(provinceList);
      } catch (error) {}
    }
  }, [getProvince.isSuccess]);

  useEffect(() => {
    if (getCounty.isSuccess) {
      try {
        const result = getCounty.data?.data.result;

        let ownedCountyList: FullOptionSel[] = [
          { label: "انتخاب کنید...", options: [] },
        ];
        result.forEach((item: any) => {
          ownedCountyList[0].options.push({
            value: item.id,
            label: item.countyTitle ? item.countyTitle : item.title,
          });
        });

        setCounty(ownedCountyList);
      } catch (error) {}
    }
  }, [getCounty.isSuccess]);

  const onSubmit = (value: any, { resetForm }: any) => {
    var zonenum = value.zone.match(/(\d+)/);
    var zoneLetter = value.zone.replace(zonenum[0], "");
    const result = utm.toLatLon(
      value.easting,
      value.northing,
      +zonenum[0],
      zoneLetter
    );

    const dataTable: any = {
      easting: value.easting,
      northing: value.northing,
      zone: value.zone,
      id: oldData.length + 1,
      lat: result.latitude,
      lng: result.longitude,
    };

    setTableData((old: any) => [...old, dataTable]);
    setSelectedCounty(value.county);
    resetForm();
    setInitialValues((old: IUtm) => ({ ...old, county: value.county }));
  };

  return (
    <Card>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={UtmCountyPolygonValidate}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Alert color="info">شهرستان مورد نظر خود را انتخاب کنید</Alert>
            <Row>
              <Col sm="3">
                <BasicSelectOption
                  name="province"
                  placeHolder="انتخاب استان..."
                  lableText="استان"
                  significant
                  data={province}
                  isLoading={getProvince.isLoading}
                  onChange={(opt: OptionRowSel) => {
                    setFieldValue("province", opt);
                    getCounty.mutate(opt.value);
                    setFieldValue("county", null);
                  }}
                />
              </Col>
              <Col sm="3">
                <BasicSelectOption
                  name="county"
                  placeHolder="انتخاب شهرستان..."
                  lableText="شهرستان"
                  significant
                  data={county}
                  isLoading={getCounty.isLoading}
                />
              </Col>
            </Row>
            <hr />
            <Alert color="info">حداقل سه نقطه وارد کنید</Alert>
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
                <SubmitButton
                  isLoading={false}
                  btnText="افزودن"
                  schema={UtmCountyPolygonValidate}
                  values={values}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export { AddUtm };
