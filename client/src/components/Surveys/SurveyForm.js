import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import formFields from "./formFields";
import { deepFreeze } from "../../helpers/Array";

import validateEmails from "../../utils/validateEmails";

const FIELDS = deepFreeze(formFields);

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(({ label, name }) => (
      <Field
        component={SurveyField}
        type="text"
        name={name}
        label={label}
        key={name}
      />
    ));
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
      >
        {this.renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    );
  }
}

const validate = fields => values => {
  let errors = {};
  errors.recipents = values.recipents && validateEmails(values.recipents);

  _.each(fields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  validate: validate(FIELDS),
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
