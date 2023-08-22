import React, { useState, useContext } from "react";
import { ToastTypes } from "../../enums";
import { RegisterStatusType } from "../../models";
import { ErpConfig } from "../erp/erp-config.utils";
import { showToast } from "../show-toast";
import { history } from "../../../history";
import { useGlobalState } from "./GlobalContext";

interface IStatus {
  registerFlow: RegisterStatusType;
  [key: string]: number | string;
}

interface IStatusContext {
  statusInfo: IStatus;
  setStatusInfo: React.Dispatch<React.SetStateAction<IStatus>>;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  status: number | number[];
}

const StatusContext = React.createContext<IStatusContext | null>(null);

const useStatusPermission = () => {
  const pr = useContext(StatusContext);
  if (pr === null) {
    throw new Error("must be inside of provider");
  }
  return pr;
};

const StatusProvider: React.FC = ({ children }) => {
  const [statusInfo, setStatusInfo] = useState<IStatus>({
    registerFlow: "primaryRegister",
  });
  const [status, setStatus] = useState<number>(1);

  return (
    <>
      <StatusContext.Provider
        value={{
          statusInfo,
          setStatusInfo,
          status: status,
          setStatus: setStatus,
        }}
      >
        {children}
      </StatusContext.Provider>
    </>
  );
};

interface CanProps {
  status?: number;
  flow?: string;
  params?: {
    req_id?: string | number;
    status?: string | number | string[] | number[];
  };
}

const compareWithErp = (
  flow: string,
  status: number | undefined = 0,
  userStatus: number[]
): object => {
  const ErpData = ErpConfig;
  let pageStatus = 0;
  let truePage = {};
  for (let key in ErpData[flow]) {
    if (ErpData[flow][key].page === ErpData[flow][status].page) {
      pageStatus = +key;
    }
    if (userStatus.some((p: any) => p === key.toString())) {
      truePage = ErpData[flow][key];
    }
  }
  return {
    pageStatus,
    truePage,
  };
};

const checkMatch = (canProps: CanProps) => {
  let match = false;
  const { status, flow = "", params } = canProps;

  const userStatus: any = Array.isArray(params?.status)
    ? params?.status
    : [params?.status];
  const compareErp: any = compareWithErp(flow, status, userStatus);

  if (compareErp.pageStatus === 0) {
    match = true;
  } else {
    match = userStatus.some((p: number) => p >= compareErp.pageStatus);
  }
  return { match: match, erp: compareErp.truePage };
};

const GoToTruePage = (status: number, flow: string, id: string) => {
  const userStatus: any = Array.isArray(status) ? status : [status];

  const ErpData = ErpConfig;
  let lastPage: string = "";
  for (let key in ErpData[flow]) {
    if (userStatus.some((p: any) => p === +key)) {
      history.push(ErpData[flow][key].page + id);
      return;
    }
    //lastPage = ErpData[flow][key].page + id;
  }

  for (let key in ErpData[flow]) {
    if (userStatus.some((p: any) => p >= +key)) {
      lastPage = ErpData[flow][key].page + id;
      //return;
    }
  }
  // showToast(["خطایی رخ داده است"], ToastTypes.error);
  history.push(lastPage);
};

const CanStatus: React.FC<CanProps> = (props) => {
  const { children } = props;
  //const history = useHistory();
  const match: any = checkMatch(props);
  const { req_id } = useGlobalState();
  if (match.match) {
    return <>{children}</>;
  } else {
    //history.push("/access-denied");
    showToast([match.erp.errorMessage], ToastTypes.error);
    if (req_id[0] === "0") history.push(match.erp.page);
    else history.push(match.erp.page + req_id[0]);
    return null;
  }
};

const CanStatusElement: React.FC<CanProps> = (props) => {
  const { children, status, params } = props;
  //const history = useHistory();
  try {
    const match: any = String(status) === params?.status ? true : false;
    if (match) {
      return <>{children}</>;
    } else {
      //history.push("/access-denied");
      return null;
    }
  } catch (error) {
    return null;
  }
};

export {
  StatusProvider,
  StatusContext,
  useStatusPermission,
  CanStatus,
  GoToTruePage,
  CanStatusElement,
};
