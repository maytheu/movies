import React from "react";

import './utils.css'

const Formfield = props => {
  let inputElement = null;
  const validateInputClass = ["inputElement"];
    if (props.invalid && props.shouldValidate && props.touched) {
      validateInputClass.push("invalid");
    }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <div className="row">
          <div className="input-field col s12">
            <input
              className={`${validateInputClass.join(" ")} validate`}
              {...props.elementConfig}
              value={props.value}
              onChange={props.changed}
            />
          </div>
        </div>
      );
      break;
    default:
      inputElement = (
        <div className="row">
          <div className="input-field col s12">
            <input
              className="validate"
              {...props.elementConfig}
              value={props.value}
              onChange={props.changed}
            />
          </div>
        </div>
      );
  }
  return (
    <div className="row input">
      <label className="label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Formfield;
