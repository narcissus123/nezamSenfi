import React, { FC } from "react";
import {
  useGetCancellationJobRequireDocument,
  useGetCancellationJobRequireDocumentHistory,
  useSetCancellationJobRequireDocument,
} from "../../../../../../core/services/api/job.api";
import { SharedAddDoc } from "../Shared/SharedAddDoc";

const Cancellation: FC = () => {
  return (
    <SharedAddDoc
      useGetJobRequireDocument={useGetCancellationJobRequireDocument}
      useSetJobRequireDocument={useSetCancellationJobRequireDocument}
      useGetJobRequireDocumentHistory={
        useGetCancellationJobRequireDocumentHistory
      }
    />
  );
};

export { Cancellation };
