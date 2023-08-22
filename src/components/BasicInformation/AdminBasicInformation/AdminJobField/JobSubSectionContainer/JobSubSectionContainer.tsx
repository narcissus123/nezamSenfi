import React, { useState } from "react";
import { JobFieldWrapper } from "../JobFieldWrapper/JobFieldWrapper";

import { AddJobSubSection } from "./AddJobSubSection/AddJobSubSection";
import { ListJobSubSection } from "./ListJobSubSection/ListJobSubSection";

const JobSubSectionContainer: React.FC = () => {
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <>
      <JobFieldWrapper text="ثبت قسمت">
        <AddJobSubSection setRefetch={setRefetch} />
      </JobFieldWrapper>
      <JobFieldWrapper text="لیست قسمت ها">
        <ListJobSubSection refetch={refetch} />
      </JobFieldWrapper>
    </>
  );
};

export { JobSubSectionContainer };
