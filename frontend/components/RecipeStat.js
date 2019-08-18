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
  padding: 20px;
  margin: 2rem 2rem 1rem 2rem;
  border-radius: 500px;
  background: ${props => props.theme.statColor};
`;
const StatHover = styled.div`
position: absolute;
max-height: 80px;
width: 90px;
padding: 5px;
border-radius: 5px;
background: ${props => props.theme.statColor};
top: 15px;
left: 90%; 

&::after{
  content: " ";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: 5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent ${props => props.theme.statColor} transparent transparent;
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
      <Stat onMouseEnter={() => setShowStatName(true)} onMouseLeave={() => setShowStatName(false)}>{statAbbr}</Stat>
      {showStatName && <StatHover>{props.stat}</StatHover>}
      <Value>{props.value && props.unit ? `${props.value}${props.unit}` : props.value ? `${props.value}` : "-"} </Value>
    </Container>
  );
};

RecipeStat.propTypes = {};

export default RecipeStat;
