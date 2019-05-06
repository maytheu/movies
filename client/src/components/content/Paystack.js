import React, { Component } from "react";
import PaystackButton from "react-paystack";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./content.css";
import "../admin/auth/sign.css";
import { authUser, userBuy, userEmail } from "../../actions/userActions";
import { getShows } from "../../actions/movieActions";
import Formfield from "../utils/Formfield";
import { checkValidityInput } from "../utils/misc";

class Paystack extends Component {
  state = {
    form: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Email Address"
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
    isSuccess: false,
    key: process.env.REACT_APP_PAYSTACK_PUBLIC,
    name: "",
    email: "",
    amount: 50000
  };

  componentDidMount() {
    const user = this.props.isUser.userData;
    this.props.dispatch(getShows());
    this.props.dispatch(authUser()).then(() => {
      if (user.isUserAuth) {
        this.setState({
          email: user.email,
          name: user.name
        });
      }
    });
  }
  callback = response => {
    console.log(response); // card charged successfully, get reference here
    this.props
      .dispatch(
        userBuy({ shows: this.props.isMovies.upcoming, payment: response })
      )
      .then(response => {
        console.log(response)
        if (response.payload.success) {
          setTimeout(() => {
            this.props.history.push("/");
          }, 3000);
        }
      });
  };

  close = () => {
    this.props.history.push("/");
  };

  getReference = () => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
      this.props.dispatch(userEmail(submitData)).then(response => {
        if (response.payload.success) {
          this.setState({
            isLoading: false,
            email: submitData.email
          });
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
      <div>
        {this.state.email === undefined ? (
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
        ) : (
          <div className="favourite paystack">
            <PaystackButton
              text="Make Payment"
              class="payButton"
              callback={this.callback}
              close={this.close}
              disabled={true}
              embed={true}
              reference={this.getReference()}
              email={this.state.email}
              amount={this.state.amount}
              paystackkey={this.state.key}
              tag="button"
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUser: state.user,
    isMovies: state.movie
  };
};

export default connect(mapStateToProps)(Paystack);
