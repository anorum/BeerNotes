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

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signIn = async () => {
    const req = await axios
      .post("/login", JSON.stringify(this.state))
      .then(res => {
        Router.back();
      })
      .catch(err => NotificationManager.error(err.response.data.message));

    return req;
  };

  render() {
    return (
      <LoginContainer>
        <h1>Sign In</h1>
        <h3>Welcome Back</h3>
        <Form
          style={{ background: "#FFF" }}
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            const res = await this.signIn();
            this.setState({ email: "", password: "" });
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
            <Label htmlFor="password">
              Password
              <Input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.saveToState}
                required
              />
            </Label>
            <div style={{ marginTop: "15px" }}>
              <Button type="submit" background="#FEDD00" color="#FFF">
                Sign In
              </Button>
            </div>
            <ForgotContainer>
              <Link href="/trouble">Having trouble logging in?</Link>
              <Link href="/signup">Dont' have an account? Sign Up</Link>
            </ForgotContainer>
          </fieldset>
        </Form>
      </LoginContainer>
    );
  }
}

export default SignIn;
