import React, { useState } from "react";
import { JobFieldWrapper } from "../JobFieldWrapper";
import { AddJob } from "./AddJob";
import { JobList } from "./JobList/JobList";

const JobContainer: React.FC = () => {
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <>
      <JobFieldWrapper text="ثبت و مدیریت عنوان فعالیت اقتصادی">
        <AddJob setRefetch={setRefetch} />
      </JobFieldWrapper>
      <JobFieldWrapper text="لیست">
        <JobList refetch={refetch} />
      </JobFieldWrapper>
    </>
  );
};

export { JobContainer };
