import React, { useState } from "react";
import { JobFieldWrapper } from "../JobFieldWrapper/JobFieldWrapper";

import { AddJobSection } from "./AddJobSection/AddJobSection";
import { ListJobSection } from "./ListJobSection/ListJobSection";

const JobSectionsContainer: React.FC = () => {
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <>
      <JobFieldWrapper text="ثبت بخش">
        <AddJobSection setRefetch={setRefetch} />
      </JobFieldWrapper>
      <JobFieldWrapper text="لیست بخش ها">
        <ListJobSection refetch={refetch} />
      </JobFieldWrapper>
    </>
  );
};

export { JobSectionsContainer };
