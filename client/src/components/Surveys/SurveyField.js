//contains logic to render a single text and label

import React from "react";

export default ({ input, label, meta: { touched, error } }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text"> {touched && error} </div>
    </div>
  );
};
