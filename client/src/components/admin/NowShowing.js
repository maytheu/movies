import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

import "./auth/sign.css";
import AdminLayout from "../hoc/AdminLayout";
import { checkValidityInput } from "../utils/misc";
import Formfield from "../utils/Formfield";
import { adminUploadNow } from "../../actions/movieActions";

class NowShowing extends Component {
  state = {
    movieInfo: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Movie Title"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
      videoLink: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Embedded Url of the Video"
        },
        value: "",
        validation: {
          required: true
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
      ...this.state.movieInfo,
      [formName]: {
        ...this.state.movieInfo[formName],
        value: event.target.value,
        valid: checkValidityInput(
          event.target.value,
          this.state.movieInfo[formName].validation
        ),
        touch: true
      }
    };
    let validForm = true;
    for (let inputKey in this.state.movieInfo) {
      validForm = updatedForm[inputKey].valid && validForm;
    }
    this.setState({ movieInfo: updatedForm, isFormValid: validForm });
  };

  submitHandler = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    let submitData = {};
    for (let key in this.state.movieInfo) {
      submitData[key] = this.state.movieInfo[key].value;
    }
    if (this.state.isFormValid) {
      this.props.dispatch(adminUploadNow(submitData)).then(response => {
        console.log(response.payload.success)
        if (response.payload.success) {
          this.setState({ isLoading: false, isSuccess: true });
        } else {
          this.setState({ isLoading: false, isFormError: true });
        }
      });
    } else {
      this.setState({ isLoading: false, isFormError: true });
    }
  };
 
  render() {
    const formElementArray = [];
    for (let formKey in this.state.movieInfo) {
      formElementArray.push({
        id: formKey,
        config: this.state.movieInfo[formKey]
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
      <AdminLayout>
        <div className="auth">
          <form onSubmit={e => this.submitHandler(e)}>
            {form}
            {this.state.isLoading ? (
              <CircularProgress thickness={7} style={{ color: "98c5e9" }} />
            ) : this.state.isSuccess ? (
              <div className="form_success">
                <i className="material-icons">check</i>Uploadedd Successfully
              </div>
            ) : (
              <Button
                disabled={!this.state.isFormValid}
                onClick={e => this.submitHandler(e)}
              >
                Upload New Trailer
              </Button>
            )}
          </form>
          {this.state.isFormError ? (
            <div className="error">
              <i className="material-icons">cancel</i>Error Updating Trailer
            </div>
          ) : (
            ""
          )}
        </div>
      </AdminLayout>
    );
  }
}

export default connect()(NowShowing);
