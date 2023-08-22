import React, { FC, useState } from "react";
import { Edit, User } from "react-feather";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  CardBody,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import { RejectExpertStatusEnum } from "../../../../../../../../core/enums/reject-expert-status.enums";
import {
  useCheckLicenseRequestIntersects,
  useConfirmExpertMacthing,
  useRejectExpertMatching,
  useSendIntersectionToDistrictCourt,
} from "../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../core/utils";
import {
  FormDivider,
  SimpleSubmitButton,
} from "../../../../../../../common/Form";
import { ListTable } from "../../../../../../../common/ListTable/ListTable";
import { SweetAlertCallback } from "../../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import Timeline from "../../../../../../../common/timeline";
import { CheckComponent } from "./CheckComponent";
import { columns } from "./Columns";
import Styles from "./ExpertDetails.module.scss";
import { SectionsList } from "./SectionsList/SectionsList";

interface ICheckIntersect {
  lastName: string;
  licenseRequestId: number;
  name: string;
  nationalCode: string;
  sections: any[];
  userId: number;
}

interface IPropTypes {
  sections: any[];
  primaryInformation: any;
  licenseRequestDetails: any;
  refetch: any;
}

const ExpertDetails: FC<IPropTypes> = ({
  sections,
  primaryInformation,
  licenseRequestDetails,
  refetch,
}) => {
  const [checkIntersectResult, setCheckIntersectResult] = useState<
    Array<ICheckIntersect>
  >([]);

  const [hasIntersect, setHasIntersect] = useState<boolean>(
    primaryInformation.fixedOrMobieTypeByExpert === 1 ? true : false
  );
  const [intersectChecked, setIntersectChecked] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const { req_id } = useParams<{ req_id: string }>();

  const checkIntersect = useCheckLicenseRequestIntersects();
  const sendToDistrictMutation = useSendIntersectionToDistrictCourt();

  const onCheckIntersects = () => {
    checkIntersect.mutate(+req_id, {
      onSuccess: (val) => {
        try {
          const result = val.data.result;
          console.log(result);

          setCheckIntersectResult(result);

          if (!!result === false || result.length === 0) {
            setHasIntersect(false);
          } else setHasIntersect(true);
          setIntersectChecked(true);
        } catch (error) {
          console.log(error);

          setHasIntersect(false);
        }
      },
    });
  };

  const onSendToDistrictCourt = () => setShowConfirmation(true);

  const history = useHistory();

  return (
    <>
      {licenseRequestDetails.rejectExpertStatusTitle && (
        <Alert color="info">
          {licenseRequestDetails.rejectExpertStatusTitle}
        </Alert>
      )}
      <Row>
        <SweetAlertCallback
          mutation={sendToDistrictMutation}
          title="آیا مطمئنید؟"
          onCancel={() => {
            setShowConfirmation(false);
          }}
          onClose={() => {
            setShowConfirmation(false);
          }}
          onConfirm={() => {
            setShowConfirmation(false);
            sendToDistrictMutation.mutate(+req_id, {
              onSuccess: () => {
                setShowConfirmation(false);
                // history.push("/ManageLicense/IssuingResponsible/MyCartable");
                showToast(["با موفقیت انجام شد."], ToastTypes.success);
              },
            });
          }}
          show={showConfirmation}
        >
          آیا از ارسال این درخواست به هیئت بدوی مطمئنید؟
        </SweetAlertCallback>
        <Col>
          <Timeline
            data={[
              {
                title: "اطلاعات کارشناسی",
                color: "success",
                icon: <User size={14} />,
                customContent: (
                  <ListGroup tag="div">
                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        وضعیت مکانی واحد :{" "}
                        {primaryInformation
                          ? primaryInformation.fixedOrMobieTypeByExpertTitle
                          : ""}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {`نوع واحد صنفی : ${
                          primaryInformation
                            ? primaryInformation.guildUnitTypeTitle
                            : ""
                        }`}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        شغل :{" "}
                        {primaryInformation ? (
                          primaryInformation.jobs ? (
                            <>
                              <ul>
                                {primaryInformation.jobs.map((row: any) => {
                                  return (
                                    <li>{`${row.title} ${
                                      row.isMain ? "- شغل اصلی" : ""
                                    }`}</li>
                                  );
                                })}
                              </ul>
                            </>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {`وضعیت واحد صنفی : ${
                          primaryInformation
                            ? primaryInformation.statusOfGuildUnitTitle
                            : ""
                        }`}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {`تامین خودرو : ${
                          primaryInformation
                            ? primaryInformation.carSupplyTitle
                            : ""
                        }`}
                      </ListGroupItem>
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {`تاریخ بازدید : ${
                          primaryInformation
                            ? primaryInformation.visitedDate
                            : ""
                        }`}
                      </ListGroupItem>
                    </ListGroup>

                    <ListGroup className="list-group-horizontal-sm">
                      <ListGroupItem className={Styles["item-flex"]} tag="a">
                        {`مرکز جهاد : ${
                          primaryInformation
                            ? primaryInformation.jahadCenterTitle
                            : ""
                        }`}
                      </ListGroupItem>
                    </ListGroup>
                  </ListGroup>
                ),
              },
            ]}
          />
        </Col>
      </Row>

      <hr />

      <FormDivider
        textHeader={
          primaryInformation &&
          primaryInformation.fixedOrMobieTypeByExpert === 1
            ? "لیست قطعات"
            : "جزییات کارشناسی"
        }
      >
        {primaryInformation &&
        primaryInformation.fixedOrMobieTypeByExpert === 1 ? (
          <>
            {sections && sections.length > 0 && (
              <SectionsList sections={sections} />
            )}
            {sections && sections.length === 0 && (
              <Alert color="info" className="mt-1">
                قطعه ای موجود نمی باشد!
              </Alert>
            )}
          </>
        ) : (
          <>
            <>
              <Alert
                color="primary"
                className="d-flex justify-content-center align-items-center mt-1"
              >
                <Link
                  target="_blank"
                  to={`/IssueingResponsible/Inspection/10/Capacity/${req_id}`}
                >
                  <SimpleSubmitButton
                    btnText="جزئیات کارشناسی"
                    isLoading={false}
                    className="mr-1"
                    onCLick={() => {}}
                  />
                </Link>

                <p>نوع واحد صنفی این درخواست سیار میباشد.</p>
              </Alert>
            </>
          </>
        )}
      </FormDivider>

      <hr />
      <FormDivider textHeader="بررسی و تایید اطلاعات کارشناس">
        <CardBody>
          {primaryInformation &&
          primaryInformation.fixedOrMobieTypeByExpert === 1 ? (
            hasIntersect ? (
              <Alert color="info">
                برای تایید اطلاعات کارشناس ابتدا همپوشانی را بررسی کنید
              </Alert>
            ) : (
              <Alert color="info">با هیچ درخواستی همپوشانی ندارد</Alert>
            )
          ) : (
            <></>
          )}

          {primaryInformation.fixedOrMobieTypeByExpert === 1 && (
            <FormDivider textHeader="">
              <Alert
                color="primary"
                className="mt-1 d-flex align-items-center p-1"
              >
                <SimpleSubmitButton
                  isLoading={false}
                  btnText="بررسی همپوشانی قطعات"
                  outLine
                  onCLick={onCheckIntersects}
                />
                <p className="ml-1">برای بررسی همپوشانی روی دکمه کلیک کنید</p>
              </Alert>

              {checkIntersectResult &&
                (checkIntersectResult.length > 0 ||
                  checkIntersect.isLoading) && (
                  <CardBody>
                    <ListTable
                      columns={columns}
                      isLoading={checkIntersect.isLoading}
                      onPageChange={() => {}}
                      pageCountList={0}
                      customPageSize={1000}
                      tableData={checkIntersectResult}
                    >
                      {{
                        headerTable: <CardTitle>جزییات همپوشانی</CardTitle>,
                      }}
                    </ListTable>

                    <SimpleSubmitButton
                      btnText="جزییات همپوشانی ها"
                      isLoading={false}
                      onCLick={() =>
                        history.push(
                          "/ManageLicense/IssuingResponsible/IntersectionDetails/" +
                            req_id
                        )
                      }
                    />
                  </CardBody>
                )}
            </FormDivider>
          )}
          <hr />

          <Row>
            <Col sm="auto">
              <CheckComponent
                acceptMutation={useConfirmExpertMacthing}
                refetch={refetch}
                acceptStep={
                  licenseRequestDetails.rejectExpertStatus !==
                  RejectExpertStatusEnum.CourtResult
                    ? (licenseRequestDetails &&
                        licenseRequestDetails.rejectExpertStatus ===
                          RejectExpertStatusEnum.Accept) ||
                      hasIntersect
                    : false
                }
                rejectStep={
                  licenseRequestDetails.rejectExpertStatus !==
                  RejectExpertStatusEnum.CourtResult
                    ? //!hasIntersect ||
                      licenseRequestDetails &&
                      licenseRequestDetails.rejectExpertStatus !==
                        RejectExpertStatusEnum.Unknown &&
                      licenseRequestDetails.rejectExpertStatus !==
                        RejectExpertStatusEnum.Fix
                    : false
                }
                hasIntersect={
                  primaryInformation.fixedOrMobieTypeByExpert === 1
                    ? checkIntersect.data?.data.result &&
                      (checkIntersect.data?.data.result.length > 0 ||
                        (!checkIntersect.isError &&
                          !checkIntersect.isSuccess) ||
                        checkIntersect.isError)
                    : false
                }
                rejectMutation={useRejectExpertMatching}
              />
            </Col>
            <Col sm="auto" className="d-flex align-items-center">
              <SimpleSubmitButton
                disabled={
                  (primaryInformation.fixedOrMobieTypeByExpert === 1 &&
                    checkIntersect.data?.data.result &&
                    !(checkIntersect.data?.data.result.length > 0)) ||
                  // licenseRequestDetails &&
                  (licenseRequestDetails &&
                    licenseRequestDetails.rejectExpertStatus !==
                      RejectExpertStatusEnum.Unknown &&
                    licenseRequestDetails.rejectExpertStatus !==
                      RejectExpertStatusEnum.Fix) ||
                  !hasIntersect ||
                  !intersectChecked
                }
                isLoading={false}
                btnText="ارسال به هیئت بدوی"
                onCLick={onSendToDistrictCourt}
                color="warning"
              />
            </Col>
          </Row>
          <Row>
            {licenseRequestDetails &&
              licenseRequestDetails.rejectExpertStatus ===
                RejectExpertStatusEnum.SendToCurt && (
                <Col sm="auto" className="d-flex align-items-center">
                  <SimpleSubmitButton
                    isLoading={false}
                    btnText="تکمیل اطلاعات پاسخ هیئت بدوی"
                    onCLick={() =>
                      history.push(
                        `/ManageLicense/IssuingResponsible/SetDistrictResult/${req_id}`
                      )
                    }
                    //color="warning"
                  />
                </Col>
              )}
          </Row>
        </CardBody>
      </FormDivider>
    </>
  );
};

export { ExpertDetails };
