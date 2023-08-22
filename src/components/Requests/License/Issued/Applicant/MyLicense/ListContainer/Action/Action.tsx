import React from "react";
import {  DownloadCloud, FileMinus, } from "react-feather";
import { Button, Spinner } from "reactstrap";
import { useDownloadLicenseByUserApplicant } from "../../../../../../../../core/services/api";
import { GoToTruePage } from "../../../../../../../../core/utils/context/StatusProvider";


interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: { licenseRequestStatus: number , licenseReuestId : number};
    };
  };
  flow: string;
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original: { licenseRequestStatus , licenseReuestId },
    },
  },
  flow,
}) => {
  const downloadLicenseMutation = useDownloadLicenseByUserApplicant();

  
  const downloadLicense = () => {
    downloadLicenseMutation.mutate(+licenseReuestId);
  };
  
  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        onClick={() =>
          GoToTruePage(licenseRequestStatus, flow, String(licenseReuestId))
        }
      >
        ابطال &nbsp;
        <FileMinus
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="success"
        onClick={() => {
          downloadLicense();
        }}
      >
        دانلود پروانه &nbsp;
        {downloadLicenseMutation.isLoading ? (
          <Spinner color="white" size="sm" />
        ) : (
          <DownloadCloud
            style={{ position: "relative", top: "-2px" }}
            size={12}
            color="white"
          />
        )}
      </Button>
    </div>
  );
};

export { Action };
