import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import SameUser from "./SameUser";
import ProfileMenu from "./ProfileMenu";
import StyledButton from "./styles/StyledButton";
import Button from "./styles/Button";
import Recipes from "./Recipes";
import Hops from "./Hops";
import Fermentables from "./Fermentables";
import Yeasts from "./Yeasts";
import CreateHop from "../components/ingredientforms/CreateHop";
import CreateFermentable from "../components/ingredientforms/CreateFermentable";
import CreateYeast from "../components/ingredientforms/CreateYeast";
import PropTypes from "prop-types";

export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "sidebar content";

  @media screen and (max-width: ${props => props.theme.tablet}) {
    grid-template-rows: min-content 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "sidebar" "content";
  }
`;

export const SidebarContainer = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  padding: 15px;
  position: fixed;

  @media screen and (max-width: ${props => props.theme.tablet}) {
    flex-direction: row;
    justify-content: flex-start;
    position: relative;
    align-items: center;
  }
`;

export const ContentContainer = styled.div`
  grid-area: content;
  padding: 15px;
  font-weight: 400;
  label {
    font-weight: 600;
  }
  button {
    margin: 15px 0px;
  }
`;

export const ProfilePic = styled.div`
  height: 250px;
  width: 250px;
  background: ${props => props.theme.statColor};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rem;
  color: white;

  img {
    height: 250px;
    width: 250px;
    overflow: hidden;
  }

  @media screen and (max-width: ${props => props.theme.tablet}) {
    height: 125px;
    width: 125px;
    font-size: 10rem;
    img {
      height: 125px;
      width: 125px;
    }
  }
`;

const ProfileDetails = styled.div`
  margin-top: -20px;
  width: 300px;
  padding: 10px;
  @media screen and (max-width: ${props => props.theme.tablet}) {
    margin-left: 10px;
    width: 70%;
    padding: 0px;
  }
`;

const ProfilePage = props => {
  let {
    id,
    profile_pic_link,
    username,
    description,
    email
  } = props.user_profile;

  const router = useRouter();
  let { page } = router.query;

  page = ["recipes", "hops", "fermentables", "yeasts", "brewhistory"].includes(
    page
  )
    ? page
    : null;

  let [selection, setSelection] = useState(page || "recipes");

  let [show, setShow] = useState(false);

  return (
    <ProfileContainer>
      <SidebarContainer>
        <ProfilePic>
          {profile_pic_link ? (
            <div
              style={{
                background: `url(${profile_pic_link})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                margin: "0 auto",
                width: "100%",
                height: "100%",
                borderRadius: "15px"
              }}
            />
          ) : (
            username && <div>{username.charAt(0).toUpperCase()}</div>
          )}
        </ProfilePic>
        <ProfileDetails>
          <h1>{username}</h1>
          <SameUser userID={id}>
            <p>{email}</p>
            <StyledButton href="/settings">Edit Profile</StyledButton>
            
          </SameUser>
          <p>{description}</p>
        </ProfileDetails>
      </SidebarContainer>
      <ContentContainer>
        <ProfileMenu selected={selection} handleClick={setSelection} />
        {selection === "recipes" && (
          <React.Fragment>
            <SameUser userID={id}>
              <StyledButton href="/recipes/create"> Create Recipe</StyledButton>
            </SameUser>
            <Recipes recipes={props.recipes} />
          </React.Fragment>
        )}
        {selection === "hops" && (
          <React.Fragment>
            <SameUser userID={id}>
              <Button onClick={() => setShow(true)}> Create Hop</Button>
              <CreateHop show={show} setShow={setShow} />
            </SameUser>
            <Hops hops={props.hops} />
          </React.Fragment>
        )}
        {selection === "fermentables" && (
          <React.Fragment>
            <SameUser userID={id}>
              <Button onClick={() => setShow(true)}> Create Fermentable</Button>
              <CreateFermentable show={show} setShow={setShow} />
            </SameUser>
            <Fermentables fermentables={props.fermentables} />
          </React.Fragment>
        )}
        {selection === "yeasts" && (
          <React.Fragment>
            <SameUser userID={id}>
              <Button onClick={() => setShow(true)}> Create Yeast</Button>
              <CreateYeast show={show} setShow={setShow} />
            </SameUser>
            <Yeasts yeasts={props.yeasts} />
          </React.Fragment>
        )}
      </ContentContainer>
    </ProfileContainer>
  );
};

ProfilePage.propTypes = {};

export default ProfilePage;
