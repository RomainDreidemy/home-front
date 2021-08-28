import React, { ReactElement } from "react";
import {
  Router as ReactRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NotFoundPage from "../../pages/errors/NotFoundPage";
import { getPath, IRoute, routes } from "../../routes";
import history from "../../services/history";

const Router = (): ReactElement => {
  const isLoggedIn = (): boolean => {
    return false;
  };

  return (
    <ReactRouter history={history}>
      <Switch>
        {routes.map((route: IRoute) => (
          <Route
            key={route.name}
            exact
            path={route.path}
            render={() =>
              route.protected ? (
                isLoggedIn() ? (
                  <route.component />
                ) : (
                  <Redirect to={getPath("home")} />
                )
              ) : (
                <route.component />
              )
            }
          />
        ))}
        <Route component={NotFoundPage} />
      </Switch>
    </ReactRouter>
  );
};

export default Router;
