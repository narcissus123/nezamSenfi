import React from "react";
import { Progress } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: { progressBar: number };
    };
  };
  flow: string;
}

const ProgressAnimated: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { progressBar },
    },
  },
  flow,
}) => {
  return (
    <div className="d-flex justify-content-center align-content-center w-100">
      <Progress
        className="progress-xl  w-100 m-0"
        animated
        striped
        color="primary"
        value={progressBar * 100}
      >
        {Math.trunc(progressBar * 100) + "%"}
      </Progress>
    </div>
  );
};

export { ProgressAnimated };
