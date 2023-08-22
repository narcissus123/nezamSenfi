import React, { FC } from "react";
import {
  useGetUserRolsInProvinceByUserId,
  usePostSetProvinceGuildRoomRequestLocation,
  usePostSetProvinceGuildRoomRequestUsers,
  useSetProvinceGuildRoomRequestBankInfo,
  useSetProvinceGuildRoomRequestDocument,
} from "../../../../../core/services/api";
import { TabContainer } from "../../TabContainer/TabContainer";

const Province: FC = () => {

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
      bankInfoMutation={useSetProvinceGuildRoomRequestBankInfo}
      AllServiceState={AllServiceState}
      noChangeAllServiceState={noChangeAllServiceState}
      type="Province"
      locationMutation={usePostSetProvinceGuildRoomRequestLocation}
      membersMutation={usePostSetProvinceGuildRoomRequestUsers}
      rolesMutation={useGetUserRolsInProvinceByUserId}
    />
  );
};

export { Province };
