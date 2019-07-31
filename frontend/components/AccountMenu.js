import React, { useState, useContext } from "react";
import styled from "styled-components";
import UserContext from "./UserContext";
import StyledButton from "./styles/StyledButton";
import SearchMenu from "./SearchMenu";


const ProfileContainer = styled.div`
  display: flex;
  flex: auto;
  justify-content: flex-end;
  margin: 0 3rem !important;
`;

const AccountMenu = props => {
  const [showDropdown, setDropdown] = useState(false);

  const userContext = useContext(UserContext);

  const user = userContext.user;

  return (
    <ProfileContainer>
    <SearchMenu />
      {(user && (
        <React.Fragment>
        <StyledButton href="/account">
          Account
        </StyledButton>
        </React.Fragment>
      )) || (
        <React.Fragment>
          <StyledButton href="/register" alt="sign up">
            Sign Up
          </StyledButton>
          <StyledButton href="/login" alt="login" clear>
            Login
          </StyledButton>
        </React.Fragment>
      )}
    </ProfileContainer>
  );
};
export default AccountMenu;
