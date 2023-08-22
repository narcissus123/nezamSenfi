import React, { FC } from "react";
import { JobRequestStatus } from "../../../../core/enums/job-request-status";

interface IPropTypes {
  status?: JobRequestStatus[];
  curStatus: number[];
  guildStatus?: any[];
}

const StatusWrapper: FC<IPropTypes> = ({
  status = [],
  children,
  curStatus,
  guildStatus = [],
}) => {
  let checkStatus = false;
  if (status.length > 0) {
    checkStatus = curStatus.some((item: number) => {
      let result = false;
      status.forEach((stat: number) => {
        if (stat === +item) result = true;
      });
      return result;
    });
  } else if (guildStatus.length > 0) {
    checkStatus = curStatus.some((item: number) => {
      let result = false;
      guildStatus.forEach((stat: number) => {
        if (stat === +item) result = true;
      });
      return result;
    });
  }

  if (checkStatus) return <>{children}</>;
  else return null;
};

export { StatusWrapper };
