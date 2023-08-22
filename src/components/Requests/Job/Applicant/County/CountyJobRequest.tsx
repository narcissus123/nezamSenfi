import React from "react";
import { Route, Switch } from "react-router";
import { CountyAddRequest } from "./Add/CountyAddRequest";
import { CountyJobRequestsList } from "./List";

export interface CountyJobRequestProps {}

const CountyJobRequest: React.FC<CountyJobRequestProps> = () => {
  return (
    <Switch>
      <Route
        path="/Requests/CountyJobRequest/Add"
        component={CountyAddRequest}
      />
      <Route
        path="/Requests/CountyJobRequest/List"
        component={CountyJobRequestsList}
      />
    </Switch>
  );
};

export { CountyJobRequest };
