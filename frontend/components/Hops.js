import React from "react";
import styled from "styled-components";
import Ingredient from "./Ingredient";
import GridDisplay from "./styles/GridDisplay";
import Link from "next/link";

const Hops = props => {
  return (
    <div>
      <GridDisplay>
        {props.hops.map(hop => (
          <Link href={`/hops/${hop.id}`}>
            <a>
              <Ingredient for="hops" ingredient={hop} key={hop.id} />
            </a>
          </Link>
        ))}
        {props.hops.length === 0 && "No Hops Created"}
      </GridDisplay>
    </div>
  );
};

export default Hops;
