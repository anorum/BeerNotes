import React, {useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
`;
const Stat = styled.div`
  /* padding: 20px;
  margin: 2rem 2rem 1rem 2rem;
  border-radius: 500px;
  background: ${props => props.theme.statColor}; */
  font-size: 3rem;
  font-weight: 300;
  border-radius: 5%;
  padding: 5px;
`;
const StatHover = styled.div`
position: absolute;
max-height: 80px;
width: 100px;
padding: 5px;
border-radius: 5px;
background: ${props => props.theme.statColor};
bottom: 100%;
right: -50%; 
z-index: 10;
box-shadow: ${props => props.theme.bs};

&::after{
  content: " ";
  position: absolute;
  top: 90%;
  right: 45%;
  margin-top: 5px;
  border-width: 5px;
  border-style: solid;
  border-color: ${props => props.theme.statColor} transparent transparent transparent;
}

`

const Value = styled.span`
    font-size: 2rem;
    margin: 0 0 1rem 0;
`

const RecipeStat = props => {
  const [showStatName, setShowStatName] = useState(false)
  const statAbbr = props.stat.split(' ').map(w => w.charAt(0).toUpperCase()).join('')

  return (
    <Container>
      <Stat style={{background: props.background, color: props.color, fontSize: props.labelSize}} onMouseEnter={() => setShowStatName(true)} onMouseLeave={() => setShowStatName(false)}>{statAbbr}</Stat>
      {showStatName && <StatHover>{props.stat}</StatHover>}
      <Value style={{fontSize: props.statSize}}>{props.value && props.unit ? `${props.value}${props.unit}` : props.value ? `${props.value}` : "-"} </Value>
    </Container>
  );
};

RecipeStat.propTypes = {};

export default RecipeStat;
