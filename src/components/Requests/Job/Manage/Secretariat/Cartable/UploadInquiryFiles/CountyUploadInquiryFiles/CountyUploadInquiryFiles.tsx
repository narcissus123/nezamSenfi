import React, { FC } from "react";
import { useParams } from "react-router";
import { Card, CardBody } from "reactstrap";
import {
  usePostAcceptCountyGuildRooomPositionRequestInuiryResponseBySecretriat,
  usePostGetCountyGuildRooomPositionRequestInquiryFiles,
  usePostRejectCountyGuildRooomPositionRequestInuiryResponseBySecretriat,
  usePostUploadCountyGuildRooomPositionRequestInquiryResponseBySecretriat,
} from "../../../../../../../../core/services/api";
import { useGetCountyGuildRoomPositionRequestInquiries } from "../../../../../../../../core/services/api/inquery.api";
import { UploadPositionRequestInquiry } from "../../../../../JobRequestFlow/UploadPositionRequestInquiry/UploadPositionRequestInquiry";

const CountyUploadInquiryFiles: FC = () => {
  const { id }: any = useParams();

  const getCounty = useGetCountyGuildRoomPositionRequestInquiries(id);
  const updateMutation = usePostUploadCountyGuildRooomPositionRequestInquiryResponseBySecretriat();
  const acceptInquiry = usePostAcceptCountyGuildRooomPositionRequestInuiryResponseBySecretriat();
  const rejectInquiry = usePostRejectCountyGuildRooomPositionRequestInuiryResponseBySecretriat();
  const getFiles = usePostGetCountyGuildRooomPositionRequestInquiryFiles();

  return (
    <Card>
      <CardBody>
        <UploadPositionRequestInquiry
          updateMutation={updateMutation}
          getRequestInquiry={getCounty}
          acceptInquiry={acceptInquiry}
          rejectInquiry={rejectInquiry}
          redirectLink="/ManageCartable/CountyJobRequestCartable"
          rejectRedirectLink={
            "/ManageRequests/SecretariatJobRequestslist/ConfirmCounty/" + id
          }
          getFiles={getFiles}
          goToPage={
            "/ManageRequests/SecretariatJobRequestslist/EditCountyInquiry/" + id
          }
        />
      </CardBody>
    </Card>
  );
};

export { CountyUploadInquiryFiles };
