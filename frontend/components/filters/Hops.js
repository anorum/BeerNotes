import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { MultiList } from "@appbaseio/reactivesearch"
import FilterButton from "../styles/FilterButton"

const Hops = (props) => {

    return (
        <div>
            <FilterButton>Hops</FilterButton>
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

