import React, { useState } from "react";
import styled from "styled-components";
import Yeasts from "../../components/Yeasts";
import axios from "axios";
import { HeaderSection } from "../../components/styles/PageStyles";
import Button from "../../components/styles/Button";
import User from "../../components/User";
import { NotificationManager } from "react-notifications";
import CreateYeast from "../../components/ingredientforms/CreateYeast"
import NotUser from "../../components/NotUser";


const YeastsHome = props => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <React.Fragment>
      <HeaderSection>
          <img
            id="logo"
            src="../../static/IngredientLogos/yeast.svg"
            alt="Yeasts"
          />
          <h1>Yeasts</h1>
        <User>
          <Button onClick={() => setShowCreate(true)}>Create Yeasts</Button>
        </User>
      </HeaderSection>
     <CreateYeast show={showCreate} setShow={setShowCreate} />
      <Yeasts yeasts={props.yeasts} />
    </React.Fragment>
  );
};

YeastsHome.getInitialProps = async ({ req }) => {
  const yeasts = await axios
    .get("/yeasts/")
    .then(res => res.data)
    .catch(err => err.message);

  return { yeasts };
};

export default YeastsHome;
