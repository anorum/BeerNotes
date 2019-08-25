import React from "react";
import styled, { withTheme } from "styled-components";
import Link from "next/link";
import StyledButton from "./styles/StyledButton";
import BeerIcons from "./BeerIcons";
import RecipeStat from "./RecipeStat";
import RecipeStats from "./RecipeStats";
import srmToHex from "../data/srmToHex";

const RecipeCard = styled.article`
  box-shadow: ${props => props.theme.bs};
  max-width: 650px;
  min-width: 450px;
  border-radius: 15px;
  position: relative;
  transition: all 0.3s ease 0s;
  :hover {
    transform: translate3d(-4px, -4px, 0);
  }
`;

const RecipeDetails = styled.div`
  display: grid;
  min-height: 15.625em;
  z-index: 1;
  position: relative;
  grid-template-rows: 1fr 100px;
  grid-template-columns: 135px 5fr 1fr;
  grid-template-areas: "logo info userinfo" "logo stats stats";
  gap: 0.625em 0.625em;
  cursor: pointer;
`;

const RecipeName = styled.div`
  align-self: end;
  text-align: left;
`;

const BrewEditContainer = styled.div`
grid-area: brewit;
display: flex;
align-content: center;

`

const StatContainer = styled.div`
  display: flex;
  align-self: flex-end;
  grid-area: stats;
  grid-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const Method = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;

const Style = styled.div`
  color: ${props => props.theme.grey};
  font-weight: 200;
  font-size: 2rem;
  display: block;
  margin-top: 5px;
`;

const UserInfo = styled.div`
padding: 5px;
grid-area: userinfo
`

const Recipe = props => {
  const {
    id,
    name,
    style,
    description,
    icon,
    SRM,
    target_og,
    target_fg,
    target_abv,
    method,
    IBU
  } = props.recipe;

  const {
    username,
    profile_pic_link
  } = props.recipe.user

  const Name = styled.div`
    h2 {
      margin: 0;
      &::after {
        display: block;
        margin-right: 100px;
        margin-top: 5px;
        content: "";
        border: 2px solid ${props => srmToHex(SRM)};
      }
    }
  `;
  return (
    <RecipeCard
      style={{
        //background: `linear-gradient(80deg, #ffffff 60%, ${srmToHex(SRM)} 60%)`
        background: `linear-gradient(90deg, ${srmToHex(
          SRM
        )} 130px, rgb(255, 255, 255) 0%)`
      }}
    >
      <Link href="recipes/[id]" as={`/recipes/${id}`}>
        <RecipeDetails>
          <BeerIcons
            style={{
              fill: `${SRM > 12 ? "white" : props.theme.black}`,
              height: "150px",
              width: "140px",
              gridArea: "logo",
              alignSelf: "center"
            }}
            icon={icon}
          />
          <RecipeName style={{ gridArea: "info" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <Name>
                  <h2>{name}</h2>
                </Name>
                <Style>{style}</Style>
              </div>
            </div>
          </RecipeName>
          <UserInfo>
              {username}
          </UserInfo>
          <StatContainer style={{ background: "white", marginLeft: "-10px" }}>
            <RecipeStat
              labelSize="2.5rem"
              statSize="1.8rem"
              stat="Brew Method"
              value={method}
            />
            <RecipeStat
              labelSize="2.5rem"
              statSize="1.8rem"
              stat="Original Gravity"
              value={target_og}
            />
            <RecipeStat
              labelSize="2.5rem"
              statSize="1.8rem"
              stat="Final Gravity"
              value={target_fg}
            />
            <RecipeStat
              labelSize="2.5rem"
              statSize="1.8rem"
              stat="Alchohol By Volume"
              value={target_abv}
              unit="%"
            />
            <RecipeStat
              labelSize="2.5rem"
              statSize="1.8rem"
              stat="International Bittering Units"
              value={IBU}
            />
            <RecipeStat
              labelSize="2.5rem"
              statSize="1.8rem"
              stat="Standard Reference Method"
              value={SRM}
            />
          </StatContainer>
        </RecipeDetails>
      </Link>
    </RecipeCard>
  );
};

export default withTheme(Recipe);
