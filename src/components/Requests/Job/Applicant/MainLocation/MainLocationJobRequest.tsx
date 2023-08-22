import React from "react";
import { Route, Switch } from "react-router";
import { MainLocationAddRequest } from "./Add/MainLocationAddRequest";
import { MainLocationJobRequestsList } from "./List/MainLocationJobRequestsList";

export interface ProvinceJobRequestProps {}

const MainLocationJobRequest: React.FC<ProvinceJobRequestProps> = () => {

  return (
    <Switch>
      <Route
        path="/Requests/MainLocationJobRequest/Add"
        component={MainLocationAddRequest}
      />
      <Route
        path="/Requests/MainLocationJobRequest/List"
        component={MainLocationJobRequestsList}
      />
    </Switch>
  );
};

export { MainLocationJobRequest };
