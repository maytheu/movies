import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

import "./sign.css";
import Formfield from "../../utils/Formfield";
import { checkValidityInput } from "../../utils/misc";
import { loginAdmin } from "../../../actions/adminActions";

class Signin extends Component {
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
      },
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
      }
    },
    isFormValid: false,
    isLoading: false,
    isFormError: false
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
    if (validForm) {
      this.props.dispatch(loginAdmin(submitData)).then(response => {
          if (response.payload.loginSuccess) {
            this.setState({isLoading: false})
            this.props.history.push("/admin/now_showing");
          } else {
            this.setState({
              isFormError: true,
              isLoading: false
            });
          }
      });
    } else {
      this.setState({ isLoading: false, isFormError: true });
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
              Signin
            </Button>
          )}
        </form>
        {this.state.isFormError ? (
          <Button onClick={() => this.props.history.push("/verify_email")}>
            Verify Email
          </Button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect()(Signin);
