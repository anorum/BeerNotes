import React from 'react';
import axios from "axios"

const Confirm = props => {
    return (
        <div>
            {props.confirmation}
        </div>
    );
};

Confirm.getInitialProps = async ({ req, query: { id } }) => {
    const confirmation = await axios
    .get(`/confirm/${id}`)
    .then(res => res.data.message)
    .catch(err => err.response.data.message);

    return { confirmation }
}


export default Confirm;