import React, { useState } from "react";
import styled from "styled-components";
import Hops from "../../components/Hops";
import axios from "axios";
import { HeaderSection } from "../../components/styles/PageStyles";
import Button from "../../components/styles/Button";
import User from "../../components/User";
import { NotificationManager } from "react-notifications";
import CreateHop from "../../components/ingredientforms/CreateHop";
import NotUser from "../../components/NotUser";

const HopsHome = props => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <React.Fragment>
      <HeaderSection>
        <img id="logo" src="../../static/IngredientLogos/hop.svg" alt="hops" />
        <h1>Hops</h1>
        <User>
          <Button onClick={() => setShowCreate(true)}>Create Hop</Button>
        </User>
      </HeaderSection>
      <CreateHop show={showCreate} setShow={setShowCreate} />
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
