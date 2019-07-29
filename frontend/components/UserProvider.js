import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'


export const UserContext = React.createContext();

class UserProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loading: true
        }
    }

    componentWillMount() {
        this.checkLogin()
    }

    requestUser = async () => {
        const user = await axios
            .get('/user')
            .then(res => (res.data))
            .catch(err => (err.response.data)
            )
        return user
    }

    refreshLogin = async () => {
        const refresh = await axios
            .post('/refresh', {} , {headers: {'X-CSRF-TOKEN': Cookies.get('csrf_refresh_token')}})
            .then(res => res.data)
            .catch(err => err.response.data)
            return refresh
    }   
    
    checkLogin = async () => {
        let user = null
        if (Cookies.get('csrf_access_token') || Cookies.get('csrf_refresh_token')) {
            user = await this.requestUser()
            if (user.msg) {
                if (user.msg === "Token has expired") {
                    await this.refreshLogin()
                }
            }
        }

        
        this.setState({
            user,
            loading: false
        })
    }


    render() {
        {if(this.state.loading) {
            return (<div>Loading...</div>)
        }
    }
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;
