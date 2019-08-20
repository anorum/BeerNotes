import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Ingredient from "./Ingredient";
import SectionContainer from "./styles/SectionContainer"

const StyledTable = styled.table`
  tr {
    margin-bottom: 1rem;
  }

  td {
    padding: 0.5rem;
    white-space: nowrap;
  }

  th {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const DetailCell = styled.td`
  text-align: center;
  font-weight: 700;
  div:nth-child(2) {
    font-size: 1.3rem;
  }
`;

const FermentableIngredients = props => {
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    setTotalWeight(
      props.fermentables
        .map(fermentable => fermentable.amount)
        .reduce((acc, val) => acc + val)
    );
  });

  return (
    <SectionContainer>
      <div>
        <img
          id="logo"
          src="data:image/png;base64,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"
          alt="grain"
        />
        <h2>Fermentables</h2>
      </div>
      <StyledTable>
        <th>Amount</th>
        <th />
        {props.fermentables.map(fermentable => (
          <tr>
            <DetailCell>
              <div>{fermentable.amount} LBS</div>
              <div>
                ({Math.round((fermentable.amount / totalWeight) * 100, 2)}%)
              </div>
            </DetailCell>
            <td style={{ width: "100%" }}>
              <div>
                <Ingredient ingredient={fermentable.fermentable} />
              </div>
            </td>
          </tr>
        ))}
        <tr>
          <td colspan="2">{totalWeight}LBs Total Weight</td>
        </tr>
      </StyledTable>
    </SectionContainer>
  );
};

export default FermentableIngredients;