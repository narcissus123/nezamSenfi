import React, { FC, useState } from "react";
import { User } from "react-feather";
import { Link, useHistory, useParams } from "react-router-dom";
import { Alert, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import {
  useCheckLicenseRequestIntersects,
  useSendIntersectionToDistrictCourt,
} from "../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../core/utils";
import {
  FormDivider,
  SimpleSubmitButton,
} from "../../../../../../../common/Form";
import { SweetAlertCallback } from "../../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import Timeline from "../../../../../../../common/timeline";
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
                history.push("/ManageLicense/IssuingResponsible/MyCartable");
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
        {primaryInformation.fixedOrMobieTypeByExpert === 1 ? (
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
    </>
  );
};

export { ExpertDetails };
