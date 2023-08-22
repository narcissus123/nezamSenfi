import React from "react";
import { GeographicalLocationForm } from "./GeographicalLocationForm";

interface IPropTypes {
  useMutation: any;
  isExpert: boolean;
  useGetSectionOfLicenseRequestById: any;
}

const GeographicalLocation: React.FC<IPropTypes> = ({
  isExpert,
  useMutation,
  useGetSectionOfLicenseRequestById,
}) => {
  return (
    <>
      <GeographicalLocationForm
        useMutation={useMutation}
        isExpert={isExpert}
        useGetSectionOfLicenseRequestById={useGetSectionOfLicenseRequestById}
      />
    </>
  );
};

export { GeographicalLocation };
