import React, { Component } from "react";
import Formsy from "formsy-react";
import FormStyle from "./styles/FormStyle";
import Form from "./styles/Form";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import MyInput from "./MyInput";
import PropTypes from "prop-types";
import { NotificationManager } from "react-notifications";
import {
  ProfileContainer,
  SidebarContainer,
  ContentContainer,
  ProfilePic
} from "./ProfilePage";
import { HeaderSection } from "./styles/PageStyles";
import { ButtonContainer, Add } from "./CreateRecipe";
import axios from "axios";
import Button from "./styles/Button";

const Pic = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const Description = styled.div`
  input {
    height: 80px;
  }
`;

const EditProfileContainer = styled(ProfileContainer)`
  @media screen and (max-width: ${props => props.theme.tablet}) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "sidebar" "content";
  }
`;
const EditSidebarContainer = styled(SidebarContainer)`
  @media screen and (max-width: ${props => props.theme.tablet}) {
    flex-direction: column;
  }
`;

const EditButtonContainer = styled(ButtonContainer)`
  @media screen and (max-width: ${props => props.theme.tablet}) {
    flex-direction: column-reverse;
  }
`;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      profile_pic_link: "",
      isLoading: false,
      canSubmit: false
    };
  }

  componentWillMount() {
    this.setState({
      profile_pic_link: this.props.user.profile_pic_link,
      description: this.props.user.description
    });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImage = e => {
    this.setState({
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0]
    });
  };

  cancelProfileUpdate = e => {
    Router.back();
  };

  submit = async e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", this.state.image);
    formData.append("description", this.state.description);
    await axios
      .put("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        this.props.user.profile_pic_link = this.state.image
        NotificationManager.success(
          `${res.data.message}. Click to View Your Profile`,
          "Success",
          10000,
          () => {
            Router.replace(`/profile/${this.props.user.username}`);
          }
        );
      })
      .catch(err => {
        NotificationManager.error(
          err.message || "An error occurred while updating your profile",
          "Failed Update"
        );
      });
  };

  deleteProfilePic = async () => {
    if (this.state.profile_pic_link && !this.props.user.profile_pic_link) {
      this.setState({
        profile_pic_link: null,
        image: null
      });
    } else {
      axios
        .delete("user/update")
        .then(res => {
          {
            NotificationManager.success(res.data.message, "Success");
            this.setState({
              profile_pic_link: null,
              image: null
            });
          }
        })
        .catch(err => {
          NotificationManager.error(
            err.message || "An error occurred while updating your profile",
            "Failed Update"
          );
        });
    }
  };

  render() {
    const {
      id,
      profile_pic_link,
      username,
      description,
      email
    } = this.props.user;
    return (
      <FormStyle>
        <Form onSubmit={this.submit}>
          <HeaderSection>
            <h1>Edit Your Profile</h1>
            <EditButtonContainer>
              <Button
                type="button"
                style={{
                  textShadow: "none",
                  background: "#EFEEEE",
                  color: "#706F6A",
                  marginRight: "15px"
                }}
                onClick={this.cancelProfileUpdate}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </EditButtonContainer>
          </HeaderSection>

          <EditProfileContainer>
            <EditSidebarContainer style={{ position: "relative" }}>
              <ProfilePic>
                {this.state.profile_pic_link ? (
                  <Pic
                    style={{
                      backgroundImage: `url(${this.state.profile_pic_link})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat"
                    }}
                  />
                ) : (
                  username && <div>{username.charAt(0).toUpperCase()}</div>
                )}
              </ProfilePic>
              <label htmlFor="profile_pic_link" style={{ marginTop: "20px" }}>
                Update Profile Picture
              </label>
              <input
                name="profile_pic_link"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={e => this.handleImage(e)}
              />
              {this.state.profile_pic_link && (
                <Add
                  type="button"
                  onClick={this.deleteProfilePic}
                  style={{ background: "#ED5E67", margin: "25px 0px 0px 0px" }}
                >
                  Delete Profile Picture
                </Add>
              )}
            </EditSidebarContainer>
            <ContentContainer>
              <label htmlFor="name">Username</label>
              <p>{username}</p>
              <label htmlFor="email">Email</label>
              <p>{email}</p>
              <label htmlFor="description">Description</label>
              <Description>
                <input
                  type="textarea"
                  name="description"
                  onChange={this.saveToState}
                  value={this.state.description}
                />
              </Description>
            </ContentContainer>
          </EditProfileContainer>
        </Form>
      </FormStyle>
    );
  }
}

export default Settings;
