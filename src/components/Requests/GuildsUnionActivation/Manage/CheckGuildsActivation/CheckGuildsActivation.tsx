import React, { useState } from "react";
import { File, FileText } from "react-feather";
import { Alert, Button, Collapse, FormGroup } from "reactstrap";
import { GuildsActivation } from "../../../../../core/enums/guilds-activation-status.enums";
import { UnionsActivation } from "../../../../../core/enums/unions-activation-status.enums";
import {
  useActiveCountyGuildRoomByItManger,
  useActiveProvinceGuildRoomByItManger,
  useInvastigationAndAcceptByMainlocationSecretriatForProvinceGuildRoomRequest,
  useInvastigationAndAcceptByMainlocationSecretriatForUnionRequest,
  useInvastigationAndAcceptByProvinceSecretriatForCountyGuildRoomRequest,
  useInvastigationAndRejectByMainlocationSecretriatForProvinceGuildRoomRequest,
  useInvastigationAndRejectByProvinceSecretriatForCountyGuildRoomRequest,
  useSetManagerIdeaAboutProvinceGuildRoomRequest,
  useSetMangerIdeaAboutCountyGuildRoomRequest,
  useInvastigationAndRejectByMainlocationSecretriatForUnionRequest,
  useActiveUnionByItManger,
  useSetManagerIdeaAboutUnionRequest,
  useChangeSecretariatOfProvinceGuildRoomRequestByManger,
  useChangeSecretariatOfCountyGuildRoomRequestByManger,
  useChangeSecretariatOfUnionRequestByManger,
  useGetSecretariatOfCountyGuildRoomRequest,
  useGetSecretariatOfProvinceCountyGuildRoomRequest,
  useGetSecretariatOfUnionRequest,
} from "../../../../../core/services/api";
import { isSameString } from "../../../../../core/utils/same-string.utils";
import { SimpleSubmitButton, SubmitButton } from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Timeline from "../../../../common/timeline";
import { CardWrapper } from "../../../../common/Wrapper/CardWrapper/CardWrapper";
import { StatusWrapper } from "../../../../common/Wrapper/StatusWrapper/StatusWrapper";
import { ChangeSecretariat } from "../../../../common/ChangeSecretariat/ChangeSecretariat";
import { CheckGuild } from "./CheckGuild/CheckGuild";
import { LocationInfoDetails } from "./LocationInfoDetails/LocationInfoDetails";
import { MembersInfoDetails } from "./MembersInfoDetails/MembersInfoDetails";
import { RegisteryDocsDetails } from "./RegisteryDocsDetails/RegisteryDocsDetails";
import { SelectComponent } from "./SelectComponent";
import { RequestHistory } from "../../Shared/RequestHistory";
import { BankInfo } from "./BankInfo/BankInfo";
import { ShowOnMap } from "./ShowOnMap/ShowOnMap";
import { SubsetOfJobs } from "./SubsetOfJobs/SubsetOfJobs";

export interface IPropsType {
  initialValues?: any;
  isLoading?: boolean;
  selectMutation?: any;
  isSecretariatCartable?: boolean;
  type?: string;
  isDetails?: boolean;
  historyMutation?: any;
  isManagerCartable?: boolean;
  isItManagerCartable?: boolean;
  noChangeAllServiceState: any;
}

const CheckGuildsActivation: React.FC<IPropsType> = ({
  initialValues,
  isLoading,
  selectMutation,
  children,
  isSecretariatCartable = false,
  isDetails,
  type = "",
  isManagerCartable = false,
  isItManagerCartable = false,
  historyMutation,
  noChangeAllServiceState,
}) => {
  const [isRejectGuildOpen, setIsRejectGuildOpen] = useState<boolean>(false);
  const [isAcceptGuildOpen, setIsAcceptGuildOpen] = useState<boolean>(false);
  const [isShowOnMapOpen, setIsShowOnMapOpen] = useState<boolean>(false);
  const [isShowSubsetOfJob, setIsShowSubsetOfJob] = useState<boolean>(false);
  const [isActiveByItManager, setIsActiveByItManager] =
    useState<boolean>(false);

  const [isMembersInfoDetailsOpen, setIsMembersInfoDetailsOpen] =
    useState<boolean>(false);
  const [isLocationInfoDetailsOpen, setIsLocationInfoDetailsOpen] =
    useState<boolean>(false);
  const [isHistoryGuildRequestOpen, setIsHistoryGuildRequestOpen] =
    useState<boolean>(false);
    const [isBankInfoOpen, setIsBankInfoOpen] =
  useState<boolean>(false);
    
  const [isChangeSecretariatOpen, setIsChangeSecretariatOpen] =
    useState<boolean>(false);

  return (
    <CardWrapper
      text={`بررسی درخواست ${isSameString(type, "union") ? "اتحادیه" : "صنف"}`}
    >
      <>
        {isLoading || !initialValues ? (
          <FallBackSpinner setHeight={300} />
        ) : (
          <>
            <StatusWrapper
              curStatus={[initialValues.status]}
              guildStatus={
                isSameString(type, "union")
                  ? [UnionsActivation.Finish]
                  : [GuildsActivation.Finish]
              }
            >
              <Alert color="info">
                این درخواست با موفقیت به پایان رسیده است
              </Alert>
            </StatusWrapper>

            {initialValues.description && (
              <Alert color="info">توضیحات: {initialValues.description}</Alert>
            )}

            {isSecretariatCartable && (
              <>
                <CheckGuild
                  isOpen={isAcceptGuildOpen}
                  title="تایید"
                  toggle={() => setIsAcceptGuildOpen(false)}
                  type={type}
                  useMutate={
                    isSameString(type, "County")
                      ? useInvastigationAndAcceptByProvinceSecretriatForCountyGuildRoomRequest
                      : isSameString(type, "Province")
                      ? useInvastigationAndAcceptByMainlocationSecretriatForProvinceGuildRoomRequest
                      : useInvastigationAndAcceptByMainlocationSecretriatForUnionRequest
                  }
                />
                <CheckGuild
                  isOpen={isRejectGuildOpen}
                  title="رد"
                  toggle={() => setIsRejectGuildOpen(false)}
                  type={type}
                  useMutate={
                    isSameString(type, "province")
                      ? useInvastigationAndRejectByMainlocationSecretriatForProvinceGuildRoomRequest
                      : isSameString(type, "county")
                      ? useInvastigationAndRejectByProvinceSecretriatForCountyGuildRoomRequest
                      : useInvastigationAndRejectByMainlocationSecretriatForUnionRequest
                  }
                />
              </>
            )}

            {isItManagerCartable && (
              <CheckGuild
                isOpen={isActiveByItManager}
                title="فعال کردن"
                toggle={() => setIsActiveByItManager(false)}
                type={type}
                isItManager={isItManagerCartable}
                useMutate={
                  isSameString(type, "county")
                    ? useActiveCountyGuildRoomByItManger
                    : isSameString(type, "province")
                    ? useActiveProvinceGuildRoomByItManger
                    : useActiveUnionByItManger
                }
              />
            )}

            {isManagerCartable && (
              <CheckGuild
                isOpen={isAcceptGuildOpen}
                isManager
                title="تایید"
                toggle={() => setIsAcceptGuildOpen(false)}
                type={type}
                useMutate={
                  isSameString(type, "County")
                    ? useSetMangerIdeaAboutCountyGuildRoomRequest
                    : isSameString(type, "province")
                    ? useSetManagerIdeaAboutProvinceGuildRoomRequest
                    : useSetManagerIdeaAboutUnionRequest
                }
              />
            )}

            {isManagerCartable && (
              <ChangeSecretariat
                hasSecretariat={
                  isSameString(type, "union")
                    ? initialValues.status > 4
                    : initialValues.status > 3
                }
                isOpen={isChangeSecretariatOpen}
                toggleModal={() => setIsChangeSecretariatOpen(false)}
                getUserQuery={
                  isSameString(type, "county")
                    ? useGetSecretariatOfCountyGuildRoomRequest
                    : isSameString(type, "province")
                    ? useGetSecretariatOfProvinceCountyGuildRoomRequest
                    : useGetSecretariatOfUnionRequest
                }
                useMutate={
                  isSameString(type, "province")
                    ? useChangeSecretariatOfProvinceGuildRoomRequestByManger
                    : isSameString(type, "county")
                    ? useChangeSecretariatOfCountyGuildRoomRequestByManger
                    : useChangeSecretariatOfUnionRequestByManger
                }
              />
            )}

            <Timeline
              data={[
                {
                  title: "اسناد ثبتی",
                  color: "success",
                  icon: <FileText size={14} />,
                  customContent: (
                    <>
                      <RegisteryDocsDetails data={initialValues} type={type} />
                    </>
                  ),
                },
                {
                  title: "لیست کاربران",
                  color: "success",
                  icon: <File size={14} />,
                  customContent: (
                    <>
                      <Button
                        color="primary"
                        outline
                        onClick={() =>
                          setIsMembersInfoDetailsOpen(!isMembersInfoDetailsOpen)
                        }
                      >
                        مشاهده کاربران
                      </Button>
                      <Collapse isOpen={isMembersInfoDetailsOpen}>
                        <MembersInfoDetails
                          noChangeAllServiceState={noChangeAllServiceState}
                          data={initialValues}
                          isOpen={isMembersInfoDetailsOpen}
                          type={type}
                        />
                      </Collapse>
                      <hr />
                    </>
                  ),
                },
                {
                  title: "مشخصات مکانی",
                  color: "success",
                  icon: <FileText size={14} />,
                  customContent: (
                    <>
                      <Button
                        color="primary"
                        outline
                        onClick={() =>
                          setIsLocationInfoDetailsOpen(
                            !isLocationInfoDetailsOpen
                          )
                        }
                      >
                        مشاهده مشخصات مکانی
                      </Button>

                      <Collapse isOpen={isLocationInfoDetailsOpen}>
                        <LocationInfoDetails
                          data={initialValues}
                          type={type}
                          isOpen={isLocationInfoDetailsOpen}
                        />
                      </Collapse>
                      <hr />
                    </>
                  ),
                },
                !isItManagerCartable && {
                  title: "تاریخچه درخواست",
                  color: "success",
                  icon: <File size={14} />,
                  customContent: (
                    <>
                      <Button
                        color="primary"
                        outline
                        onClick={() =>
                          setIsHistoryGuildRequestOpen(
                            !isHistoryGuildRequestOpen
                          )
                        }
                      >
                        مشاهده تاریخچه
                      </Button>

                      <Collapse isOpen={isHistoryGuildRequestOpen}>
                        <RequestHistory
                          getHistoriesMutation={historyMutation}
                          isOpen={isHistoryGuildRequestOpen}
                        />
                      </Collapse>
                      <hr />
                    </>
                  ),
                },
                {
                  title: "اطلاعات بانکی",
                  color: "success",
                  icon: <File size={14} />,
                  customContent: (
                    <>
                      <Button
                        color="primary"
                        outline
                        onClick={() => setIsBankInfoOpen(!isBankInfoOpen)}
                      >
                        اطلاعات بانکی
                      </Button>

                      <Collapse isOpen={isBankInfoOpen}>
                        <BankInfo initialValues={initialValues} />
                      </Collapse>
                      <hr />
                    </>
                  ),
                },
                {
                  title: "مشاهده روی نقشه",
                  color: "success",
                  icon: <File size={14} />,
                  customContent: (
                    <>
                      <Button
                        color="primary"
                        outline
                        onClick={() => setIsShowOnMapOpen(!isShowOnMapOpen)}
                      >
                        مشاهده روی نقشه
                      </Button>

                      <Collapse isOpen={isShowOnMapOpen}>
                        <ShowOnMap
                          point={{
                            lat: initialValues.positionLat,
                            lng: initialValues.positionLong,
                          }}
                        />
                      </Collapse>
                    </>
                  ),
                },
                isSameString(type, "union") && {
                  title: "مشاغل زیرمجموعه",
                  color: "success",
                  icon: <File size={14} />,
                  customContent: (
                    <>
                      <Button
                        color="primary"
                        outline
                        onClick={() => setIsShowSubsetOfJob(!isShowSubsetOfJob)}
                      >
                        مشاغل زیرمجموعه
                      </Button>

                      <Collapse isOpen={isShowSubsetOfJob}>
                        {isShowSubsetOfJob && (
                          <SubsetOfJobs initialValues={initialValues} />
                        )}
                      </Collapse>
                    </>
                  ),
                },
              ]}
            />

            {!isDetails &&
              !isManagerCartable &&
              initialValues.status === GuildsActivation.SelectBySecretariat && (
                <StatusWrapper
                  curStatus={[initialValues.status]}
                  guildStatus={[GuildsActivation.SelectBySecretariat]}
                >
                  <SelectComponent
                    selectMutation={selectMutation}
                    type={type}
                  />
                </StatusWrapper>
              )}

            {!isDetails && isSecretariatCartable && (
              <StatusWrapper
                curStatus={[initialValues.status]}
                guildStatus={[
                  GuildsActivation.InvestigationBySecretariat,
                  GuildsActivation.ApplyBySecretariat,
                ]}
              >
                <FormGroup style={{ marginTop: "10px" }}>
                  <SubmitButton
                    btnText="تایید درخواست"
                    clearable
                    clearableTxt="رد درخواست"
                    isLoading={false}
                    onClear={() => setIsRejectGuildOpen(true)}
                    onClick={() => setIsAcceptGuildOpen(true)}
                  />
                </FormGroup>
              </StatusWrapper>
            )}

            {!isDetails && isItManagerCartable && (
              <StatusWrapper
                curStatus={[initialValues.status]}
                guildStatus={[GuildsActivation.WaitingForITManger]}
              >
                <FormGroup style={{ marginTop: "10px" }}>
                  <SimpleSubmitButton
                    isLoading={false}
                    btnText={`فعال کردن ${
                      isSameString(type, "union") ? "اتحادیه" : "صنف"
                    }`}
                    onCLick={() => setIsActiveByItManager(true)}
                  />
                </FormGroup>
              </StatusWrapper>
            )}

            {!isDetails && isManagerCartable && (
              <StatusWrapper
                curStatus={[initialValues.status]}
                guildStatus={[GuildsActivation.AcceptedBySecretariat]}
              >
                <Button
                  style={{ margin: "3px", marginTop: "10px" }}
                  color="primary"
                  onClick={() => {
                    setIsAcceptGuildOpen(true);
                  }}
                >
                  ثبت نظر
                </Button>
              </StatusWrapper>
            )}

            {isManagerCartable && (
              <SimpleSubmitButton
                isLoading={false}
                btnText={
                  isSameString(type, "union")
                    ? initialValues.status > 4
                      ? "تغییر دبیرخانه"
                      : "تخصیص دبیرخانه"
                    : initialValues.status > 3
                    ? "تغییر دبیرخانه"
                    : "تخصیص دبیرخانه"
                }
                onCLick={() => setIsChangeSecretariatOpen(true)}
              />
            )}
          </>
        )}
      </>
    </CardWrapper>
  );
};

export { CheckGuildsActivation };
