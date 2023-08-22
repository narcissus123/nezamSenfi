import React, { useState } from "react";
import { JobFieldWrapper } from "../JobFieldWrapper/JobFieldWrapper";

import { AddJobSubClass } from "./AddJobSubClass/AddJobSubClass";
import { ListJobSubClass } from "./ListJobSubClass";

const JobSubClassContainer: React.FC = () => {
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <>
      <JobFieldWrapper text="ثبت زیر طبقه">
        <AddJobSubClass setRefetch={setRefetch} />
      </JobFieldWrapper>
      <JobFieldWrapper text="لیست زیر طبقه ها">
        <ListJobSubClass refetch={refetch} />
      </JobFieldWrapper>
    </>
  );
};

export { JobSubClassContainer };
