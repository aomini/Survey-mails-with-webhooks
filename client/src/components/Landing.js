import React from "react";
import { Redirect } from "react-router-dom";

const Landing = props => {
  return (
    <div style={{ textAlign: "center" }}>
      {props.auth && <Redirect to="/surveys" />}
      <h1>Emaily</h1>
      Collect feedback from users
    </div>
  );
};

export default Landing;
