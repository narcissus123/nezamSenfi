import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useGetAllProvinceGuilDRooomRequestHistory,
  useGetProvinceGuildRoomRequestDetails,
  useSelectProvinceGuildRoomRequestByIdBySecretariat,
} from "../../../../../../core/services/api/guild-request.api";
import { CheckGuildsActivation } from "../CheckGuildsActivation";

interface IPropTypes {
  isSecretariatCartable?: boolean;
  isManagerCartable?: boolean;
  isItManagerCartable?: boolean;
}

const Province: FC<IPropTypes> = ({
  isSecretariatCartable,
  isManagerCartable,
  isItManagerCartable,
}) => {
  const getDetails = useGetProvinceGuildRoomRequestDetails();
  const { id }: any = useParams();
  const [initialValue, setInitialValue] = useState<any>(null);
  const selectMutation = useSelectProvinceGuildRoomRequestByIdBySecretariat()

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
    getDetails.mutate(id);
  }, []);

  useEffect(() => {
    if (getDetails.isSuccess) {
      try {
        const result = getDetails.data?.data.result;
        setInitialValue(result);
      } catch (error) {}
    }
  }, [getDetails.isSuccess]);

  return (
    <CheckGuildsActivation
      initialValues={initialValue}
      type="Province"
      isLoading={getDetails.isLoading}
      selectMutation={selectMutation}
      isSecretariatCartable={isSecretariatCartable}
      isManagerCartable={isManagerCartable}
      isItManagerCartable={isItManagerCartable}
      historyMutation={useGetAllProvinceGuilDRooomRequestHistory}
      noChangeAllServiceState={noChangeAllServiceState}
    />
  );
};

export { Province };
