import React, { useState } from "react";
import styled from "styled-components";
import Fermentables from "../../components/Fermentables";
import axios from "axios";
import { HeaderSection } from "../../components/styles/PageStyles";
import Button from "../../components/styles/Button";
import User from "../../components/User";
import { NotificationManager } from "react-notifications";
import CreateFermentable from "../../components/ingredientforms/CreateFermentable"
import NotUser from "../../components/NotUser";


const FermentablesHome = props => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <React.Fragment>
      <HeaderSection>
          <img
            id="logo"
            src="../../static/IngredientLogos/grain.svg"
            alt="fermentables"
          />
          <h1>Fermentables</h1>
        <User>
          <Button onClick={() => setShowCreate(true)}>Create Fermentables</Button>
        </User>
      </HeaderSection>
     <CreateFermentable show={showCreate} setShow={setShowCreate} />
      <Fermentables fermentables={props.fermentables} />
    </React.Fragment>
  );
};

FermentablesHome.getInitialProps = async ({ req }) => {
  const fermentables = await axios
    .get("/fermentables/")
    .then(res => res.data)
    .catch(err => err.message);

  return { fermentables };
};

export default FermentablesHome;
