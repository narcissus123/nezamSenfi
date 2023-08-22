import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { usePetCountyGuildRoomPositionRequestDetailsByIdByUpManager, usePostConfirmCountyGuildRoomPositionRequestByUpLevelManger, usePostGetResumesInCountyGuildRoomPositionRequestByFilterByUpManager, usePostRejectCountyGuildRoomPositionRequestByUpLevelManger } from "../../../../../../../../core/services/api";
import { fullOption } from "../../../../../../../../core/utils";
import { refetchContext } from "../../../../../../../../core/utils/context/EventContext";
import { UpManagerCheckJobRequest } from "../../UpManagerCheckJobRequest/UpManagerCheckJobRequest";



export interface IPropsType {
  isSecretariatCartable?: boolean;
  isManagerCartable?: boolean;
}

const CountyManagerDetails: React.FC<IPropsType> = ({
  isSecretariatCartable = false,
  isManagerCartable = false,
}) => {
  const countyPositionDetailsMutation = usePetCountyGuildRoomPositionRequestDetailsByIdByUpManager();
  const resumeMutation = usePostGetResumesInCountyGuildRoomPositionRequestByFilterByUpManager();


  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const [initialValue, setInitialValue] = useState<any>({});
  const [rankStatusData, setRankStatusData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "رتبه A" },
        { value: 2, label: "رتبه B" },
        { value: 3, label: "رتبه C" },
        { value: 4, label: "فاقد رتبه" },
      ],
    },
  ]);
  const yearOfServicesData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "1 سال" },
        { value: 2, label: "2 سال" },
        { value: 3, label: "3 سال" },
        { value: 4, label: "4 سال" },
        { value: 5, label: "5 سال" },
        { value: 6, label: "6 تا 10 سال" },
        { value: 7, label: "11 تا 15 سال" },
        { value: 8, label: "16 تا 20 سال" },
        { value: 9, label: "21 تا 25 سال" },
        { value: 10, label: "26 تا 30 سال" },
      ],
    },
  ];
  const [
    employmentLicenseStatusData,
    setEmploymentLicenseStatusData,
  ] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دارای اعتبار" },
        { value: 2, label: "فاقد اعتبار" },
      ],
    },
  ]);

  const [typeData, setTypeData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "کشوری" },
        { value: 2, label: "استانی" },
        { value: 3, label: "شهرستانی" },
        { value: 4, label: "اتحادیه" },
      ],
    },
  ]);
  let { id } = useParams<any>();

  useEffect(() => {
    countyPositionDetailsMutation.mutate(id, {
      onSuccess: (val: any) => {
        const data = val.data.result;
        const details = {
          fullName: `${data.userFirstName} ${data.userLastName}`,
          createDate: data.createDate,
          ratingStatus: fullOption(data.ratingStatus, rankStatusData)?.label,
          ratingTitle: data.ratingTitle,
          status: data.status,
          userId: data.userId,
          userNationalCode: data.userNationalCode,
          statusTitle: data.statusTitle,
          type: fullOption(data.type, typeData)?.label,
          historyOfServiceAfterGraduation: fullOption(
            data.historyOfServiceAfterGraduation,
            yearOfServicesData
          )?.label,
          employmentLicenseStatus: fullOption(
            data.employmentLicenseStatus,
            employmentLicenseStatusData
          )?.label,
          countyGuildRoomPositionId: data.countyGuildRoomPositionId,
          countyId: data.countyId,
        };
        setInitialValue(details);
      },
    });
  }, [refetchEvent.countyRejectJob, refetchEvent.countyConfirmJob]);

  return (
    <>
      <UpManagerCheckJobRequest
        isLoading={countyPositionDetailsMutation.isLoading}
        initialValues={initialValue}
        type="County"
        resumeMutation={resumeMutation}
        rejectMutation={usePostRejectCountyGuildRoomPositionRequestByUpLevelManger}
        confirmMutation={usePostConfirmCountyGuildRoomPositionRequestByUpLevelManger}
      />
    </>
  );
};

export { CountyManagerDetails };
