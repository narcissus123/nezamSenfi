import React from "react";
import { Route, Switch } from "react-router";
import { ProvinceAddRequest } from "./Add/ProvinceAddRequest";
import { ProvinceJobRequestsList } from "./List/ProvinceJobRequestsList";

export interface ProvinceJobRequestProps {}

const ProvinceJobRequest: React.FC<ProvinceJobRequestProps> = () => {
  return (
    <Switch>
      <Route
        path="/Requests/ProvinceJobRequest/Add"
        component={ProvinceAddRequest}
      />
      <Route
        path="/Requests/ProvinceJobRequest/List"
        component={ProvinceJobRequestsList}
      />
    </Switch>
  );
};

export { ProvinceJobRequest };
