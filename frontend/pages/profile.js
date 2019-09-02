import React from "react";
import withAuthSync from "../components/withAuthSync";
import axios from "axios";
import ProfilePage from "../components/ProfilePage";
import { HeaderSection } from "../components/styles/PageStyles";

const Profile = props => {
  return (
    <React.Fragment>
      <ProfilePage user={props.user} />
    </React.Fragment>
  );
};

export default withAuthSync(Profile);
