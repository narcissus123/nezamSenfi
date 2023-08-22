import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetGetMainLocationGuildRoomPositionRequestDetailsById,
  usePostGetResumesInMainLocationGuildRoomPositionRequestByFilter,
  useGetSelectPositionRequestInMainLocationGuildRoomByIdBySecretariat,
  usePostArchiveBySecrtriatInMainLocationGuildRoom,
  usePostGetMainLocationGuildRoomMyPositionRequestHistoryByFilter,
  usePostConfirmMainLocationGuildRooomPositionRequestByManger,
  usePostRejectMainLocationGuildRooomPositionRequestByManger,
  useGetMainLocationGuildRoomPostionRequestContractFile,
  useGetMainLocationGuildRoomPositionRequestGuarantorsAndAttachments,
} from "../../../../../../../core/services/api";
import { fullOption } from "../../../../../../../core/utils";
import { SecretariatCheckJobRequests } from "../SecretariatCheckJobRequests";

export interface IPropsType {
  isSecretariatCartable?: boolean;
  isManagerCartable?: boolean;
}

const MainLocation: React.FC<IPropsType> = ({
  isSecretariatCartable = false,
  isManagerCartable = false,
}) => {
  const mainLocationPositionDetailsMutation =
    useGetGetMainLocationGuildRoomPositionRequestDetailsById();
  const historyMutation =
    usePostGetMainLocationGuildRoomMyPositionRequestHistoryByFilter();
  const resumesMutation =
    usePostGetResumesInMainLocationGuildRoomPositionRequestByFilter();
  const selectMainLocation =
    useGetSelectPositionRequestInMainLocationGuildRoomByIdBySecretariat();
  const archiveMutation = usePostArchiveBySecrtriatInMainLocationGuildRoom();

  // const isActiveUpLevel = useIsActiveUpLevelMangerInMainLocationGuildRooom();
  const acceptPayment =
    usePostConfirmMainLocationGuildRooomPositionRequestByManger();
  const rejectPayment =
    usePostRejectMainLocationGuildRooomPositionRequestByManger();

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
  const [employmentLicenseStatusData, setEmploymentLicenseStatusData] =
    useState<any>([
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
    mainLocationPositionDetailsMutation.mutate(id, {
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
          historyOfServiceAfterGraduation: data.historyOfServiceAfterGraduation
            ? fullOption(
                data.historyOfServiceAfterGraduation,
                yearOfServicesData
              )?.label
            : "ثبت نشده است",
          employmentLicenseStatus: fullOption(
            data.employmentLicenseStatus,
            employmentLicenseStatusData
          )?.label,
          mainLocationId: data.mainLocationId,
          positionTitle: data.positionTitle,

          guarantorCount: data.guarantorCount,
          personalCode: data.personalCode ? data.personalCode : "ثبت نشده است",
          invitationDate: data.invitationDate,
          userTypeTitle: data.userTypeTitle,
          userType: data.userType,
          secretariatId: data.secretariatId,
          description: data.description,
        };
        setInitialValue(details);
        // if (data.status === JobRequestStatus.ConfirmPayment) {
        //   isActiveUpLevel.mutate();
        // }
      },
    });
  }, []);

  return (
    <>
      <SecretariatCheckJobRequests
        isLoading={mainLocationPositionDetailsMutation.isLoading}
        initialValues={initialValue}
        type="MainLocation"
        isSecretariatCartable={isSecretariatCartable}
        historyMutation={historyMutation}
        isManagerCartable={isManagerCartable}
        selectMutation={selectMainLocation}
        archiveMutation={archiveMutation}
        resumeMutation={resumesMutation}
        isActiveUpManager={false}
        acceptPayment={acceptPayment}
        rejectPayment={rejectPayment}
        getContractMutation={
          useGetMainLocationGuildRoomPostionRequestContractFile
        }
        guarantorsDetailsMutation={
          useGetMainLocationGuildRoomPositionRequestGuarantorsAndAttachments
        }
      />
    </>
  );
};

export { MainLocation };
