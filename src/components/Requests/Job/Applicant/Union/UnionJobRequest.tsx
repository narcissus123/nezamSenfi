import React from "react";
import { Route, Switch } from "react-router";
import { UnionAddRequest } from "./Add/UnionAddRequest";
import { UnionJobRequestsList } from "./List";

export interface UnionJobRequestProps {}

const UnionJobRequest: React.FC<UnionJobRequestProps> = () => {
  return (
    <Switch>
      <Route path="/Requests/UnionJobRequest/Add" component={UnionAddRequest} />
      <Route
        path="/Requests/UnionJobRequest/List"
        component={UnionJobRequestsList}
      />
    </Switch>
  );
};

export { UnionJobRequest };
