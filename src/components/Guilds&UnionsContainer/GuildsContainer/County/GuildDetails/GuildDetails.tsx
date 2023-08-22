import React, { FC } from "react";
import {
  useGetCountyGuildRoomDetails, usePostGetCountyGuildRoomMyPositionRequestHistoryByFilter,
} from "../../../../../core/services/api";
import { TabContainer } from "../../Shared/GuildsDetails/TabContainer/TabContainer";

const GuildsDetails: FC = () => {
 
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
          label: "نایب رییس",
        },
        {
          value: 3,
          label: "خزانه دار",
        },
        {
          value: 4,
          label: "عضو عادی",
        },    
      ],
    },
  ]);

  return (
    <TabContainer
      historyMutation={usePostGetCountyGuildRoomMyPositionRequestHistoryByFilter}
      AllServiceState={AllServiceState}
      noChangeAllServiceState={noChangeAllServiceState}
      type="County"
      getDetailsMutation={useGetCountyGuildRoomDetails}
    />
  );
};

export { GuildsDetails };
