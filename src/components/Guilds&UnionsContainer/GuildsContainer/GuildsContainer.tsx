import React from "react";
import { Route, Switch } from "react-router-dom";
import { MainLocation } from "./MainLocation/MainLocation";

import { County } from "./County";
import { Provincial } from "./Provincial";

const GuildsContainer: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/Guilds/province" component={Provincial} />
        <Route exact path="/Guilds/mainlocation" component={MainLocation} />
        <Route exact path="/Guilds/county" component={County} />
      </Switch>
    </>
  );
};

export { GuildsContainer };
