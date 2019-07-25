import React, { Component } from 'react';
import {apiEndpoint} from "../config"


export const UserContext = React.createContext();

class UserProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            expired: false,
            fresh: false
        }
    }

    componentDidMount() {
        this.checkLogin()
    }
    
    checkLogin = async () => {
        const user = await fetch(`${apiEndpoint}/user`, {method: 'GET', 'Content-Type': 'application/json', credentials: 'include'})
        if (user.status != 200) {
            this.setState({
                user: null
            })
            return
        }
        let userData = await user.text()
        console.log(userData)
        this.setState({
            user: userData
        })
    }


    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;
