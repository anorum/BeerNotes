import React, { useState } from 'react';
import styled from "styled-components"
import { SelectedFilters } from "@appbaseio/reactivesearch"
import FilterButton from './styles/FilterButton';

const FilterContainer = styled.div`
padding: 2px 0 12px;
border-bottom: 2px solid #e3e3e3;
margin-top: 10px;
`

const FiltersLabelContainer = styled.div`
display: flex;
justify-content: space-around;
margin-bottom: 1.5rem;
`



const FilterIcon = styled.span`
font-size: 1.5rem;
cursor: pointer;
`

const IndividualFilterContainer = styled.div`
display: flex;
justify-content: center;
div {
  width: 60%;
  margin: 0 auto;
}
`

const Filter = (props) => {
    const [showFilters, setShowFilters] = useState(false)
    const [activeFilter, setActiveFilter] = useState(null);

    return (
        <div>
        <FilterContainer>
            <FilterIcon  onClick={() => setShowFilters(!showFilters)}>Filters</FilterIcon>
            <SelectedFilters/>
            {
                showFilters && 
                <React.Fragment>
                <FiltersLabelContainer>
                {props.children.map(child => {
                  const { label } = child.props;

                  return (
                    <FilterButton
                      label={label}
                      key={label}
                      aria-active={activeFilter === label}
                      onClick={() => setActiveFilter(label)}
                    >
                      {label}
                    </FilterButton>
                  );
                })}
                </FiltersLabelContainer>
              <IndividualFilterContainer>
                {props.children.map(child => {
                  if (child.props.label !== activeFilter) return undefined;
                  return child;
                })}
              </IndividualFilterContainer>
              </React.Fragment>
            }
        </FilterContainer>
        </div>
    );
};

export default Filter;