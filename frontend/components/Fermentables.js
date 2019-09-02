import React from "react";
import styled from "styled-components";
import Ingredient from "./Ingredient";
import GridDisplay from "./styles/GridDisplay";
import Link from "next/link";

const Fermentables = props => {
  return (
    <div>
      <GridDisplay>
        {props.fermentables.map(fermentable => (
          <Link href={`/fermentables/${fermentable.id}`}>
            <a>
              <Ingredient
                for="fermentables"
                ingredient={fermentable}
                key={fermentable.id}
              />
            </a>
          </Link>
        ))}
        {props.fermentables.length === 0 && "No Fermentables Created"}
      </GridDisplay>
    </div>
  );
};

export default Fermentables;
