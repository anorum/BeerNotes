import React, { Component } from 'react';
import { apiEndpoint } from '../config'


class SignIn extends Component {
    state= {
        email: '',
        password: '',
        isLoading: false
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    signIn = async () => {
        const signingIn = await fetch(`${apiEndpoint}/login`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(this.state)
        })
        const content = await signingIn.json();
        return content
    }

    render() {
        return (
            <fieldset>

                <form method="post" onSubmit={async e => {
                    e.preventDefault();
                    const res = await this.signIn();
                    console.log(res);
                    this.setState({email: '', password: ''})
                }}>
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