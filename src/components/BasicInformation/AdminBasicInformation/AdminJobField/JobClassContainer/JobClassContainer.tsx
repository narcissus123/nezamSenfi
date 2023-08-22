import React, { useState } from "react";
import { JobFieldWrapper } from "../JobFieldWrapper/JobFieldWrapper";

import { AddJobClass } from "./AddJobClass";
import { ListJobClass } from "./ListJobClass";

const JobClassContainer: React.FC = () => {
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <>
      <JobFieldWrapper text="ثبت طبقه">
        <AddJobClass setRefetch={setRefetch} />
      </JobFieldWrapper>
      <JobFieldWrapper text="لیست طبقه ها">
        <ListJobClass refetch={refetch} />
      </JobFieldWrapper>
    </>
  );
};

export { JobClassContainer };
