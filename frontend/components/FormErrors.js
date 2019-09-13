import React from "react";
import PropTypes from "prop-types";

const FormErrors = props => {
  return Object.keys(props.error).map(field => {
    return (
      <div>
        {typeof props.error[field] !== "string" ? (
          <React.Fragment>
            <p>
              <b>{field}</b> : <FormErrors error={props.error[field]} />
            </p>
          </React.Fragment>
        ) : (
          <span style={{marginLeft: "10px"}}>{`${props.error[field]}`}</span>
        )}
      </div>
    );
  });
};

FormErrors.propTypes = {};

export default FormErrors;
