import React from "react";
import PropTypes from "prop-types";
import Error from "next/error";
import StyledButton from "./styles/StyledButton";
import styled from "styled-components";

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 1000px;

  @media screen and (max-width: ${props => props.theme.tablet}) {
    flex-direction: column;
    align-content: center;
    height: 300px;
  }
`;
const ConfirmPage = props => {
  const { message, error } = props.confirmation;
  return (
    <div>
      {error ? (
        <div>
          <h1>Uh Oh! {message}</h1>
          <div>
            <p>
              <StyledButton href="/trouble">Trouble Logging In</StyledButton>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h1>Hip Hip Hooray! {message}</h1>
          <div>
            Thank you for joining! You can start using Brewcipes as soon as you login!
            <LinkContainer>
              <StyledButton href="/login">
                Sign In
              </StyledButton>
            </LinkContainer>
          </div>
        </div>
      )}
    </div>
  );
};

ConfirmPage.propTypes = {};

export default ConfirmPage;
