import React from "react";

import { Switch } from "react-router-dom";
import { SimpleProtectedRoute } from "../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { County } from "./County/County";
import { MainLocation } from "./MainLocation/MainLocation";
import { Province } from "./Province/Province";
import { Union } from "./Union/Union";

const JobRequestFlow: React.FC = () => {
  return (
    <Switch>
      <SimpleProtectedRoute component={County} path="/Requests/job/county" />
      <SimpleProtectedRoute
        component={Province}
        path="/Requests/job/province"
      />
      <SimpleProtectedRoute component={Union} path="/Requests/job/union" />
      <SimpleProtectedRoute
        component={MainLocation}
        path="/Requests/job/MainLocation"
      />
    </Switch>
  );
};

export { JobRequestFlow };
