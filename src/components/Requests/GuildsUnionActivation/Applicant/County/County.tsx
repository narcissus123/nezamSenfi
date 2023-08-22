import React, { FC } from "react";
import {
  useGetUserRolsInCountyByUserId,
  usePostSetCountyGuildRoomRequestLocation,
  usePostSetCountyGuildRoomRequestUsers,
  useSetCountyGuildRoomRequestBankInfo,
} from "../../../../../core/services/api";
import { TabContainer } from "../../TabContainer/TabContainer";

const County: FC = () => {
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
      bankInfoMutation={useSetCountyGuildRoomRequestBankInfo}
      type="County"
      rolesMutation={useGetUserRolsInCountyByUserId}
      locationMutation={usePostSetCountyGuildRoomRequestLocation}
      membersMutation={usePostSetCountyGuildRoomRequestUsers}
    />
  );
};

export { County };
