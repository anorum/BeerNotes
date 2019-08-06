import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { MultiList } from "@appbaseio/reactivesearch"
import FilterButton from "../styles/FilterButton"

const Grains = (props) => {

    return (
        <div>
            <FilterButton>Grains</FilterButton>
            <MultiList 
            componentId="Grains" 
            dataField="grains.grain.name"
            nestedField="grains.grain"
            filterLabel="Grains"
            placeholder="With Grain(s)"
            react ={{
                and: props.react
            }}
            queryFormat="and"
            />    
        </div>   
    );
};
Grains.propTypes = {
    react: PropTypes.array
};

export default Grains;

