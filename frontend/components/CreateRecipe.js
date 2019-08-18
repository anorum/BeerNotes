import React, { Component, useMemo } from "react";
import update from "immutability-helper";
import styled from "styled-components";
import { roundNumberDecimal } from "../util/helpers";
import Form from "./styles/Form";
import SectionContainer from "./styles/SectionContainer";
import StyledButton from "./styles/StyledButton";
import Dropdown from "./Dropdown";
import IngredientInput from "./IngredientInput";
import CreateIngredient from "./CreateIngredient";
import RecipeStat from "./RecipeStat";
import {
  beerStyles,
  fermentableCategories,
  hopTypes,
  yeastFormat,
  yeastStyle
} from "../data/recipeOptions";

const Name = styled.input`
  border-bottom: 1px solid black;
  font-size: 2.5rem;
`;

const Description = styled.textarea`
  height: 80px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const NumberInputContainers = styled.div`
  display: flex;

  input {
    font-size: 1.5rem;
    border-radius: 5px;
  }

  label {
    display: block;
    align-self: center;
    margin: auto 1rem auto 1rem;
  }
`;

const NumberInput = styled.input`
  width: 80px;
`;

const IngredientHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IngredientsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 5px;
`;

const IngredientLogo = styled.div`
  display: flex;
  align-items: center;
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

const RecipeStats = styled.div`
  display: flex;
  justify-content: space-around;
`;

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      private: true,
      icon: "pilsner",
      batch_size: 5,
      efficiency: 35,
      fermentables: [],
      grains: [],
      hops: [],
      yeasts: [],
      loading: false
    };
  }

  /*** Computed Values ***/

  targetGravity = () => {
    let targetGravity;
    try {
      targetGravity =
        this.state.fermentables
          .map(fermentable => {
            let {
              amount,
              fermentables: { ppg }
            } = fermentable;
            amount = parseFloat(amount);
            ppg = parseFloat(ppg);

            return (
              ((ppg * amount) / this.state.batch_size) *
              (this.state.efficiency * 0.01)
            );
          })
          .reduce((acc, value) => acc + value) *
          0.001 +
        1;
    } catch (e) {
      targetGravity = null;
    }
    return roundNumberDecimal(targetGravity, 3);
  };

  finalGravity = () => {
    let finalGravity;
    try {
      finalGravity =
        (this.targetGravity() - 1) *
        1000 *
        (this.state.yeasts
          .map(yeast => yeast.attenuation)
          .reduce((total, amount, index, array) => {
            total += amount;
            if (index === array.length - 1) {
              return total / array.length;
            } else {
              return total;
            }
          }) *
          0.00001);
      finalGravity = this.targetGravity() - finalGravity;
    } catch (e) {
      finalGravity = null;
    }
    return roundNumberDecimal(finalGravity, 3);
  };

  ABV = () => {
    let ABV;
    try {
      ABV = (this.targetGravity() - this.finalGravity()) * 131.25;
    } catch (e) {
      ABV = null;
    }
    return roundNumberDecimal(ABV, 1);
  };

  IBU = () => {
    let IBU;
    try {
      IBU = 
      this.state.hops.map(hop => {
        //Calculate AAU weight(oz) * Alpha acids
        let AAU = hop.amount * hop.hops.alpha

        //Calculate Utilization
        let Utilization = (1.65*0.000125**(this.targetGravity() - 1)) * ((1-Math.E**(1-hop.hop_schedule))/4.15)
        
        //AAU * Utilization * 75 / boil_time
        return (AAU * Utilization * 75)/ this.state.batch_size
      }).reduce((acc, value) => acc+value)

      
    }
    catch(e) {
      IBU = null
    }
    return roundNumberDecimal(IBU, 0)
  }

  SRM = () => {
    let SRM;
    try {
      let MCU = this.state.fermentables.map(fermentable => ((fermentable.fermentables.lovibond * fermentable.amount)/this.state.batch_size))
                            .reduce((acc, value) => acc + value)
                            console.log(MCU)
      SRM =  1.4922 * (MCU ** 0.6859)
      }
    catch(e) {

      SRM = null
    }
    return roundNumberDecimal(SRM,2)
  }

  /***   Event Handlers ***/

  handleChange = e => {
    let { name, type, value } = e.target;
    if (!value) {
      value = e.target.dataset.value;
    }
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  addIngredient = ingredient => {
    let newIngredient = this.state[ingredient].concat([{}]);
    this.setState({ [ingredient]: newIngredient });
  };

  updateIngredient = (value, ingredient, index, field) => {
    this.setState({
      [ingredient]: update(this.state[ingredient], {
        [index]: { [field]: { $set: value } }
      })
    });
  };

  deleteIngredient = (ingredient, index) => {
    let ingredients = [...this.state[ingredient]];
    if (index !== -1) {
      ingredients.splice(index, 1);
      this.setState({ [ingredient]: ingredients });
    }
  };

  render() {
    return (
      <div>
        <h1>New Recipe</h1>
        <Form>
          <fieldset
            disabled={this.state.loading}
            aria-busy={this.state.loading}
          >
            <ButtonContainer>
              <Add type="button"> Cancel </Add>
              <Add type="button"> Save </Add>
              <Add type="button"> Publish </Add>
            </ButtonContainer>
            <div style={{ display: "flex" }}>
              <Dropdown
                handleChange={this.handleChange}
                icon={this.state.icon}
              />
              <Name
                type="text"
                id="name"
                name="name"
                placeholder="Recipe Name"
                required
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <RecipeStats>
              <RecipeStat
                stat="Original Gravity"
                value={this.targetGravity()}
              />
              <RecipeStat stat="Final Gravity" value={this.finalGravity()} />
              <RecipeStat
                stat="Alchohol By Volume"
                value={this.ABV()}
                unit="%"
              />
              <RecipeStat
                stat="International Bittering Units"
                value={this.IBU()}
              />
              <RecipeStat
                stat="Standard Reference Method"
                value={this.SRM()}
                />
            </RecipeStats>
            <Description
              type="textarea"
              id="description"
              name="description"
              placeholder="Description"
              required
              value={this.state.description}
              onChange={this.handleChange}
            />
            <NumberInputContainers>
              <label htmlFor="boil_time">Boil Time</label>

              <NumberInput
                id="boil_time"
                type="number"
                min="0"
                name="boil_time"
                value={this.state.boil_time}
                onChange={this.handleChange}
                placeholder="0 mins"
              />
              <label htmlFor="batch_size">Batch Size</label>

              <NumberInput
                id="batch_size"
                type="number"
                min="0"
                name="batch_size"
                value={this.state.batch_size}
                onChange={this.handleChange}
                placeholder="0.0lbs"
              />

              <label htmlFor="efficiency">Efficiency</label>

              <NumberInput
                id="efficiency"
                type="number"
                min="0"
                name="efficiency"
                value={this.state.efficiency}
                onChange={this.handleChange}
                placeholder="0%"
              />
            </NumberInputContainers>
            <IngredientsContainer>
              <SectionContainer>
                <div>
                  <IngredientHeader>
                    <IngredientLogo>
                      <img
                        id="logo"
                        src="../../static/IngredientLogos/grain.svg"
                        alt="grain"
                      />
                      <h2>Fermentables</h2>
                    </IngredientLogo>
                    <Add
                      type="button"
                      onClick={() => this.addIngredient("fermentables")}
                    >
                      Add Fermentable
                    </Add>
                  </IngredientHeader>
                  {this.state.fermentables.map((fermentable, index) => (
                    <IngredientInput
                      for="fermentables"
                      selectField="fermentables_id"
                      key={index}
                      updateFunction={(value, field) => {
                        return this.updateIngredient(
                          value,
                          "fermentables",
                          index,
                          field
                        );
                      }}
                      deleteFunction={() =>
                        this.deleteIngredient("fermentables", index)
                      }
                      createForm={(name, createFunction) => (
                        <CreateIngredient
                          name={name}
                          for="fermentables"
                          handleCreate={createFunction}
                          fields={{
                            brand: {
                              type: "text",
                              placeholder: "Briess...",
                              help: "Brand of Fermentables",
                              required: false
                            },
                            ppg: {
                              type: "number",
                              placeholder: "38",
                              help:
                                "Points Per Pound. Usually found on package",
                              required: true
                            },
                            lovibond: {
                              type: "number",
                              placeholder: "2",
                              help:
                                "Lovibond degrees to determine color of beer",
                              required: false
                            },
                            category: {
                              type: "select",
                              options: fermentableCategories,
                              help: "What type of fermentable are you using?"
                            }
                          }}
                        />
                      )}
                    >
                      <div>
                        <label htmlFor="fermentable_amount">Amount (lbs)</label>
                        <input
                          type="number"
                          id="fermentable_amount"
                          name="amount"
                          min="0"
                          style={{ width: "75px", fontSize: "1.7rem" }}
                          placeholder="0.0lbs"
                          onChange={e =>
                            this.updateIngredient(
                              e.target.value,
                              "fermentables",
                              index,
                              "amount"
                            )
                          }
                          value={this.state.fermentables[index].amount}
                          required
                        />
                      </div>
                    </IngredientInput>
                  ))}
                </div>
              </SectionContainer>
              <SectionContainer>
                <div>
                  <IngredientHeader>
                    <IngredientLogo>
                      <img
                        id="logo"
                        src="../../static/IngredientLogos/hop.svg"
                        alt="hops"
                      />
                      <h2>Hops</h2>
                    </IngredientLogo>
                    <Add
                      type="button"
                      onClick={() => this.addIngredient("hops")}
                    >
                      Add Hops
                    </Add>
                  </IngredientHeader>
                  {this.state.hops.map((hop, index) => (
                    <IngredientInput
                      for="hops"
                      selectField="hop_id"
                      key={index}
                      updateFunction={(value, field) =>
                        this.updateIngredient(value, "hops", index, field)
                      }
                      deleteFunction={() =>
                        this.deleteIngredient("hops", index)
                      }
                      createForm={(name, createFunction) => (
                        <CreateIngredient
                          for="hops"
                          name={name}
                          handleCreate={createFunction}
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
                              help:
                                "Alpha Acid Units. This can usually be found on package",
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
                    >
                      <div>
                        <label htmlFor="hops_amount">Amount (oz)</label>
                        <input
                          type="number"
                          id="hops"
                          name="amount"
                          min="0"
                          style={{ width: "75px", fontSize: "1.7rem" }}
                          placeholder="0.0oz"
                          onChange={e =>
                            this.updateIngredient(
                              e.target.value,
                              "hops",
                              index,
                              "amount"
                            )
                          }
                          value={this.state.hops[index].amount}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="hops_schedule">Hop Schedule</label>
                        <input
                          type="number"
                          id="hops"
                          min="0"
                          name="hops_schedule"
                          style={{ width: "75px", fontSize: "1.7rem" }}
                          placeholder="0 mins"
                          onChange={e =>
                            this.updateIngredient(
                              e.target.value,
                              "hops",
                              index,
                              "hop_schedule"
                            )
                          }
                          value={this.state.hops[index].hop_schedule}
                          required
                        />
                      </div>
                    </IngredientInput>
                  ))}
                </div>
              </SectionContainer>
              <SectionContainer>
                <div>
                  <IngredientHeader>
                    <IngredientLogo>
                      <img
                        id="logo"
                        src="../../static/IngredientLogos/yeast.svg"
                        alt="yeast"
                      />
                      <h2>Yeasts</h2>
                    </IngredientLogo>
                    <Add
                      type="button"
                      onClick={() => this.addIngredient("yeasts")}
                    >
                      Add Yeast
                    </Add>
                  </IngredientHeader>
                  {this.state.yeasts.map((yeast, index) => (
                    <IngredientInput
                      for="yeasts"
                      selectField="yeast_id"
                      key={index}
                      updateFunction={(value, field) =>
                        this.updateIngredient(value, "yeasts", index, field)
                      }
                      deleteFunction={() =>
                        this.deleteIngredient("yeasts", index)
                      }
                      createForm={(name, createFunction) => (
                        <CreateIngredient
                          for="yeasts"
                          name={name}
                          handleCreate={createFunction}
                          fields={{
                            brand: {
                              type: "text",
                              placeholder: "WyEast",
                              help: "What brand is the yeast you are using?",
                              required: true
                            },
                            yeast_format: {
                              type: "select",
                              help: "What form is the yeast you are using?",
                              options: yeastFormat,
                              required: true
                            },
                            yeast_style: {
                              type: "select",
                              help: "What style of yeast are you using?",
                              options: yeastStyle,
                              required: true
                            },
                            min_fermenting_temp: {
                              type: "number",
                              placeholder: "0°F",
                              help:
                                "What is the minimum fermenting temp of the yeast"
                            },
                            max_fermenting_temp: {
                              type: "number",
                              placeholder: "0°F",
                              help:
                                "What is the maximum fermenting temp of the yeast"
                            },
                            avg_attenuation: {
                              type: "number",
                              placeholder: "70%",
                              help:
                                "What is the average attenutation percentage?",
                              default_value: 70,
                              required: true
                            }
                          }}
                        />
                      )}
                    >
                      <div>
                        <label htmlFor="pitch_temp">Pitch Temp</label>
                        <input
                          type="number"
                          id="pitch_temp"
                          min="0"
                          name="pitch_temp"
                          style={{ width: "75px", fontSize: "1.7rem" }}
                          placeholder="64°F"
                          onChange={e =>
                            this.updateIngredient(
                              e.target.value,
                              "yeasts",
                              index,
                              "pitch_temp"
                            )
                          }
                          value={this.state.yeasts[index].pitch_temp}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="attenuation">Attenuation</label>
                        <input
                          type="number"
                          id="attenuation"
                          min="0"
                          name="attenuation"
                          style={{ width: "75px", fontSize: "1.7rem" }}
                          placeholder="70%"
                          onChange={e =>
                            this.updateIngredient(
                              e.target.value,
                              "yeasts",
                              index,
                              "attenuation"
                            )
                          }
                          value={this.state.yeasts[index].attenuation}
                          required
                        />
                      </div>
                    </IngredientInput>
                  ))}
                </div>
              </SectionContainer>
            </IngredientsContainer>
          </fieldset>
        </Form>
      </div>
    );
  }
}

CreateRecipe.propTypes = {};

export default CreateRecipe;
