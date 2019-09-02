import React, {useContext} from "react";
import PropTypes from "prop-types";
import UserContext from "./UserContext"

const SameUser = props => {
  const userContext = useContext(UserContext)
  const currentUser = userContext.user
  return (
    <React.Fragment>
      {props.userID && currentUser.id === props.userID && props.children}
    </React.Fragment>
  );
};

SameUser.propTypes = {};

export default SameUser;
