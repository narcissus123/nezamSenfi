import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useGetAllCountyGuilDRooomRequestHistory,
  useGetCountyGuildRoomRequestDetails,
  useGetCountyRequestForItManager,
  useSelectCountyGuildRoomRequestByIdBySecretariat,
} from "../../../../../../core/services/api/guild-request.api";
import { CheckGuildsActivation } from "../CheckGuildsActivation";

interface IPropTypes {
  isSecretariatCartable?: boolean;
  isManagerCartable?: boolean;
  isItManagerCartable?: boolean;
}

const County: FC<IPropTypes> = ({
  isSecretariatCartable,
  isManagerCartable,
  isItManagerCartable,
}) => {
  const getDetails = useGetCountyGuildRoomRequestDetails();
  const getItManagerDetails = useGetCountyRequestForItManager();
  const { id }: any = useParams();
  const [initialValue, setInitialValue] = useState<any>(null);
  const selectMutation = useSelectCountyGuildRoomRequestByIdBySecretariat();

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

  useEffect(() => {
    if (isItManagerCartable) {
      getItManagerDetails.mutate(id);
    } else getDetails.mutate(id);
  }, []);

  useEffect(() => {
    if (getDetails.isSuccess) {
      try {
        const result = getDetails.data?.data.result;
        setInitialValue(result);
      } catch (error) {}
    }
  }, [getDetails.isSuccess]);

  useEffect(() => {
    if (getItManagerDetails.isSuccess) {
      try {
        const result = getItManagerDetails.data?.data.result;
        setInitialValue(result);
      } catch (error) {}
    }
  }, [getItManagerDetails.isSuccess]);

  return (
    <CheckGuildsActivation
      initialValues={initialValue}
      type="County"
      isLoading={getDetails.isLoading || getItManagerDetails.isLoading}
      selectMutation={selectMutation}
      historyMutation={useGetAllCountyGuilDRooomRequestHistory}
      isSecretariatCartable={isSecretariatCartable}
      isManagerCartable={isManagerCartable}
      isItManagerCartable={isItManagerCartable}
      noChangeAllServiceState={noChangeAllServiceState}
    />
  );
};

export { County };
