import React, { useState } from 'react';
import styled from "styled-components"
import { SelectedFilters } from "@appbaseio/reactivesearch"

const FilterContainer = styled.div`
padding: 2px 0 12px;
border-bottom: 2px solid #e3e3e3;
margin-top: 10px;
`

const FiltersLabelContainer = styled.div`
display: flex;
justify-content: space-around;
`



const FilterIcon = styled.span`
font-size: 1.5rem;
`

const Filter = (props) => {
    const [showFilters, setShowFilters] = useState(false)

    return (
        <div>
        <FilterContainer>
            <FilterIcon onClick={() => setShowFilters(!showFilters)}>Filter</FilterIcon>
            <SelectedFilters/>
            {
                showFilters && 
                    <FiltersLabelContainer>
                        {props.children}
                    </FiltersLabelContainer>
            }
        </FilterContainer>
        </div>
    );
};

export default Filter;