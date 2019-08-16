import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Stat = styled.div`
  padding: 20px;
  margin: 2rem 2rem 1rem 2rem;
  border-radius: 500px;
  background: #D9DBE0;
`;

const Value = styled.span`
    font-size: 2rem;
    margin: 0 0 1rem 0;
`

const RecipeStat = props => {
  return (
    <Container>
      <Stat>{props.stat.split(' ').map(w => w.charAt(0).toUpperCase()).join('')}</Stat>
      <Value>{props.value || "-"} </Value>
    </Container>
  );
};

RecipeStat.propTypes = {};

export default RecipeStat;
