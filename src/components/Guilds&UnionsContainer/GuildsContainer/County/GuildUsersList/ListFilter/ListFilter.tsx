import React from "react";
import { Button, Row, Col, Spinner } from "reactstrap";
import { UserRoleOfCountyGuildRoom, UserRolesPersian } from "../../../../../../core/enums";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SimpleTextInput } from "../../../../../common/Form";

export interface IPropsProps {
  resetFilter?: () => void;
  allCountyUserGuildMutation: any;
}

const ListFilter: React.FC<IPropsProps> = ({
  resetFilter,
  allCountyUserGuildMutation,
}) => {
  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfCountyGuildRoom.CountyGuildRoomManager,
          label: "مدیر اتاق اصناف شهرستان",
        },
        {
          value: UserRoleOfCountyGuildRoom.CountySecretariat,
          label: UserRolesPersian.CountySecretariat,
        },
        {
          value: UserRoleOfCountyGuildRoom.CountyTreasurer,
          label: UserRolesPersian.CountyTreasurer,
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
            {allCountyUserGuildMutation.isLoading && (
              <Spinner color="white" size="sm" />
            )}
            <span className="ml-50">جستجو</span>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export { ListFilter };
