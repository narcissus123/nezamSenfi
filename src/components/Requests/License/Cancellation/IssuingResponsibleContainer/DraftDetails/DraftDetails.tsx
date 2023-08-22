import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetDraftOfMatching } from "../../../../../../core/services/api";
import { useConfirmCancellationByIssuingResponsible, useRejectCancellationByIsuuingResponsible } from "../../../../../../core/services/api/cancelation.api";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";

import { CheckComponent } from "./CheckComponent/CheckComponent";

const DraftDetails: FC = () => {
  const { id: req_id } = useParams<{ id: string }>();
  const [pdfUrl, setPdfUrl] = useState<any>("");

  const {
    data: letterData,
    isFetching: letterIsFetching,
    isSuccess: letterIsSuccess,
    refetch: refetchLetter,
  } = useGetDraftOfMatching(+req_id);

  useEffect(() => {
    refetchLetter();
  }, []);

  useEffect(() => {
    if (letterData) {
      const result = letterData.data;

      let data = new Blob([result], { type: "application/pdf" });
      let pdfBlob = window.URL.createObjectURL(data);

      setPdfUrl(pdfBlob);
    }
  }, [letterData, letterIsSuccess]);

  return (
    <>
      {letterIsFetching ? (
        <FallBackSpinner setHeight={300} />
      ) : (
        pdfUrl && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "80%",
              height: "700px",
              margin: "0 auto",
            }}
          >
            <embed
              src={pdfUrl}
              title="پی دی اف نامه"
              type="application/pdf"
              width="100%"
              height="100%"
            />
          </div>
        )
      )}
      <CheckComponent
        acceptMutation={useConfirmCancellationByIssuingResponsible}
        rejectMutation={useRejectCancellationByIsuuingResponsible}
        refetch={() => {}}
      />
    </>
  );
};

export { DraftDetails };
