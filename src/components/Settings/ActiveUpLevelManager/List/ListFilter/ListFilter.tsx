import React from "react";
import { Col, Row } from "reactstrap";
import { ModernDatePicker, SubmitButton } from "../../../../common/Form";

export interface IPropsProps {
  setFieldValue: any;
  getMutation: any;
  onResetClick: any;
}

const ListFilter: React.FC<IPropsProps> = ({
  setFieldValue,
  getMutation,
  onResetClick,
}) => {

  return (
    <>
      <Row className="d-flex align-items-start">
        <Col md="3">
          <ModernDatePicker
            lableText="از تاریخ"
            name="startDate"
            placeholder="تاریخ"
            hasMaximum={false}
            initialValue={""}
          />
        </Col>
        <Col lg="3">
          <ModernDatePicker
            lableText="تا تاریخ"
            name="toDate"
            placeholder="تاریخ"
            hasMaximum={false}
            initialValue={""}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingTop: "23px" }} lg="1">
          <SubmitButton
            isLoading={getMutation.isLoading}
            btnText="جستجو"
            clearable
            clearableDisable={getMutation.isLoading}
            clearableTxt="پاکسازی"
            onClear={onResetClick}
          />
        </Col>
      </Row>
    </>
  );
};

export { ListFilter };
