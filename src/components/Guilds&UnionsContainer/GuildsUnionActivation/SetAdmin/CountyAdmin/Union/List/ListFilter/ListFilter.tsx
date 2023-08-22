import React from "react";

import { useHistory } from "react-router-dom";
import { Button, Row, Col, Spinner } from "reactstrap";
import { SimpleTextInput } from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  getMutation: any;
  ownedCounties: any;
  ownedCountyLoading: any;
  setFieldValue: any;
  getAllUnionMutation: any;
  setOwnedUnions: any;
  ownedUnions: any;
  getAllUnionLoading: any;
}

const ListFilter: React.FC<IPropsProps> = ({
  getMutation,
  ownedCounties,
  ownedCountyLoading,
  setFieldValue,
  getAllUnionMutation,
  setOwnedUnions,
  ownedUnions,
  getAllUnionLoading,
}) => {
  const history = useHistory();

  return (
    <>
      <Row className="d-flex align-items-start">
        <Col lg="3">
          <BasicSelectOption
            isLoading={ownedCountyLoading}
            name="countyId"
            placeHolder="انتخاب شهرستان ..."
            data={ownedCounties}
            lableText="انتخاب شهرستان"
            onChange={(opt, e) => {
              setFieldValue("countyId", { value: opt.value, label: opt.label });
              getAllUnionMutation.mutate(
                { page: 1, pageSize: 100, countyId: opt.value },
                {
                  onSuccess: (val: any) => {
                    // console.log(val.data.result);
                    const result = val.data.result.unions;
                    let newOptions: any = [];
                    let newCounties = [
                      {
                        label: "سرلیست اتحادیه",
                        options: [],
                      },
                    ];

                    result.forEach((row: any) => {
                      newOptions.push({
                        value: row.unionId,
                        label: row.unionTitle,
                      });
                    });
                    newCounties[0].options = newOptions;
                    setOwnedUnions(newCounties);
                  },
                }
              );
            }}
          />
        </Col>
        <Col lg="3">
          <BasicSelectOption
            isLoading={getAllUnionLoading}
            name="unionId"
            placeHolder="انتخاب اتحادیه ..."
            data={ownedUnions}
            lableText="انتخاب اتحادیه"
            onChange={(opt, e) => {
              setFieldValue("unionId", {
                value: opt.value,
                label: opt.label,
              });
            }}
          />
        </Col>
        <Col lg="3">
          <SimpleTextInput lableText="نام" name="name" placeholder=" نام ..." />
        </Col>
        <Col lg="3">
          <SimpleTextInput
            lableText="کد ملی"
            name="userNationalCode"
            placeholder="کد ملی ..."
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
