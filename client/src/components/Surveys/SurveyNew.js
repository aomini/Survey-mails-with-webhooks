// Survey new has the responsibility to show survey form and survey review
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";

class SurveyNew extends Component {
  state = {
    reviewPage: false
  };

  renderContent() {
    const { reviewPage } = this.state;
    if (reviewPage) {
      return (
        <SurveyReview
          onBackReview={() => this.setState({ reviewPage: !reviewPage })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ reviewPage: !reviewPage })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: "surveyForm" })(SurveyNew);
