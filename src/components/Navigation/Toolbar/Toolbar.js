import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import classes from "./Toolbar.module.css";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </header>
  );
};

export default toolbar;
