import React, { useContext } from 'react';
import { UserContext } from './UserProvider'

const User = (props) => {
    const userContext = useContext(UserContext)

    const user = userContext.user

    return (
        <React.Fragment>
            {!user && props.children}
        </React.Fragment>
    )
}

export default User