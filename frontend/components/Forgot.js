import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import SectionContainer from "./styles/SectionContainer";
import Form from "./styles/Form";
import Button from "./styles/Button";

const LoginContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
`;

const Input = styled.input`
  height: 70px;
  font-size: 1.8rem;
`;

const Label = styled.label`
  margin-top: 15px;
`;

const ForgotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80px;
  width: 100%;
  margin-top: 15px;
  justify-content: space-between;
`;

class Forgot extends Component {
  state = {
    email: "",
    isLoading: false
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendReset = async () => {
    const req = await axios
      .post("/resetpassword", JSON.stringify(this.state))
      .then(res => {
        NotificationManager.success(
          `Email has been sent to ${
            this.state.email
          }. Please check to reset password`,
          "Reset Email Sent"
        );
        Router.replace('/');
      })
      .catch(err => NotificationManager.error(err.response.data.message));

    return req;
  };

  render() {
    return (
      <LoginContainer>
        <h1>Reset Your Password</h1>
        <p>
          No worries! Enter the email you signed up with below and we'll send
          you a reset link
        </p>
        <Form
          style={{ background: "#FFF" }}
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            const res = await this.sendReset();
          }}
        >
          <fieldset>
            <Label htmlFor="email">
              Email
              <Input
                type="email"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.saveToState}
              />
            </Label>
            <div style={{ marginTop: "15px" }}>
              <Button type="submit" background="#FEDD00" color="#FFF">
                Send Reset Email
              </Button>
            </div>
            <ForgotContainer>
              <Link href="/login">Back to login</Link>
            </ForgotContainer>
          </fieldset>
        </Form>
      </LoginContainer>
    );
  }
}

export default Forgot;
