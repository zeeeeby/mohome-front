import React, { Component } from "react";
import NavBar from "../navbar";
import Home from "../home";
import Photo from "../photo";
import Video from "../video";
import Music from "../music";
import SignInPage from "../sign-in-page";
import SignUpPage from "../sign-up-page";
import Cookies from "universal-cookie";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./app.css";
const cookies = new Cookies();
export default class App extends Component {
  render() {
    // temporarily
    window.logout = () => {
      cookies.remove("id_token");
      this.forceUpdate();
    };
    return (
      <div>
        <Switch>
          <Route
            path="/"
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <Home />
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
            exact
          />
          <Route
            path="/photo"
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <Photo />
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/video"
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <Video />
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/music"
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <Music />
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/sign-in"
            render={({ history }) => {
              return cookies.get("id_token") ? (
                <Redirect to={"/"} />
              ) : (
                <SignInPage history={history} />
              );
            }}
          />
          <Route
            path="/sign-up"
            render={({ history }) => {
              return cookies.get("id_token") ? (
                <Redirect to={"/"} />
              ) : (
                <SignUpPage history={history} />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}
