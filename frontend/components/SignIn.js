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
  height: 80px;
  width: 100%;
  margin-top: 15px;
  justify-content: space-between;
`;

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      email: "",
      password: "",
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
      .post("/login", JSON.stringify(model))
      .then(res => {
        Router.back();
      })
      .catch(err => NotificationManager.error(err.response.data.message));

    return req;
  }

  render() {
    return (
      <LoginContainer>
        <h1>Sign In</h1>
        <h3>Welcome Back</h3>

        <FormStyle>
          <Formsy
            style={{ background: "#FFF" }}
            method="post"
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
          >
            <fieldset>
              <Label htmlFor="email">
                Email
                <MyInput
                  type="email"
                  name="email"
                  placeholder="Enter your email."
                  validations={{
                    isEmail: true
                  }}
                  validationError="Please enter a valid email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </Label>
              <Label htmlFor="password">
                Password
                <MyInput
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                  required
                  formNoValidate
                />
              </Label>
              <div style={{ marginTop: "15px" }}>
                <Button type="submit" background="#FEDD00" color="#FFF" disabled={!this.state.canSubmit}>
                  Sign In
                </Button>
              </div>
              <ForgotContainer>
                <Link href="/trouble">Having trouble logging in?</Link>
                <Link href="/signup">Dont' have an account? Sign Up</Link>
              </ForgotContainer>
            </fieldset>
          </Formsy>
        </FormStyle>
      </LoginContainer>
    );
  }
}

export default SignIn;
