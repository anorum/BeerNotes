import React, { useState } from "react";
import styled from "styled-components";
import { SelectedFilters } from "@appbaseio/reactivesearch";
import FilterButton from "./styles/FilterButton";

const FilterContainer = styled.div`
  padding: 2px 0 12px;
  border-bottom: 2px solid #e3e3e3;
  margin-top: 10px;

  .selected-filters {
    display: flex;
    flex-direction: column;
  }
`;

const FiltersLabelContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const FilterIcon = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
`;

const IndividualFilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  &.hide {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

`;

const Filter = props => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  const handleClick = label => {
    activeFilter === label ? setActiveFilter(null) : setActiveFilter(label);
  };

  return (
    <div>
      <FilterContainer>
        <FilterIcon onClick={() => setShowFilters(!showFilters)}>
          Filters
        </FilterIcon>
        <SelectedFilters className="selected-filters" />
        {showFilters && (
          <React.Fragment>
            <FiltersLabelContainer>
              {props.children.map(child => {
                const { label } = child.props;

                return (
                  <React.Fragment>
                    <FilterButton
                      label={label}
                      key={label}
                      aria-active={activeFilter === label}
                      onClick={() => handleClick(label)}
                    >
                      {label}
                    </FilterButton>
                    <IndividualFilterContainer className={child.props.label !== activeFilter && "hide"}>
                      {child}
                    </IndividualFilterContainer>
                  </React.Fragment>
                );
              })}
            </FiltersLabelContainer>
          </React.Fragment>
        )}
      </FilterContainer>
    </div>
  );
};

export default Filter;
