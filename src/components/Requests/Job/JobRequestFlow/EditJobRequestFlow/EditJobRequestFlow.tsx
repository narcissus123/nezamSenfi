import React from "react";
import { Switch } from "react-router-dom";
import { SimpleProtectedRoute } from "../../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { EditCountyJobRequest } from "../County/EditCountyJobRequest";
import { EditMainLocationJobRequest } from "../MainLocation/EditMainLocationJobRequest";
import { EditProvinceJobRequest } from "../Province/EditProvinceJobRequest/EditProvinceJobRequest";
import { EditUnionJobRequest } from "../Union/EditUnionJobRequest/EditUnionJobRequest";
export interface JobRequestProps {}

const EditJobRequestFlow: React.FC<JobRequestProps> = () => {
  return (
    <Switch>
      <SimpleProtectedRoute
        component={EditCountyJobRequest}
        exact
        status={4}
        path="/Requests/editjob/County/:status/EditResume/:req_id"
      />
      <SimpleProtectedRoute
        component={EditMainLocationJobRequest}
        exact
        status={4}
        path="/Requests/editjob/MainLocation/:status/EditResume/:req_id"
      />
       <SimpleProtectedRoute
        component={EditProvinceJobRequest}
        exact
        status={4}
        path="/Requests/editjob/Province/:status/EditResume/:req_id"
      />
       <SimpleProtectedRoute
        component={EditUnionJobRequest}
        exact
        status={4}
        path="/Requests/editjob/Union/:status/EditResume/:req_id"
      />
      {/* <Route component={Province} path="/Requests/job/province" />
      <Route component={Union} path="/Requests/job/union" />
      <Route component={MainLocation} path="/Requests/job/MainLocation" /> */}
    </Switch>
  );
};

export { EditJobRequestFlow };
