import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Alert, Card, CardBody, Col, Row } from "reactstrap";
import * as Yup from "yup";
import { ToastTypes } from "../../../../core/enums";
import {
  FullOptionSel,
  OptionRow,
  OptionRowSel,
} from "../../../../core/models";
import {
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
  useSetCountyPoligon,
} from "../../../../core/services/api";
import { showToast } from "../../../../core/utils";
import { CountyPolygonValidate } from "../../../../core/validations/lat-lng.validations";
import { DropZone, SubmitButton } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  setCounty: (val: number) => void;
}

const TrackPoint: FC<IPropTypes> = ({ setCounty: setCountyMap }) => {
  const validate = Yup.object().shape({
    track: Yup.array()
      .required("لطفا یک فایل انتخاب کنید")
      .typeError("لطفا یک فایل انتخاب کنید"),
  });

  const mixedValidate = CountyPolygonValidate.concat(validate);

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

  const setPolygon = useSetCountyPoligon();

  const onSubmit = async (value: any) => {
    const str = await value.track[0].text();
    const doc: any = new window.DOMParser().parseFromString(str, "text/xml");

    const points: any = {
      coordinates: [],
      countyId: value.county.value,
    };
    const nodes = [...doc.getElementsByTagName("trkpt")];

    nodes.forEach((node) => {
      var lat = parseFloat(node.getAttribute("lat"));
      var lng = parseFloat(node.getAttribute("lon"));

      points.coordinates.push({ y: lat, x: lng });
    });
    points.coordinates.push(points.coordinates[0]);

    setPolygon.mutate(points, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{ track: null, county: null, province: null }}
          onSubmit={onSubmit}
          validationSchema={mixedValidate}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Alert color="info">شهرستان مورد نظر خود را انتخاب کنید</Alert>
              <Row>
                <Col sm="4">
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
                <Col sm="4">
                  <BasicSelectOption
                    name="county"
                    placeHolder="انتخاب شهرستان..."
                    lableText="شهرستان"
                    significant
                    data={county}
                    isLoading={getCounty.isLoading}
                    onChange={(opt: OptionRowSel) => {
                      setFieldValue("county", opt);
                      setCountyMap(opt.value);
                    }}
                  />
                </Col>
              </Row>
              <hr />

              <Alert color="info">
                لطفا فایل مختصات (Track) را بارگذاری کنید
              </Alert>
              <Col sm="4">
                <DropZone
                  name="track"
                  isSingle
                  accept=".gpx"
                  lableText="فایل مختصات"
                  placeholder="فایل مختصات را اینجا بکشید و رها کنید..."
                />
              </Col>
              <SubmitButton
                isLoading={setPolygon.isLoading}
                btnText="ثبت قطعه"
                values={values}
                schema={mixedValidate}
              />
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export { TrackPoint };
