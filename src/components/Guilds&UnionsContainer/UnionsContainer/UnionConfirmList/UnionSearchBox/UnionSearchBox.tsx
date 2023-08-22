import { Form, Formik } from "formik";
import React, { FC, useEffect } from "react";
import { Col, FormGroup, Row } from "reactstrap";
import {
  useGetAllCountyByProvinceId,
  useGetAllprovinceByMainLocationId,
} from "../../../../../core/services/api";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../common/Form";

import Styles from "./UnionSearchBox.module.scss";

interface IUnionType {
  page: number;
  pageSize: number;
  countyId: number;
}

interface IPropTypes {
  getAllUnions: (obj: IUnionType) => void;
  pageSize: number;
  setCountyId: (num: number) => void;
  isLoading: boolean;
}

const UnionSearchBox: FC<IPropTypes> = ({
  getAllUnions,
  pageSize,
  setCountyId,
  isLoading,
}) => {
  const [province, setProvince] = React.useState([]);
  const [county, setCounty] = React.useState([]);

  const getAllProvince = useGetAllprovinceByMainLocationId();

  const getAllCountyByProvince = useGetAllCountyByProvinceId();

  useEffect(() => {
    getAllProvince.mutate(2);
  }, []);

  useEffect(() => {
    if (getAllProvince.data && getAllProvince.data.data) {
      const result = getAllProvince.data.data.result;
      let prov: any = [
        {
          label: "استان را انتخاب کنید...",
          options: [],
        },
      ];

      result.forEach((item: any) => {
        prov[0].options.push({ value: item.id, label: item.title });
      });
      setProvince(prov);
    }
  }, [getAllProvince.isSuccess]);

  useEffect(() => {
    if (getAllCountyByProvince.data && getAllCountyByProvince.data.data) {
      const result = getAllCountyByProvince.data.data.result;
      let cou: any = [
        {
          label: "شهرستان را انتخاب کنید...",
          options: [],
        },
      ];

      result.forEach((item: any) => {
        cou[0].options.push({ value: item.id, label: item.title });
      });
      setCounty(cou);
    }
  }, [getAllCountyByProvince.isSuccess]);

  const provinceOnChange = (opt: any, e: any, setFieldValue: any) => {
    getAllCountyByProvince.mutate(opt.value);
    setFieldValue("province", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("county", null);
    setCounty([]);
  };
  const countyOnChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("county", {
      value: opt.value,
      label: opt.label,
    });
    setCountyId(opt.value);
  };

  const onSubmit = (value: any) => {
    const obj: IUnionType = {
      page: 1,
      pageSize: pageSize,
      countyId: value.county ? value.county.value : 0,
    };

    getAllUnions(obj);
  };

  return (
    <Formik
      initialValues={{ province: null, county: null }}
      onSubmit={(val: any) => onSubmit(val)}
    >
      {({
        values,
        errors,
        handleChange,
        touched,
        setFieldValue,
        resetForm,
      }) => {
        return (
          <Form style={{ width: "100%" }}>
            <Row className={Styles.holder}>
              <Col sm="4" className={Styles.select}>
                <BasicSelectOption
                  data={province}
                  name="province"
                  placeHolder="استان..."
                  isLoading={getAllProvince.isLoading}
                  hasLabel
                  lableText="استان"
                  onChange={(opt: any, e: any) =>
                    provinceOnChange(opt, e, setFieldValue)
                  }
                />
              </Col>
              <Col sm="4" className={Styles.select}>
                <BasicSelectOption
                  data={county}
                  name="county"
                  placeHolder="شهرستان..."
                  hasLabel
                  lableText="شهرستان"
                  isLoading={getAllCountyByProvince.isLoading}
                  onChange={(opt: any, e: any) =>
                    countyOnChange(opt, e, setFieldValue)
                  }
                />
              </Col>
              <Col sm="4" className={Styles.submit}>
                <FormGroup
                  style={{
                    marginTop: "25px",
                    height: "auto",
                    maxHeight: "30px",
                  }}
                >
                  <SubmitButton
                    isLoading={isLoading}
                    btnText="جستجو"
                    clearable
                    onClear={() => {
                      resetForm();
                      getAllUnions({
                        page: 1,
                        pageSize: pageSize,
                        countyId: 0,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export { UnionSearchBox };
