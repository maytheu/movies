import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

import "./sign.css";
import Formfield from "../../utils/Formfield";
import { checkValidityInput } from "../../utils/misc";
import { ADMIN_SERVER } from "../../utils/url";

class ConfirmPasssword extends Component {
  state = {
    form: {
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touch: false
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touch: false
      }
    },
    isFormValid: false,
    isLoading: false,
    isFormError: false,
    isSuccess: false,
    resetToken: ""
  };

  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({ resetToken });
  }

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
    if (validForm) {
      axios
        .post(`${ADMIN_SERVER}reset_password`, {
          ...submitData,
          resetToken: this.state.resetToken
        })
        .then(response => {
          if (!response.data.success) {
            this.setState({
              isFormError: response.payload.message,
              isLoading: false
            });
          } else {
            this.setState({ isLoading: false, isSuccess: true });
          }
        });
    } else {
      this.setState({ isLoading: false, isFormError: true, isSuccess: false });
    }
  };

  render() {
    const formElementArray = [];
    for (let formKey in this.state.form) {
      formElementArray.push({
        id: formKey,
        config: this.state.form[formKey]
      });
    }

    let form = formElementArray.map(formElement => (
      <Formfield
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touch}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return (
      <div className="auth">
        <form onSubmit={e => this.submitHandler(e)}>
          {form}
          {this.state.isLoading ? (
            <CircularProgress thickness={7} style={{ color: "98c5e9" }} />
          ) : (
            <Button
              disabled={!this.state.isFormValid}
              onClick={e => this.submitHandler(e)}
            >
              Confirm Passsword
            </Button>
          )}
        </form>
        {this.state.isSuccess ? (
          <div className="form_success">
            <Button onClick={() => this.props.history.push("/signin")}>
              sign in
            </Button>
          </div>
        ) : this.state.isFormError ||
          this.state.isFormError === "Sorry, bad token, generate a new one." ? (
          <div className="error">
            <i className="material-icons">cancel</i>Password do not match
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ConfirmPasssword;
