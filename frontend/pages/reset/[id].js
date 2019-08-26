import React from 'react';
import axios from "axios"
import StyledButton from "../../components/styles/StyledButton"
import ResetPassword from "../../components/ResetPassword"

const ResetPage = props => {
    return (
        <div>
            <h1> Reset Your Password </h1>
            <h4>{props.reset_message}</h4>
            {props.is_valid ? (
                <ResetPassword reset_token={props.reset_token} />
            ) : (
                <div>
                Need a new reset link? <StyledButton href='/trouble'>Reset Password</StyledButton>
                </div>
            )}
        </div>
    );
};

ResetPage.getInitialProps = async ({ req, query: { id } }) => {
    let is_valid = false
    let reset_token = id
    const reset_message = await axios
    .get(`/reset/${id}`)
    .then(res => {
        is_valid = true
        return res.data.message})
    .catch(err => err.response.data.message);

    return { reset_message, is_valid, reset_token }
}


export default ResetPage;