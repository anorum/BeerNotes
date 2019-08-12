import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const List = styled.ul`
  border: 1px solid #999;
  background: #ffffff;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 0;
  width: 100%;

  li {
    padding: 0.5rem;
  }
  li:hover, li:focus, .suggestion-active {
    background-color: ${props => props.theme.mainColor};
    cursor: pointer;
    font-weight: 700;
  }

  li:not(:last-of-type) {
    border-bottom: 1px solid #999;
  }
`;

const Autocomplete = props => {
  const node = useRef();
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(props.options);
  const [returnData, setReturnData] = useState()
  const [userInput, setUserInput] = useState();
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const onClick = e => {
    props.updateFunction(e, props.ingredient, props.index, props.field)
    console.log(e)
    setUserInput(e.target.innerText);
    setActiveSuggestion(0);
    setOpen(false); 
  };

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      setOpen(true)
      onClick(e)
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    setSuggestions(props.options);
  }, [props.options]);

  useEffect(() => {
    setReturnData(props.returnData);
  }, [props.returnData]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const onChange = e => {
    setSuggestions(
      props.options.filter(
        suggestion =>
          suggestion
            .toLowerCase()
            .indexOf(e.currentTarget.value.toLowerCase()) > -1
      )
    );
    setUserInput(e.currentTarget.value);
    setOpen(true);
    setActiveSuggestion(0);
  };



  const onKeyDown = e => {
    setOpen(true)
    // Enter
    if (e.keyCode === 13) {
        console.log(e.target)
      setOpen(false);
      setUserInput(suggestions[activeSuggestion]);
      props.updateFunction(e, props.ingredient, props.index, props.field)
      setActiveSuggestion(0);
    }
    // UpArrow
    else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
            return;
        }
        props.updateFunction(e, props.ingredient, props.index, props.field)
        setActiveSuggestion(activeSuggestion - 1)
    }
    // DownArrow
    else if (e.keyCode === 40) {
        if (activeSuggestion -1 === suggestions.length) {
            return;
        }
        props.updateFunction(e, props.ingredient, props.index, props.field)
        setActiveSuggestion(activeSuggestion + 1)
    }
  };

  return (
    <React.Fragment>
      <div
        ref={node}
        style={{ width: "100%", position: "relative", alignSelf: "flex-end" }}
      >
        <input
          type="text"
          autoComplete="off"
          value={userInput}
          placeholder={props.placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />

        {open && (
          <div style={{ position: "absolute", width: "inherit", zIndex: "2" }}>
            <List>
              {suggestions.map((option, index) => {
                  let className;

                  if (index === activeSuggestion) {
                className = "suggestion-active";
              }
                  return (
                <li className={className} key={index} onClick={onClick} data-value={returnData[index]}>{option}</li>
              )})}
            </List>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Autocomplete;
