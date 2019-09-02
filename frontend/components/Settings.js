import React, { Component } from "react";
import Formsy from "formsy-react";
import FormStyle from "./styles/FormStyle";
import styled from "styled-components";
import MyInput from "./MyInput";
import PropTypes from "prop-types";
import {
  ProfileContainer,
  SidebarContainer,
  ContentContainer,
  ProfilePic
} from "./ProfilePage";
import Form from "./styles/FormStyle";

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

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
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
        <Formsy>
          <ProfileContainer>
            <SidebarContainer>
              <h2>Profile Pic</h2>
              <ProfilePic>
                {this.state.profile_pic_link ? (
                  <img src={profile_pic_link} alt="profile_pic" />
                ) : (
                  username && <div>{username.charAt(0).toUpperCase()}</div>
                )}
              </ProfilePic>
              <MyInput
                name="profilepic"
                type="file"
                onChange={this.saveToState}
                value={this.state.profile_pic_link}
              />
            </SidebarContainer>
            <ContentContainer>
              <label htmlFor="description">Description</label>
              <MyInput type="textarea" name="description" />
            </ContentContainer>
          </ProfileContainer>
        </Formsy>
      </FormStyle>
    );
  }
}

export default Settings;
