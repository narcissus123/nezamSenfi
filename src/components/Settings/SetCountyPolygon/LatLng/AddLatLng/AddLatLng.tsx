import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Alert, Card, Col, Row } from "reactstrap";
import {
  FullOptionSel,
  OptionRow,
  OptionRowSel,
} from "../../../../../core/models";
import {
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
} from "../../../../../core/services/api";
import { LatLngCountyPolygonValidate } from "../../../../../core/validations/lat-lng.validations";
import { SubmitButton, TextInput } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  setTableData: (val: any) => void;
  oldData: any;
  setSelectedCounty: (val: OptionRowSel) => void;
  isFromSetCountyPolygon: boolean
}

interface ILatLng {
  lat: string;
  lng: string;
  county: OptionRowSel | null;
  province: OptionRowSel | null;
}

const AddLatLng: FC<IPropTypes> = ({
  setTableData,
  oldData,
  setSelectedCounty,
  isFromSetCountyPolygon
}) => {
  const [initialValues, setInitialValues] = useState<ILatLng>({
    lat: "",
    lng: "",
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
    const dataTable: any = {
      id: oldData.length + 1,
      lat: value.lat,
      lng: value.lng,
    };

    setTableData((old: any) => [...old, dataTable]);
    setSelectedCounty(value.county);
    if (!isFromSetCountyPolygon){
      setInitialValues((old: ILatLng) => ({ ...old, county: value.county }));
      resetForm();
    } 
   
  };

  return (
    <Card>
      <>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={onSubmit}
          validationSchema={LatLngCountyPolygonValidate}
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
                  <SubmitButton
                    isLoading={false}
                    btnText="افزودن"
                    schema={LatLngCountyPolygonValidate}
                    values={values}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </>
    </Card>
  );
};

export { AddLatLng };
