import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { MultiList } from "@appbaseio/reactivesearch"
import FilterButton from "../styles/FilterButton"




const Fermentables = (props) => {

    return (
            <MultiList 
            componentId="Fermentables" 
            dataField="fermentables.fermentable.name"
            nestedField="fermentables.fermentable"
            filterLabel="Fermentables"
            placeholder="With Fermentable(s)"
            react ={{
                and: props.react
            }}
            queryFormat="and"
            showMissing={true}
            />    
    );
};
Fermentables.propTypes = {
    react: PropTypes.array
};

export default Fermentables;

