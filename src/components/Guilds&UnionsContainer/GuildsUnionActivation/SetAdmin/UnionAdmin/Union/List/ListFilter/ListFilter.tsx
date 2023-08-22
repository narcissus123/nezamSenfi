import React from "react";

import { Button, Row, Col, Spinner } from "reactstrap";
import { SimpleTextInput } from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  getMutation: any;
  ownedUnions: any;
  getAllUnionLoading: any;
}

const ListFilter: React.FC<IPropsProps> = ({
  getMutation,
  ownedUnions,
  getAllUnionLoading,
}) => {
  return (
    <>
      <Row className="d-flex align-items-start">
        <Col lg="3">
          <BasicSelectOption
            isLoading={getAllUnionLoading}
            name="unionId"
            placeHolder="انتخاب اتحادیه ..."
            data={ownedUnions}
            lableText="انتخاب اتحادیه"
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
