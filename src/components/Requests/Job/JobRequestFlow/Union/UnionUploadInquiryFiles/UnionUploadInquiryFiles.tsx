import React, { FC } from "react";

import { useParams } from "react-router";
import { Card, CardBody } from "reactstrap";
import {
  useGetPositionRequestInquiriesByIdByUserApplicantForUserApplicant,
  usePostUploadPositionRequestInquiryResponseByApplicant,
} from "../../../../../../core/services/api";
import { UploadPositionRequestInquiry } from "../../UploadPositionRequestInquiry/UploadPositionRequestInquiry";

const UnionUploadInquiryFiles: FC = () => {
  const { req_id: id }: any = useParams();

  const getCounty =
    useGetPositionRequestInquiriesByIdByUserApplicantForUserApplicant(id);
  const updateMutation =
    usePostUploadPositionRequestInquiryResponseByApplicant();

  return (
    <Card>
      <CardBody>
        <UploadPositionRequestInquiry
          updateMutation={updateMutation}
          getRequestInquiry={getCounty}
          redirectLink="/Requests/UnionJobRequest/List"
          editable
        />
      </CardBody>
    </Card>
  );
};

export { UnionUploadInquiryFiles };
