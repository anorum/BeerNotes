import React, { useState, useContext } from "react";
import styled from "styled-components";
import User from "./User";
import NotUser from "./NotUser";
import StyledButton from "./styles/StyledButton";
import AccountDropdown from "./AccountDropdown"

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 3rem !important;
  grid-area: account;
`;

const MenuContainer = styled.div`
display: flex;
justify-content: space-between;
`

const AccountMenu = props => {
  const [showDropdown, setDropdown] = useState(false);

  return (
    <ProfileContainer>
    <MenuContainer>     
      <User>
        <AccountDropdown />
      </User>
      <NotUser>
        <div style={{display: "flex", width: "200px", justifyContent: "space-between"}}>
        <StyledButton href="/login" alt="sign up">
          Sign In
        </StyledButton>
        <StyledButton href="/signup" alt="login" clear>
          Sign Up
        </StyledButton>
        </div>
      </NotUser>
      </MenuContainer>
    </ProfileContainer>
  );
};
export default AccountMenu;
