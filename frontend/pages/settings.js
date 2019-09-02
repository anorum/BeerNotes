import React from 'react';
import PropTypes from 'prop-types';
import withAuthSync from "../components/withAuthSync"
import SameUser from "../components/SameUser"
import Settings from "../components/Settings"

const settings = props => {
    return (
        <div>
           <h1>Edit Your Profile</h1> 
            <Settings user={props.user} />
        </div>
    );
};

settings.propTypes = {
    
};

export default withAuthSync(settings);