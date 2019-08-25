import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 80px !important;
  margin-right: 1.5rem;
  height: 80px;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.4);
  border-radius: 0.3125rem;
  transition: 0.3s;
  button {
    width: inherit;
    height: inherit;
    background: rgba(0, 0, 0, 0.01);
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 0.3125rem;
    padding: .4rem;

    :hover {
      box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.15);
      background: rgba(0, 0, 0, 0.2);
    }

    :focus {
      box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.15);
    }
  }
`;

const SelectList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: #FBFBFB;
`;

const Option = styled.li`
  display: inline-block;
  cursor: pointer;
  transition-duration: 0.5s;

  img {
    height: 80px;
    width: 80px;
  }

  :hover {
      background: rgba(254, 220, 2, 0.8);
  }
`;

const Dropdown = props => {
  const node = useRef();

  const [showOptions, setShowOptions] = useState(false);

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setShowOptions(false);
  };

  const handleChange = e => {
    props.handleChange(e);
    setShowOptions(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const beerOptions = ["belgian", "german", "imperial", "pilsner"]

  const options = beerOptions.map(beer => (
    <Option onClick={handleChange}>
        <img
            name="icon"
            data-value={beer}
            src={`/static/BeerTypes/${beer}.svg`}
            alt={beer} />
    </Option> ))

  return (
    <Container ref={node}>
      <button type="button" onClick={e => setShowOptions(!showOptions)}>
        <img src={`/static/BeerTypes/${props.icon}.svg`} alt={props.icon} />
      </button>
      {showOptions && (
        <React.Fragment>
          <SelectList>
            { options }
          </SelectList>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Dropdown;