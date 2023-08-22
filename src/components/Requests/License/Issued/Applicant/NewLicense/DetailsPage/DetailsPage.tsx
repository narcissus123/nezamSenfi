import * as React from "react";
import { FC, useState } from "react";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { New } from "../New/New";
import { useParams } from "react-router-dom";

interface IPropTypes {
  licenseDetail?: any;
  setLicenseDetail?: any;
  sections?: any;
}

const DetailsPage: FC<IPropTypes> = ({ licenseDetail , setLicenseDetail, sections }) => {
  const [initialValues, setInitialValues] = useState<any>({});;
  
  const {req_id : id }= useParams<any>();
  
  return (
    <>
      {licenseDetail ? (
        <>
          <New
            sections={sections}
            setLicenseDetail={setLicenseDetail}
            inEditMode={true}
            id={+id}
            licenseDetail={licenseDetail}
          />
        </>
      ) : (
        <FallBackSpinner />
      )}
    </>
  );
};

export { DetailsPage };
