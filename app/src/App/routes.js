import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { getAuthUserID } from "modules/helper";
import Login from "container/Login";
import DashBoard from "container/Dashboard";
import PageLoader from "components/PageLoader";
import Profile from "container/Profile";
import Request from "container/Request";
import Porter from "container/Porter";
import Employee from "container/Employee";
import Report from "container/Report";
import Floor from "container/Floor";
import Dashboard2 from "container/EmpDashboard";
import PorterAdd from "container/PorterAddEdit";
import EmployeeAdd from "container/EmployeeAddEdit";
import Result from "components/PDFpage";
import PorterJob from "container/PorterJob";
import RequestType from "container/RequestType";

const type = localStorage.auth && JSON.parse(localStorage.auth).role;
const routes = [
  {
    path: "/login",
    exact: true,
    AuthRoute: false,
    component: Login,
  },
  {
    path: "/",
    exact: true,
    AuthRoute: true,
    component:
      type && type === "ADMIN"
        ? DashBoard
        : type && type === "EMPLOYEE"
        ? Dashboard2
        : PorterJob,
  },
  {
    path: "/dashboard",
    exact: true,
    AuthRoute: true,
    component: type && type === "ADMIN" ? DashBoard : Dashboard2,
  },
  {
    path: "/profile",
    exact: true,
    AuthRoute: true,
    component: Profile,
  },
  {
    path: "/floor-location-master",
    exact: true,
    AuthRoute: true,
    component: Floor,
  },
  {
    path: "/request",
    exact: true,
    AuthRoute: true,
    component: Request,
  },
  {
    path: "/edit-request/:id",
    exact: true,
    AuthRoute: true,
    component: Request,
  },
  {
    path: "/porter-master",
    exact: true,
    AuthRoute: true,
    component: Porter,
  },
  {
    path: "/add-porter",
    exact: true,
    AuthRoute: true,
    component: PorterAdd,
  },
  {
    path: "/edit-porter/:id",
    exact: true,
    AuthRoute: true,
    component: PorterAdd,
  },
  {
    path: "/employee-master",
    exact: true,
    AuthRoute: true,
    component: Employee,
  },
  {
    path: "/add-employee",
    exact: true,
    AuthRoute: true,
    component: EmployeeAdd,
  },
  {
    path: "/edit-employee/:id",
    exact: true,
    AuthRoute: true,
    component: EmployeeAdd,
  },
  {
    path: "/reports",
    exact: true,
    AuthRoute: true,
    component: Report,
  },
  {
    path: "/result",
    exact: true,
    AuthRoute: true,
    component: Result,
  },
  {
    path: "/current-job",
    exact: true,
    AuthRoute: true,
    component: PorterJob,
  },
  {
    path: "/job-rejected",
    exact: true,
    AuthRoute: true,
    component: PorterJob,
  },
  {
    path: "/job-accepted",
    exact: true,
    AuthRoute: true,
    component: PorterJob,
  },
  {
    path: "/job-finished",
    exact: true,
    AuthRoute: true,
    component: PorterJob,
  },
  {
    path: "/request-type-master",
    exact: true,
    AuthRoute: true,
    component: RequestType,
  },
];
const PrivateRoute = ({ component: Component, ...rest }) => {
  if (getAuthUserID()) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/login" />;
  }
};
const RestrictedRoute = ({ component: Component, publicAccess, ...rest }) => {
  if (getAuthUserID()) {
    return (
      <Route
        {...rest}
        render={(props) =>
          publicAccess ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  } else {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
};
class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {routes.map((route, index) => {
            return !route.AuthRoute ? (
              <RestrictedRoute {...route} key={index} />
            ) : (
              <PrivateRoute {...route} key={index} />
            );
          })}
          <Route render={(props) => <h1>404 Page</h1>} />
        </Switch>
      </Suspense>
    );
  }
}
export default Routes;
