import React from "react";
import { Button, Row, Col, Spinner } from "reactstrap";
import { UserRolesPersian } from "../../../../../../core/enums";
import { UserRoleOfProvinceGulidRoom } from "../../../../../../core/enums/user-role-of-province-gulid-room.enums";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SimpleTextInput } from "../../../../../common/Form";
import { UserRoleOfMainLocationGuildRoom } from "../../../../../../core/enums/user-role-of-mainlocation-gulid-room.enums";

export interface IPropsProps {
  resetFilter?: () => void;
  allProvinceUserGuildMutation: any;
}

const ListFilter: React.FC<IPropsProps> = ({
  resetFilter,
  allProvinceUserGuildMutation,
}) => {



  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomManager,
          label: UserRolesPersian.MainLocationGuildRoomManager,
        },
        {
          value: UserRoleOfMainLocationGuildRoom.MainLocationSecretariat,
          label: UserRolesPersian.MainLocationSecretariat,
        },
        {
          value: UserRoleOfMainLocationGuildRoom.MainLocationTreasurer,
          label: UserRolesPersian.MainLocationTreasurer,
        },
        {
          value:
            UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomViceManager,
          label: UserRolesPersian.MainLocationGuildRoomViceManager,
        },
        {
          value:
            UserRoleOfMainLocationGuildRoom.MainLocationGuildRoomExecutiveManager,
          label: UserRolesPersian.MainLocationGUildRoomExecutiveManager,
        },
      ],
    },
  ];

  return (
    <>
      <Row className="d-flex align-items-start">
        <Col lg="4">
          <SimpleTextInput lableText="نام" name="name" placeholder="" />
        </Col>
        <Col lg="3">
          <SimpleTextInput
            lableText="کد ملی"
            name="userNationalCode"
            placeholder=""
          />
        </Col>
        <Col lg="4">
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
            {allProvinceUserGuildMutation.isLoading && (
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
