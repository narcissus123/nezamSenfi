import React from "react";
import { useParams } from "react-router";
import { Col, Row } from "reactstrap";
import { useServeLicenseRequestFileCancellation, useServeMyLicenseRequestFile } from "../../../../../../../../../core/services/api";
import { SimpleSubmitButton } from "../../../../../../../../common/Form";




interface IPropTypes {
  fileName: string
  folderName: string
}

const DownloadRow: React.FC<IPropTypes> = ({ fileName, folderName }) => {
  const download = useServeMyLicenseRequestFile();

  return (
    <>
      <Row style={{ marginBottom: "15px" }}>
        <Col md="8">
          <p
            style={{ display: "flex", alignItems: "center" }}
          >{` ${fileName}`}</p>
        </Col>
        <Col md="4">
          <SimpleSubmitButton
            color="success"
            onCLick={() =>
              download.mutate({ fileName: fileName, licenseRequestId: folderName })
            }
            isLoading={download.isLoading}
            btnText="دانلود"
          />
        </Col>
      </Row>
    </>
  );
};

export { DownloadRow };
