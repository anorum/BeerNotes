import React from "react";
import axios from "axios";
import ConfirmPage from "../../components/ConfirmPage"

const Confirm = props => {
  return <ConfirmPage confirmation={props.confirmation} />
};

Confirm.getInitialProps = async ({ req, query: { id } }) => {
  const confirmation = await axios
    .get(`/confirm/${id}`)
    .then(res => ({ message: res.data.message, error: false }))
    .catch(err => ({
      message: err.response.data.message,
      error: true
    }));

  return { confirmation };
};

export default Confirm;
