import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import SectionContainer from "./styles/SectionContainer";
import FormStyles from "./styles/FormStyle";
import Button from "./styles/Button";
import Formsy from "formsy-react";
import MyInput from "./MyInput";

const LoginContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
`;

const FormStyle = styled(FormStyles)`
  input {
    height: 70px;
    font-size: 1.8rem;
  }
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
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      isLoading: false,
      canSubmit: false
    };
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit(model) {
    const req = axios
      .post("/register", JSON.stringify(model))
      .then(res => {
        this.setState({ isLoading: false });
        NotificationManager.success(
          `A confirmation email has been sent to ${this.state.email}`,
          "Success"
        );
        Router.replace("/");
      })
      .catch(err => {
        NotificationManager.error(err.response.data.message);
      });

    return req;
  }

  handleValidations() {}

  render() {
    return (
      <LoginContainer>
        <h1>Create A New Account</h1>
        <p>
          Join Brewcipes to start creating, brewing, and sharing great beer
          recipes!
        </p>
        <FormStyle >
          <Formsy
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            style={{ background: "#FFF" }}
            method="post"
          >
            <fieldset aria-busy={this.state.isLoading}>
              <Label htmlFor="email">
                Email
                <MyInput
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  validations={{
                    isEmail: true
                  }}
                  validationError="This is not a valid email"
                  onChange={this.saveToState}
                  value={this.state.email}
                  required
                />
              </Label>
              <Label htmlFor="password">
                Password
                <MyInput
                  name="password"
                  type="password"
                  placeholder="Set Your Password"
                  validations={{
                    matchRegexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                  }}
                  validationError="Your password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character."
                  onChange={this.saveToState}
                  value={this.state.password}
                  required
                />
              </Label>
              <Label htmlFor="password2">
                Confirm Password
                <MyInput
                  name="confirmpassword"
                  type="password"
                  placeholder="Retype Your Password"
                  validations="equalsField:password"
                  validationError="Passwords do not match."
                  onChange={this.saveToState}
                  value={this.state.confirmpassword}
                  required
                />
              </Label>
              <div style={{ marginTop: "15px" }}>
                <Button
                  type="submit"
                  background="#FEDD00"
                  color="#FFF"
                  disabled={!this.state.canSubmit}
                >
                  Create Your Account
                </Button>
              </div>
              <ForgotContainer>
                <Link href="/login">Already have an account? Sign In</Link>
              </ForgotContainer>
            </fieldset>
          </Formsy>
        </FormStyle>
      </LoginContainer>
    );
  }
}

export default SignUp;
