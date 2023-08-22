import React, { FC } from "react";
import { useParams } from "react-router";
import { Card, CardBody } from "reactstrap";
import {
  usePostAcceptCountyUnionPositionRequestInuiryResponseBySecretriat,
  usePostGetCountyUnionPositionRequestInquiryFiles,
  usePostRejectCountyUnionPositionRequestInuiryResponseBySecretriat,
  usePostUploadCountyUnionPositionRequestInquiryResponseBySecretriat,
} from "../../../../../../../../core/services/api";
import { useGetCountyUnionPositionRequestInquiries } from "../../../../../../../../core/services/api/inquery.api";
import { UploadPositionRequestInquiry } from "../../../../../JobRequestFlow/UploadPositionRequestInquiry/UploadPositionRequestInquiry";

const UnionUploadInquiryFiles: FC = () => {
  const { id }: any = useParams();

  const getUnion = useGetCountyUnionPositionRequestInquiries(id);
  const updateMutation = usePostUploadCountyUnionPositionRequestInquiryResponseBySecretriat();
  const acceptInquiry = usePostAcceptCountyUnionPositionRequestInuiryResponseBySecretriat();
  const rejectInquiry = usePostRejectCountyUnionPositionRequestInuiryResponseBySecretriat();
  const getFiles = usePostGetCountyUnionPositionRequestInquiryFiles();

  return (
    <Card>
      <CardBody>
        <UploadPositionRequestInquiry
          updateMutation={updateMutation}
          getRequestInquiry={getUnion}
          acceptInquiry={acceptInquiry}
          rejectInquiry={rejectInquiry}
          redirectLink="/ManageCartable/UnionJobRequestCartable"
          getFiles={getFiles}
          goToPage={
            "/ManageRequests/SecretariatJobRequestslist/EditUnionInquiry/" + id
          }
          rejectRedirectLink={
            "/ManageRequests/SecretariatJobRequestslist/ConfirmUnion/" + id
          }
        />
      </CardBody>
    </Card>
  );
};

export { UnionUploadInquiryFiles };
