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
  height: 60px;
  width: 100%;
  margin-top: 15px;
  justify-content: flex-end;
`;

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    isLoading: false
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  register = async (e) => {
    e.preventDefault();
    const req = await axios
      .post("/register", JSON.stringify(this.state))
      .then(res => {
        NotificationManager.success(`A confirmation email has been sent to ${this.state.email}`, "Success")
        Router.replace("/")
      })
      .catch(err => NotificationManager.error(err.response.data.message));

    return req;
  };

  render() {
    return (
      <LoginContainer>
        <h1>Create A New Account</h1>
        <p>
          Join Brewcipes to start creating, brewing, and sharing great beer
          recipes!
        </p>
        <Form
          style={{ background: "#FFF" }}
          method="post"
          onSubmit={this.register}
        >
          <fieldset>
          <Label htmlFor="username">
              Username
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.saveToState}
                required
              />
            </Label>
            <Label htmlFor="email">
              Email
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.saveToState}
                required
              />
            </Label>
            <Label htmlFor="password">
              Password
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.saveToState}
                required
              />
            </Label>
            <Label htmlFor="password2">
              Confirm Password
              <Input
                type="password"
                name="password2"
                placeholder="Retype Your Password"
                value={this.state.password2}
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
              <Link href="/login">Already have an account? Sign In</Link>
            </ForgotContainer>
          </fieldset>
        </Form>
      </LoginContainer>
    );
  }
}

export default SignUp;
