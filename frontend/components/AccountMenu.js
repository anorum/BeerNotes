import React, { useState, useContext } from "react";
import styled from 'styled-components'
import Link from 'next/link'
import { UserContext } from "./UserProvider"
import StyledButton from "./styles/StyledButton"

const ProfileContainer = styled.div``



const AccountMenu = (props) => {
    const [showDropdown, setDropdown] = useState(false);

    const userContext = useContext(UserContext);

    const user = userContext.user

    return (
        <ProfileContainer>
        {user && (
            <Link href="/account">
              <a alt="Account">Account</a>
            </Link>
          ) || (
            <React.Fragment>
              <StyledButton href="/register" alt="sign up">Sign Up</StyledButton>
              <StyledButton href="/login" alt="login" clear>Login</StyledButton>
              </React.Fragment>
          )}
          </ProfileContainer>
    )


}
export default AccountMenu