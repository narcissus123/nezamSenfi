import React from "react";
import { JobFieldWrapper } from "../JobFieldWrapper";
import { JobEdit } from "./JobEdit";

const JobEditContainer: React.FC = () => {
  return (
    <>
      <JobFieldWrapper text="بروزرسانی شغل">
        <JobEdit />
      </JobFieldWrapper>
    </>
  );
};

export { JobEditContainer };
