import React from 'react';
import PropTypes from 'prop-types';
import withAuthSync from "../components/withAuthSync"
import SameUser from "../components/SameUser"
import Settings from "../components/Settings"

const settings = props => {
    return (
            <Settings user={props.user} />
    );
};

settings.propTypes = {
    
};

export default withAuthSync(settings);