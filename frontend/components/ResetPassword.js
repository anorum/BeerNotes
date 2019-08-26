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

class ResetPassword extends Component {
  state = {
    password: "",
    password2: "",
    isLoading: false
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetPassword = async reset_token => {
    const req = await axios
      .post(`/reset/${reset_token}`, JSON.stringify(this.state))
      .then(res => {
        NotificationManager.success(
          `Your password has been reset!`,
          "Password Reset"
        );
        Router.replace("/login");
      })
      .catch(err => NotificationManager.error(err.response.data.message));

    return req;
  };

  render() {
    return (
      <LoginContainer>
        <h1>Reset Your Password</h1>
        <Form
          style={{ background: "#FFF" }}
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            const res = await this.resetPassword(this.props.reset_token);
          }}
        >
          <fieldset>
            <Label htmlFor="email">
              New Password
              <Input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
            </Label>
            <Label htmlFor="email">
              Confirm New Password
              <Input
                type="password"
                name="password2"
                placeholder="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
            </Label>
            <div style={{ marginTop: "15px" }}>
              <Button type="submit" background="#FEDD00" color="#FFF">
                Reset Password
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

export default ResetPassword;
