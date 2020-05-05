import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tabs,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  IconButton,
  withStyles,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";

import NavTabs from "./NavTabs";

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: "center",
    marginBottom: "5rem",
    backgroundColor: "#0E141D",
  },
  title: {
    fontSize: "4rem",
    color: "#00CCD3",
    textAlign: "center",
    fontWeight: "550",
  },
  email: {
    fontSize: "1rem",
    color: "#00CCD3",
    textAlign: "center",
    fontWeight: "450",
  },
}));

const Profile = ({ user }) => {
  const classes = useStyles();

  if (user === null) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container-fluid lg-p-top" style={{ textAlign: "center" }}>
      <div className={classes.main}>
        <Typography className={classes.title}>My Account</Typography>
        <Typography className={classes.email}>{user.email}</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "3rem 0rem 3rem 0rem",
          }}
        >
          <NavTabs />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Profile);
