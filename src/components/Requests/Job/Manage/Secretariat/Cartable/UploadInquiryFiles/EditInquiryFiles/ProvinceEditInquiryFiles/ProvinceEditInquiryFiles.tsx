import React, { FC } from "react";
import { useParams } from "react-router";
import { Card, CardBody } from "reactstrap";
import {
  usePostAcceptProvinceGuildRoomPositionRequestInuiryResponseBySecretriat,
  usePostGetProvinceGuildRoomPositionRequestInquiryFiles,
  usePostRejectProvinceGuildRoomPositionRequestInuiryResponseBySecretriat,
  usePostUploadProvinceGuildRoomPositionRequestInquiryResponseBySecretriat,
} from "../../../../../../../../../core/services/api";
import { useGetProvinceGuildRoomPositionRequestInquiries } from "../../../../../../../../../core/services/api/inquery.api";
import { UploadPositionRequestInquiry } from "../../../../../../JobRequestFlow/UploadPositionRequestInquiry/UploadPositionRequestInquiry";

const ProvinceEditInquiryFiles: FC = () => {
  const { id }: any = useParams();

  const getProvince = useGetProvinceGuildRoomPositionRequestInquiries(id);
  const updateMutation = usePostUploadProvinceGuildRoomPositionRequestInquiryResponseBySecretriat();
  const acceptInquiry = usePostAcceptProvinceGuildRoomPositionRequestInuiryResponseBySecretriat();
  const rejectInquiry = usePostRejectProvinceGuildRoomPositionRequestInuiryResponseBySecretriat();
  const getFiles = usePostGetProvinceGuildRoomPositionRequestInquiryFiles();

  return (
    <Card>
      <CardBody>
        <UploadPositionRequestInquiry
          updateMutation={updateMutation}
          getRequestInquiry={getProvince}
          acceptInquiry={acceptInquiry}
          rejectInquiry={rejectInquiry}
          redirectLink={
            "/ManageRequests/SecretariatJobRequestslist/UploadProvinceInquiry/" +
            id
          }
          getFiles={getFiles}
          editable
        />
      </CardBody>
    </Card>
  );
};

export { ProvinceEditInquiryFiles };
