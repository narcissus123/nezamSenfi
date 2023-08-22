import React, { useState } from "react";
import { JobFieldWrapper } from "../JobFieldWrapper";

import { AddJobCategory } from "./AddJobCategory";
import { ListJobCategory } from "./ListJobCategory";

const JobCategoryContainer: React.FC = () => {
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <>
      <JobFieldWrapper text="ثبت گروه">
        <AddJobCategory setRefetch={setRefetch} />
      </JobFieldWrapper>
      <JobFieldWrapper text="لیست گروه ها">
        <ListJobCategory refetch={refetch} />
      </JobFieldWrapper>
    </>
  );
};

export { JobCategoryContainer };
