import React from "react";
import styled from "styled-components";
import Ingredient from "./Ingredient";

const Hops = props => {
  return (
    <div>
      {props.hops.map(hop => (
        <Ingredient for="hops" ingredient={hop} key={hop.id} />
      ))}
    </div>
  );
};

export default Hops;
