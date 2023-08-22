import React, { FC, Suspense, useEffect } from "react";
import { Route } from "react-router-dom";
// import { useCheckExpiry } from "../../../../core/utils/context/AuthenticationContext";
import { useGlobalState } from "../../../../core/utils/context/GlobalContext";
import {
  CanStatus,
  useStatusPermission,
} from "../../../../core/utils/context/StatusProvider";
import { FallBackSpinner } from "../../Spinner/FallBackSpinner/FallbackSpinner";

interface IPropTypes {
  component?: any;
  path: string;
  exact?: boolean;
  permissions?: string[] | string;
  flow?: string;
  status?: number;
}

const SimpleProtectedRoute: FC<IPropTypes> = ({
  component: Component,
  path,
  exact,
  flow,
  permissions,
  status,
  ...props
}) => {
  const res: any = props;

  // const checkExpirty = useCheckExpiry();

  const { setStatus } = useStatusPermission();

  const { req_id, section_id } = useGlobalState();

  useEffect(() => {
    if (res.computedMatch && res.computedMatch.params) {
      if (res.computedMatch.params.status)
        setStatus(res.computedMatch.params.status);

      if (res.computedMatch.params.req_id) {
        req_id[1](res.computedMatch.params.req_id);
      }
      if (res.computedMatch.params.section_id) {
        section_id[1](res.computedMatch.params.section_id);
      }
    }
  }, [res.computedMatch]);

  const Comp = (propss: any) => {
    try {
      return Component(propss);
    } catch (error) {
      return <Component {...props} />;
    }
  };

  return (
    <Route
      path={path}
      exact={exact}
      render={(propss) => (
        <CanStatus
          flow={flow}
          status={status}
          params={res.computedMatch.params}
        >
          <Suspense fallback={<FallBackSpinner />}>{Comp(propss)}</Suspense>
        </CanStatus>
      )}
    />
  );
};

export { SimpleProtectedRoute };
