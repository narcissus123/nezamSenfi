import React, { useEffect, useState } from "react";

import { Button, Row, Col, Spinner } from "reactstrap";
import { FullOptionSel, OptionRow, OptionRowSel } from "../../../../../../../../../../core/models";
import { useGetCurrentYear } from "../../../../../../../../../../core/services/api";
import { useGetAllJobProductionFactorByJobId } from "../../../../../../../../../../core/services/api/job.api";
import { SimpleTextInput, TextInput } from "../../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  getMutation: any;
  setFieldValue : any
  values:any
  jobs:any
}

const ListFilter: React.FC<IPropsProps> = ({
  getMutation,
  setFieldValue,
  values,
  jobs
}) => {

const [productionFactorData, setProductionFactorData] = useState<
  FullOptionSel[]
>([]);
const [productionYearData, setProductionYearData] = useState<OptionRowSel[]>(
  []
);
const getProductionFactor = useGetAllJobProductionFactorByJobId();
const {
  data: currentYearData,
  isSuccess: currentYearIsSuccess,
  isFetching: currentYearIsFetching,
} = useGetCurrentYear();

useEffect(() => {
  if (currentYearIsSuccess) {
    const result = currentYearData?.data.result;
    let year = result + 1;
    let pro: OptionRowSel[] = [];
    for (let i = 0; i < 3; i++) {
      pro.push({ value: year, label: year });
      year = year - 1;
    }
    setProductionYearData(pro);
  }
}, [currentYearIsSuccess]);

  const onJobChange = (
    opt: { value: number; label: string },
    setFieldValue: any
  ) => {
    setFieldValue("job", opt);
    setFieldValue("productionFactor", null);
    setFieldValue("productionYear", null);
    if (opt) {
      getProductionFactor.mutate(opt.value, {
        onSuccess: (val) => {
          const result: OptionRow[] = val.data.result;
          let productionFactor: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((pro: any) => {
            productionFactor[0].options.push({
              value: pro.id,
              label: pro.title,
            });
          });

          setProductionFactorData(productionFactor);
        },
      });
    }
  };

  const onProductionYearChange = (
    opt: { value: number; label: string },
    setFieldValue: any,
    values: any
  ) => {
    setFieldValue("productionYear", opt);
  }


  return (
    <>
      <Row className="d-flex align-items-start">
        <Col md="3">
          <BasicSelectOption
            data={jobs}
            name="job"
            lableText="شغل"
            isLoading={false}
            onChange={(opt) => onJobChange(opt, setFieldValue)}
            placeHolder="انتخاب کنید ..."
          />
        </Col>

        <Col md="3">
          <BasicSelectOption
            lableText="عامل تولید"
            name="productionFactor"
            placeHolder="انتخاب کنید..."
            data={productionFactorData}
            isLoading={getProductionFactor.isLoading}
            onChange={(e) => {
              setFieldValue("productionFactor", e);
              setFieldValue("productionYear", null);
            }}
          />
        </Col>
        <Col md="3">
          <BasicSelectOption
            lableText="سال تولید"
            name="productionYear"
            placeHolder="انتخاب کنید..."
            isDisabled={values.productionFactor ? false : true}
            data={productionYearData}
            onChange={(e) => onProductionYearChange(e, setFieldValue, values)}
            isLoading={currentYearIsFetching}
          />
        </Col>

        <Col md="3">
          <TextInput
            lableText="میزان فعالیت"
            name="activityTime"
            placeholder="میزان فعالیت را وارد کنید..."
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingTop: "23px" }} lg="1">
          <Button
            color="primary"
            className="d-flex align-items-center justify-content-center"
            type="submit"
          >
            {getMutation.isLoading && <Spinner color="white" size="sm" />}
            <span className="ml-50">جستجو</span>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export { ListFilter };
