import React, { useEffect } from "react";
import { ComponentSpinner } from "../../components/common/Spinner/LoadingSpinner";
import { getAccessToken } from "../../core/services/authentication/authentication.service";

const OldLicenseExcel: React.FC = () => {
  useEffect(() => {
    async function openOldLicenseExcel() {
      try {
        window.location.href =
          "https://oldlicense.sabakorg.ir/check_auth?token=" + getAccessToken();
      } catch (error) {}
    }
    openOldLicenseExcel();
  }, []);
  return <ComponentSpinner />;
};

export { OldLicenseExcel };
