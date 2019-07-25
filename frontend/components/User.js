import React, { Component } from 'react';
import { UserConsumer } from "./UserProvider"

class User extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <UserConsumer>
                {
                    (context) => {
                        return (
                            this.props.children(context)
                        )
                        
                    }
                }
            </UserConsumer>
        );
    }
}

export default User;