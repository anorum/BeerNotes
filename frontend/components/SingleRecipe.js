import React from "react";
import styled from "styled-components";
import Link from "next/link";
import RecipeStat from "./RecipeStat";
import {
  IngredientHeader,
  IngredientLogo,
  InputsContainer,
  InputContainer,
  ViewContainer,
  IngredientContainer
} from "./styles/IngredientForm";
import SectionContainer from "./styles/SectionContainer";
import Ingredient from "./Ingredient";
import SameUser from "./SameUser";
import User from "./User";
import srmToHex from "../data/srmToHex";

const RecipeContainer = styled.div`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;

  img {
    height: 80px;
    width: 80px;
  }
`;

const RecipeHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Name = styled.div`
  margin-left: 30px;

  h1 {
    margin: 0;
    &::after {
      display: block;
      margin-right: 100px;
      margin-top: 5px;
      content: "";
      border: 2px solid ${props => props.theme.mainColor};
    }
  }
`;

const Style = styled.div`
  color: ${props => props.theme.grey};
  font-weight: 200;
  font-size: 2rem;
  display: block;
  margin-top: 5px;
`;

const Add = styled.button`
  cursor: pointer;
  border-radius: 4px;
  min-width: 85px;
  text-align: center;
  height: 40px;
  background: #3ecf8e;
  text-shadow: 0 1px 3px rgba(36, 180, 126, 0.4);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  display: inline-block;
  line-height: 40px;
  text-transform: uppercase;
  color: #fff;
  transition: all 0.15s ease;
  font-size: 1.5rem;
  margin: auto 23px;

  :hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
  :focus {
    outline: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;

  @media screen and (max-width: ${props => props.theme.tablet}) {
    flex-direction: column-reverse;
    text-align: center;
    > * {
      margin-bottom: 10px;
    }
  }
`;

const RecipeStats = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Description = styled.div`
  padding: 15px;
  border-bottom: 0.5px solid ${props => props.theme.lightGrey};
  margin-bottom: 10px;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;

  p {
    font-size: 2rem;
  }
`;

const DetailLabel = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.black};
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 1.5rem;
  margin-right: 20px;
`;

class SingleRecipe extends React.Component {
  render() {
    const {
      id,
      icon,
      name,
      user_id,
      description,
      style,
      method,
      boil_time,
      batch_size,
      efficiency,
      target_og,
      target_fg,
      target_abv,
      IBU,
      SRM,
      fermentables,
      hops,
      yeasts,
      published,
      private_recipe,
      mash_steps,
      finished,
      instructions,
      priming_level
    } = this.props.recipe;
    return (
      <RecipeContainer>
        <RecipeHeader>
          <img
            name="icon"
            data-value={icon}
            src={`../static/BeerTypes/${icon}.svg`}
            alt={icon}
          />
          <Name>
            <IngredientHeader>
              <h1>{name}</h1>
              <SameUser userID={user_id}>
                {published ? (
                  <span style={{ background: "#3ECF8E", color: "white" }}>
                    Published
                  </span>
                ) : (
                  <span>Draft</span>
                )}
              </SameUser>
            </IngredientHeader>
            <Style>{style}</Style>
          </Name>
          <ButtonContainer>
            <SameUser currentUser={this.props.user} userID={user_id}>
              <Status>
                <DetailLabel>Privacy</DetailLabel>
                {private_recipe ? "Private" : "Public"}
              </Status>
              <Link href={{ pathname: `/recipes/edit/${id}` }}>
                <Add>Edit</Add>
              </Link>
            </SameUser>
          </ButtonContainer>
        </RecipeHeader>
        <Description>{description}</Description>
        <RecipeStats>
          <RecipeStat stat="Brew Method" value={method} />
          <RecipeStat stat="Original Gravity" value={target_og} />
          <RecipeStat stat="Final Gravity" value={target_fg} />
          <RecipeStat stat="Alchohol By Volume" value={target_abv} unit="%" />
          <RecipeStat stat="International Bittering Units" value={IBU} />
          <RecipeStat
            stat="Standard Reference Method"
            value={SRM}
            background={srmToHex(SRM)}
            color={SRM > 13 && "white"}
          />
        </RecipeStats>
        <DetailsContainer>
          <div>
            <h3>Boil Size</h3>
            <p>{boil_time} mins</p>
          </div>
          <div>
            <h3>Batch Size</h3>
            <p>{batch_size} lbs</p>
          </div>
          <div>
            <h3>Efficiency</h3>
            <p>{efficiency}%</p>
          </div>
          <div>
            <h3>Priming Level</h3>
            <p>{priming_level}</p>
          </div>
        </DetailsContainer>
        <SectionContainer>
          <IngredientHeader>
            <IngredientLogo>
              <img
                id="logo"
                src="../../static/IngredientLogos/grain.svg"
                alt="grain"
              />
              <h2>Fermentables</h2>
            </IngredientLogo>
          </IngredientHeader>
          {fermentables &&
            fermentables.map(fermentable => (
              <ViewContainer key={fermentable.fermentable.id}>
                <InputsContainer>
                  <InputContainer>
                    <DetailLabel>Amount</DetailLabel>
                    {fermentable.amount} Lbs
                  </InputContainer>
                </InputsContainer>
                <Ingredient
                  ingredient={fermentable.fermentable}
                  for="fermentables"
                />
              </ViewContainer>
            ))}
        </SectionContainer>
        <SectionContainer>
          <IngredientHeader>
            <IngredientLogo>
              <img
                id="logo"
                src="../../static/IngredientLogos/hop.svg"
                alt="hops"
              />
              <h2>Hops</h2>
            </IngredientLogo>
          </IngredientHeader>
          {hops &&
            hops.map(hop => (
              <ViewContainer key={hop.hop.id}>
                <InputsContainer>
                  <InputContainer>
                    <DetailLabel>Amount</DetailLabel>
                    {hop.amount} oz
                  </InputContainer>
                  <InputContainer>
                    <DetailLabel>Hop Schedule</DetailLabel>
                    {hop.hop_schedule} mins
                  </InputContainer>
                </InputsContainer>
                <Ingredient ingredient={hop.hop} for="hops" />
              </ViewContainer>
            ))}
        </SectionContainer>
        <SectionContainer>
          <IngredientHeader>
            <IngredientLogo>
              <img
                id="logo"
                src="../../static/IngredientLogos/yeast.svg"
                alt="yeast"
              />
              <h2>Yeasts</h2>
            </IngredientLogo>
          </IngredientHeader>
          {yeasts &&
            yeasts.map(yeast => (
              <ViewContainer key={yeast.yeast.id}>
                <InputsContainer>
                  <InputContainer>
                    <DetailLabel>Temp</DetailLabel>
                    {yeast.pitch_temp}°F
                  </InputContainer>
                  <InputContainer>
                    <DetailLabel>Attenuation</DetailLabel>
                    {yeast.attenuation}%
                  </InputContainer>
                </InputsContainer>
                <Ingredient ingredient={yeast.yeast} for="yeasts" />
              </ViewContainer>
            ))}
        </SectionContainer>
        {mash_steps && mash_steps.length > 0 && (
          <SectionContainer>
            <IngredientHeader>
              <IngredientLogo>
                <img
                  id="logo"
                  src="../../static/IngredientLogos/mash.svg"
                  alt="mash"
                />
                <h2>Mash Steps</h2>
              </IngredientLogo>
            </IngredientHeader>
            {mash_steps &&
              mash_steps.map(step => (
                <ViewContainer key={step.id}>
                  <InputsContainer>
                    <InputContainer>
                      <DetailLabel>Amount</DetailLabel>
                      {step.amount} lb
                    </InputContainer>
                    <InputContainer>
                      <DetailLabel>Temp</DetailLabel>
                      {step.temperature}°F
                    </InputContainer>
                    <InputContainer>
                      <DetailLabel>Time</DetailLabel>
                      {step.time} min
                    </InputContainer>
                    <InputContainer>
                      <DetailLabel>Type</DetailLabel>
                      {step.mash_type}
                    </InputContainer>
                  </InputsContainer>
                  <IngredientContainer>
                    <InputContainer>
                      <DetailLabel>Notes</DetailLabel>
                      {step.notes}
                    </InputContainer>
                  </IngredientContainer>
                </ViewContainer>
              ))}
          </SectionContainer>
        )}
        {instructions.length > 0 && (
          <SectionContainer>
            <IngredientHeader>
              <IngredientLogo>
                <img
                  id="logo"
                  src="../../static/IngredientLogos/instructions.svg"
                  alt="instructions"
                />
                <h2>General Instructions</h2>
              </IngredientLogo>
            </IngredientHeader>
            {instructions &&
              instructions.map((instruction, index) => (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    margin: "10px auto"
                  }}
                >
                  <div style={{ alignSelf: "center", margin: "0 15px" }}>
                    <h3>{index + 1}</h3>
                  </div>
                  <IngredientContainer style={{ alignSelf: "center" }}>
                    {instruction}
                  </IngredientContainer>
                </div>
              ))}
          </SectionContainer>
        )}
      </RecipeContainer>
    );
  }
}

export default SingleRecipe;
