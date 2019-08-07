import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { MultiList } from "@appbaseio/reactivesearch"

const Hops = (props) => {

    return (
        <div>
            <MultiList 
            componentId="Hops" 
            dataField="hops.hop.name"
            nestedField="hops.hop"
            filterLabel="Hops"
            placeholder="With Hop(s)"
            react ={{
                and: props.react
            }}
            queryFormat="and"
            />    
        </div>   
    );
};
Hops.propTypes = {
    react: PropTypes.array
};

export default Hops;

