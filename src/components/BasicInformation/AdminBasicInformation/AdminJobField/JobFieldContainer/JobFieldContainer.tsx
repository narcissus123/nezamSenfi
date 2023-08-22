import React, { useState } from "react";
import { JobFieldWrapper } from "../JobFieldWrapper";
import { AddJobFields } from "./AddJobFields";
import { ListJobField } from "./ListJobField";

const JobFieldContainer: React.FC = () => {
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <>
      <JobFieldWrapper text="ثبت و مدیریت زمینه های کاری">
        <AddJobFields />
      </JobFieldWrapper>
      <JobFieldWrapper text="لیست زمینه های کاری">
        <ListJobField refetch={refetch} />
      </JobFieldWrapper>
    </>
  );
};

export { JobFieldContainer };
