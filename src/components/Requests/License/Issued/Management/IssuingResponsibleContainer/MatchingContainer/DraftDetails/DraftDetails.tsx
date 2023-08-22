import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import {
  useConfirmDraftOfMatching,
  useGetDraftOfMatching,
} from "../../../../../../../../core/services/api";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { SetSectionsDetails } from "../SetSectionsDetails/SetSectionsDetails";
import { CheckComponent } from "./CheckComponent/CheckComponent";


interface IPropTypes {
  sections: any
  licenseRequestDetails: any
  refetch: any
}

const DraftDetails: FC<IPropTypes> = ({
  sections,
  licenseRequestDetails,
  refetch,
}) => {
  const { req_id } = useParams<{ req_id: string }>();
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

  let newSections: any = [];
  if(sections){
    const copySections: any = [...sections];
    copySections.forEach((row: any) => {
      newSections.push({
        farmName: row.farmName,
        id: row.id,
        roundedArea: parseFloat(row.area).toFixed(2),
      });
    });
  }

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
      <div style={{ marginBottom: "150px" }}></div>
      <SetSectionsDetails
        sections={sections}
        licenseRequestDetails={licenseRequestDetails}
        refetch={refetch}
      />
      <Row>
        <Col>
          <Alert color="warning">
            قبل از تایید از ثبت بودن کروکی و پلان موقعیت قطعه مطمئن شوید!
          </Alert>
        </Col>
      </Row>
      <CheckComponent
        acceptMutation={useConfirmDraftOfMatching}
        refetch={() => {}}
      />
    </>
  );
};

export { DraftDetails };
