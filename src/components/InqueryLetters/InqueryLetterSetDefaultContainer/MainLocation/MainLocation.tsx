import * as React from "react";
import { usePostSetDefaultInquiryLetter } from "../../../../core/services/api";
import { InqueryLetterSetDefaultContainer } from "../InqueryLetterSetDefaultContainer";

const MainLocation: React.FC = () => {
  const setMutation = usePostSetDefaultInquiryLetter();

  return (
    <>
      <InqueryLetterSetDefaultContainer
        setMutation={setMutation}
        from="MainLocation"
        selectData={[]}
        isLoading={false}
        setLoading={setMutation.isLoading}
      />
    </>
  );
};

export { MainLocation };
