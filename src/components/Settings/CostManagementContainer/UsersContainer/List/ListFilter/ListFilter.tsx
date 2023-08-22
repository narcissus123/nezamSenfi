import React from "react";
import { Button, Row, Col, Spinner } from "reactstrap";
import { UserRolesPersian } from "../../../../../../core/enums";
import { UserRoleOfJahadCenter } from "../../../../../../core/enums/user-role-of-jahad.enums";
import { SimpleTextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  resetFilter?: () => void;
  getMutation: any;
}

const ListFilter: React.FC<IPropsProps> = ({ resetFilter, getMutation }) => {
  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfJahadCenter.JahadCenterExpert,
          label: UserRolesPersian.JahadCenterExpert,
        },
        {
          value: UserRoleOfJahadCenter.JahadCenterManager,
          label: UserRolesPersian.JahadCenterManager,
        },
      ],
    },
  ];

  return (
    <>
      <Row className="d-flex align-items-start">
        <Col lg="3">
          <SimpleTextInput lableText="نام" name="name" placeholder="" />
        </Col>
        <Col lg="3">
          <SimpleTextInput
            lableText="کد ملی"
            name="userNationalCode"
            placeholder=""
          />
        </Col>
        <Col lg="5">
          <BasicSelectOption
            name="userRole"
            lableText="نقش"
            placeHolder="انتخاب کنید..."
            data={noChangeAllServiceState}
            isClearable={true}
          />
        </Col>
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
