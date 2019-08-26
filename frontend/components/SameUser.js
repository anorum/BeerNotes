import React from "react";
import PropTypes from "prop-types";

const SameUser = props => {
  return (
    <React.Fragment>
      {props.currentUser && props.userID && props.currentUser.id === props.userID && props.children}
    </React.Fragment>
  );
};

SameUser.propTypes = {};

export default SameUser;
