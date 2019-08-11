import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendSurvey } from "../../actions";

import formFields from "./formFields";
import { deepFreeze } from "../../helpers/Array";

class SurveyReview extends Component {
  renderContent() {
    const FIELDS = deepFreeze(formFields);
    return FIELDS.map(({ label, name }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{this.props.form[name]}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h4>Please confirm your entries</h4>
        <div>{this.renderContent()}</div>
        <button
          className="yellow white-text darken-3 btn-flat"
          onClick={() => this.props.onBackReview()}
        >
          Back
        </button>
        <button
          className="right green btn-flat white-text"
          onClick={() =>
            this.props.sendSurvey(this.props.form, this.props.history)
          }
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ form }) => {
  return { form: form.surveyForm.values };
};

const mapDispatchToProps = action => {
  return { action };
};

export default connect(
  mapStateToProps,
  { sendSurvey }
)(withRouter(SurveyReview));
