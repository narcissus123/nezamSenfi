import React, { FC } from "react";
import { UserRolesPersian } from "../../../../../core/enums";
import { UserRoleOfMainLocationGuildRoom } from "../../../../../core/enums/user-role-of-mainlocation-gulid-room.enums";
import {
  useSetMainLocationGuildRoomDocument,
  useSetMianLocationGuildRoomLocation,
  useSetMianLocationGuildRoomRequestUsers,
} from "../../../../../core/services/api";
import { TabContainer } from "./TabContainer/TabContainer";

const MainLocation: FC = () => {
 
  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: 1,
          label: "رییس هیات مدیره",
        },
        {
          value: 2,
          label: "ناییب رییس",
        },
        {
          value: 3,
          label: "خزانه دار",
        },
        {
          value: 4,
          label: "عضو عادی",
        },
        {
          value: 5,
          label: "مدیر اجرایی",
        },
        {
          value: 6,
          label: "دبیر",
        },
      ],
    },
  ];

  const [AllServiceState, setAllServiceState] = React.useState([
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: 1,
          label: "رییس هیات مدیره",
        },
        {
          value: 2,
          label: "ناییب رییس",
        },
        {
          value: 3,
          label: "خزانه دار",
        },
        {
          value: 4,
          label: "عضو عادی",
        },
        {
          value: 5,
          label: "مدیر اجرایی",
        },
        {
          value: 6,
          label: "دبیر",
        },
      ],
    },
  ]);

  return (
    <TabContainer
      AllServiceState={AllServiceState}
      noChangeAllServiceState={noChangeAllServiceState}
      type="MainLocation"
      locationMutation={useSetMianLocationGuildRoomLocation}
      membersMutation={useSetMianLocationGuildRoomRequestUsers}
      rolesMutation={useSetMainLocationGuildRoomDocument}
    />
  );
};

export { MainLocation };
