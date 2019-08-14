import React from "react";
import styled from "styled-components";

const color = {
  fermentables: "#EEAF4B",
  hops: "#5ED37F",
  yeasts: "#FACA33"
};

const Container = styled.div`
  position: relative;
  padding: 0.5rem;
  transition: box-shadow 0.25s;
  border: 0.5px solid #f0f0f0;
  border-radius: 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const TabColor = styled.div`
  position: absolute;
  padding: 0.5rem 10rem 1rem 3rem;
  top: 0;
  right: 0;
  height: 100%;
  min-width: 20%;
  transform: skew(-30deg, 0deg) translateX(15%);

  > * {
    transform: skew(30deg, 0deg);
  }

  table {
    width: 100%;
    margin-top: 0.2rem;
    vertical-align: center;
    th {
      text-align: left;
      font-weight: 800;
      padding: 0 2rem;
    }
    td {
      padding: 0 0 0 1.2rem;
    }
  }
`;

const Ingredient = props => {
  const { name } = props.ingredient;
  const fieldNames = Object.keys(props.ingredient).filter(
    val =>
      !(val.includes("id") || val.includes("name") || val.includes("__isNew__"))
  );

  return (
    <Container>
      <h4>{name}</h4>
      <TabColor style={{ background: color[props.for] }}>
        <table>
          {fieldNames
            .map(word => {
              let clean = word
                .replace("_", " ")
                .split(" ")
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");

              return clean;
            })
            .map(field => (
              <th>{field}</th>
            ))}
          <tbody>
            <tr>
              {fieldNames.map(field => (
                <td>{props.ingredient[field]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </TabColor>
    </Container>
  );
};

export default Ingredient;
