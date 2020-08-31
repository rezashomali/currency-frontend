import React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar className="">
          <Typography className="header__logo" variant="h2" color="inherit">
            Klarx
          </Typography>
          <Typography variant="h6"> Currency Converter</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
