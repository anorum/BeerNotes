import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const EmailContainer = styled.div`
  margin: 0 auto;
  border: 0.5px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  padding: 25px;
  max-width: 650px;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 4px;
  min-width: 85px;
  text-align: center;
  height: 40px;
  background: ${props => props.background || "#3ecf8e"};
  text-shadow: 0 1px 3px rgba(36, 180, 126, 0.4);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  display: inline-block;
  line-height: 40px;
  text-transform: uppercase;
  color: ${props => props.color || "#FFF"};
  transition: all 0.15s ease;
  font-size: 1.5rem;

  :hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
  :focus {
    outline: 0;
  }
`;

const font = <link href="https://fonts.googleapis.com/css?family=Racing+Sans+One&display=swap" rel="stylesheet" />

const email = props => {
  return (
    <EmailContainer>
      <h1>Brewcipes</h1>
      Welcome to Brewcipes.com! to get start please click the link below to
      verify your email address and activate your account!
      <div>
        <br />
        <Button>Click Here To Verify Email</Button>
      </div>
    </EmailContainer>
  );
};

email.propTypes = {};

export default email;
