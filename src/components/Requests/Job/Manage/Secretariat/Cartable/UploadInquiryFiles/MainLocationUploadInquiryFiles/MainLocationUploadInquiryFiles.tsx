import React, { FC } from "react";
import { useParams } from "react-router";
import { Card, CardBody } from "reactstrap";
import {
  usePostAcceptMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat,
  usePostGetMainLocationGuildRoomPositionRequestInquiryFiles,
  usePostRejectMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat,
  usePostUploadMainLocationGuildRoomPositionRequestInquiryResponseBySecretriat,
} from "../../../../../../../../core/services/api";
import { useGetMainLocationGuildRoomPositionRequestInquiries } from "../../../../../../../../core/services/api/inquery.api";
import { UploadPositionRequestInquiry } from "../../../../../JobRequestFlow/UploadPositionRequestInquiry/UploadPositionRequestInquiry";



const MainLocationUploadInquiryFiles: FC = () => {
  const { id }: any = useParams();

  const getUnion = useGetMainLocationGuildRoomPositionRequestInquiries(id);
  const updateMutation = usePostUploadMainLocationGuildRoomPositionRequestInquiryResponseBySecretriat();
  const acceptInquiry = usePostAcceptMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat();
  const rejectInquiry = usePostRejectMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat();
  const getFiles = usePostGetMainLocationGuildRoomPositionRequestInquiryFiles();

  return (
    <Card>
      <CardBody>
        <UploadPositionRequestInquiry
          updateMutation={updateMutation}
          getRequestInquiry={getUnion}
          acceptInquiry={acceptInquiry}
          rejectInquiry={rejectInquiry}
          getFiles={getFiles}
          goToPage={
            "/ManageRequests/SecretariatJobRequestslist/EditMainLocationInquiry/" +
            id
          }
          rejectRedirectLink={
            "/ManageRequests/SecretariatJobRequestslist/ConfirmMainLocation/" + id
          }
          redirectLink="/ManageCartable/MainLocationJobRequestCartable"
        />
      </CardBody>
    </Card>
  );
};

export { MainLocationUploadInquiryFiles };
