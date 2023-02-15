import React from "react";
import loadable from "@loadable/component";
import { Route, Switch, Redirect } from "react-router-dom";

const Login = loadable(() => import("@pages/Login"));
const SignUp = loadable(() => import("@pages/SignUp"));
const App = () => {
  return (
    <>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </>
  );
};

export default App;

// pages - 서비스 페이지
// components - 짜잘 컴포넌트
// layouts - 공통 페이지
