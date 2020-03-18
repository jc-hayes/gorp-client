import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import NewTrailReport from "./containers/NewTrailReport";
import NotFound from "./containers/NotFound";
import Trails from "./containers/Trails";

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({ appProps }) {
    return (
      <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
        <UnauthenticatedRoute path="/signin" exact component={SignIn} appProps={appProps} />
        <UnauthenticatedRoute path="/signup" exact component={SignUp} appProps={appProps} />
        <AuthenticatedRoute path="/trails/new" exact component={NewTrailReport} appProps={appProps} />
        <AuthenticatedRoute path="/trails/:id" exact component={Trails} appProps={appProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
      </Switch>
    );
  }