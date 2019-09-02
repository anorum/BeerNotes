import React from "react";
import styled from "styled-components";
import Ingredient from "./Ingredient";
import GridDisplay from "./styles/GridDisplay";
import Link from "next/link";

const Yeasts = props => {
  return (
    <div>
      <GridDisplay>
        {props.yeasts.map(yeast => (
          <Link href={`/yeasts/${yeast.id}`}>
            <a>
              <Ingredient for="yeasts" ingredient={yeast} key={yeast.id} />
            </a>
          </Link>
        ))}
        {props.yeasts.length === 0 && "No Yeasts Created"}
      </GridDisplay>
    </div>
  );
};

export default Yeasts;
