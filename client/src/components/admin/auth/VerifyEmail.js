import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

import "./sign.css";
import Formfield from "../../utils/Formfield";
import { checkValidityInput } from "../../utils/misc";
import { resetAdmin } from "../../../actions/adminActions";

class VerifyEmail extends Component {
  state = {
    form: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touch: false
      }
    },
    isFormValid: false,
    isLoading: false,
    isFormError: false,
    isSuccess: false
  };

  inputChangedHandler = (event, formName) => {
    const updatedForm = {
      ...this.state.form,
      [formName]: {
        ...this.state.form[formName],
        value: event.target.value,
        valid: checkValidityInput(
          event.target.value,
          this.state.form[formName].validation
        ),
        touch: true
      }
    };
    let validForm = true;
    for (let inputKey in this.state.form) {
      validForm = updatedForm[inputKey].valid && validForm;
    }
    this.setState({ form: updatedForm, isFormValid: validForm });
  };

  submitHandler = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    let submitData = {};
    let validForm = true;
    for (let key in this.state.form) {
      submitData[key] = this.state.form[key].value;
      validForm = this.state.form[key].valid && validForm;
    }
    if (this.state.isFormValid) {
      this.props.dispatch(resetAdmin(submitData)).then(response => {
        if (response.payload.resetSuccess) {
          this.setState({ isLoading: false, isSuccess: true });
        } else {
          this.setState({
            isLoading: false,
            isFormError: response.payload.message
          });
        }
      });
    } else {
      this.setState({ isLoading: false, isFormError: true });
    }
  };

  render() {
    const email = this.state.form.email;
    return (
      <div className="auth">
        <form onSubmit={e => this.submitHandler(e)}>
          <Formfield
            elementType={email.elementType}
            elementConfig={email.elementConfig}
            value={email.value}
            invalid={!email.valid}
            shouldValidate={email.validation}
            touched={email.touch}
            changed={event => this.inputChangedHandler(event, "email")}
          />
          {this.state.isLoading ? (
            <CircularProgress thickness={7} style={{ color: "98c5e9" }} />
          ) : this.state.isSuccess ? (
            <div className="form_success">
              <i className="material-icons">check</i>Check your Email For
              Verification
            </div>
          ) : this.state.isFormError === "Email not found" ||
            this.state.isFormError ? (
            <div className="error">
              <i className="material-icons">cancel</i>Email not found
            </div>
          ) : (
            <Button
              disabled={!this.state.isFormValid}
              onClick={e => this.submitHandler(e)}
            >
              Check Email
            </Button>
          )}
        </form>
      </div>
    );
  }
}

export default connect()(VerifyEmail);
