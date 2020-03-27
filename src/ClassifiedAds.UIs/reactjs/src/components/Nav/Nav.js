import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Nav.module.css";

const Nav = props => {
  const pageTitle = "ClassifiedAds.React";
  return (
    <nav
      className={"navbar navbar-expand navbar-light bg-light " + classes.Nav}
    >
      <a className="navbar-brand" href="/">
        {pageTitle + " " + React.version}
      </a>
      <ul className="nav nav-pills">
        <li>
          <NavLink className="nav-link" to="/home">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink className="nav-link" to="/products">
            Product
          </NavLink>
        </li>

        {!props.isAuthenticated ? (
          <li>
            <NavLink
              className="nav-link"
              to="/login"
              click="login()"
              href="javascript:void(0)"
            >
              Login
            </NavLink>
          </li>
        ) : null}

        {props.isAuthenticated ? (
          <li>
            <NavLink
              className="nav-link"
              to="/logout"
              click="logout()"
              href="javascript:void(0)"
            >
              Logout
            </NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Nav;
