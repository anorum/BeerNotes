import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { MultiList } from "@appbaseio/reactivesearch"

const Yeasts = (props) => {

    return (
        <div>
            <MultiList 
            componentId="Yeasts" 
            dataField="yeasts.yeast.name"
            nestedField="yeasts.yeast"
            filterLabel="Yeasts"
            placeholder="With Yeast(s)"
            react ={{
                and: props.react
            }}
            queryFormat="and"
            />    
        </div>   
    );
};
Yeasts.propTypes = {
    react: PropTypes.array
};

export default Yeasts;

