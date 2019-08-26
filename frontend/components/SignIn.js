import React, { Component } from "react";
import Router from "next/router";
import axios from "axios";
import { NotificationManager } from "react-notifications";

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
      <fieldset>
        <form
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            const res = await this.signIn();
            this.setState({ email: "", password: "" });
          }}
        >
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.saveToState}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.saveToState}
            />
          </label>
          <button type="submit">Sign In!</button>
        </form>
      </fieldset>
    );
  }
}

export default SignIn;
