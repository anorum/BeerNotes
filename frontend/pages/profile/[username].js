import React from "react";
import withAuthSync from "../../components/withAuthSync";
import axios from "axios";
import ProfilePage from "../../components/ProfilePage";
import Error from "next/error";
import nookies from "nookies";

const Profile = props => {
  let { user, recipes, fermentables, hops, yeasts } = props.user_profile;

  return (
    <React.Fragment>
      {user && user.username ? (
        <ProfilePage
          user={props.user}
          user_profile={user}
          recipes={recipes}
          fermentables={fermentables}
          hops={hops}
          yeasts={yeasts}
        />
      ) : (
        <Error statusCode={404} title={props.user_profile.msg} />
      )}
    </React.Fragment>
  );
};

Profile.getInitialProps = async ({ req, query: { username } }) => {
  if (req) {
    let user_profile = await axios
      .get(`/user/${username}`, {
        headers: {
          withCredentials: true,
          cookie: req.headers.cookie || ""
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(err => err.response.data.msg);

    return { user_profile };
  } else {
    let user_profile = await axios
      .get(`/user/${username}`)
      .then(res => {
        return res.data;
      })
      .catch(err => err.response.data.msg);

    return { user_profile };
  }
};

export default Profile;
