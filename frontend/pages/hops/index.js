import React, { useState } from "react";
import styled from "styled-components";
import Hops from "../../components/Hops";
import axios from "axios";
import { beerStyles, hopTypes } from "../../data/recipeOptions";
import { HeaderSection } from "../../components/styles/PageStyles";
import StyledButton from "../../components/styles/StyledButton";
import User from "../../components/User";
import CreateIngredient from "../../components/CreateIngredient";
import { NotificationManager } from "react-notifications";

import NotUser from "../../components/NotUser";

const Header = styled.div`
  display: flex;
  align-content: center;
`;

const HopsHome = props => {
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = async (success, val) => {
    if (success) {
      await setShowCreate(false);
      await props.hops.push(val)
      NotificationManager.success(
        `Recipe ${val.name} has been Created.`,
        "Hop Created!"
      );
      
    } else {
      setShowCreate(true);
    }
  };

  return (
    <React.Fragment>
      <HeaderSection>
        <Header>
          <img
            id="logo"
            src="../../static/IngredientLogos/hop.svg"
            alt="hops"
          />
          <h1>Hops</h1>
        </Header>
        <User>
          <button onClick={() => setShowCreate(true)}>Create Hop</button>
        </User>
      </HeaderSection>
      {showCreate && (
        <CreateIngredient
          for="hops"
          handleCreate={handleCreate}
          fields={{
            aroma: {
              type: "text",
              placeholder: "Sweet",
              help: "What is the aroma of the hops?",
              required: false
            },
            alpha: {
              type: "number",
              placeholder: "2.7",
              help: "Alpha Acid Units. This can usually be found on package",
              required: true
            },
            typical_beer: {
              type: "select",
              placeholder: "Saison",
              help: "What beer is this typically used on?",
              options: beerStyles,
              required: true
            },
            hop_type: {
              type: "select",
              placeholder: "Pellet",
              help: "What form is the hop in? Pellet",
              options: hopTypes,
              required: true
            }
          }}
        />
      )}
      <Hops hops={props.hops} />
    </React.Fragment>
  );
};

HopsHome.getInitialProps = async ({ req }) => {
  const hops = await axios
    .get("/hops/")
    .then(res => res.data)
    .catch(err => err.message);

  return { hops };
};

export default HopsHome;
