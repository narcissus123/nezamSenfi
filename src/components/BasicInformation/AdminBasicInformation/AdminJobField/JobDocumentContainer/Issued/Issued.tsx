import React, { FC } from "react";
import {
  useGetIssuingJobRequireDocument,
  useSetIssuingJobRequireDocument,
  useGetIssuingJobRequireDocumentHistory,
} from "../../../../../../core/services/api/job.api";
import { SharedAddDoc } from "../Shared";

const Issued: FC = () => {
  return (
    <>
      <SharedAddDoc
        useGetJobRequireDocumentHistory={useGetIssuingJobRequireDocumentHistory}
        useGetJobRequireDocument={useGetIssuingJobRequireDocument}
        useSetJobRequireDocument={useSetIssuingJobRequireDocument}
      />
    </>
  );
};

export { Issued };
