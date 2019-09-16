import React, { Component, useMemo } from "react";
import update from "immutability-helper";
import Router from "next/router";
import styled from "styled-components";
import { roundNumberDecimal } from "../util/helpers";
import Form from "./styles/Form";
import SectionContainer from "./styles/SectionContainer";
import Switch from "react-switch";
import Select from "react-select";
import Dropdown from "./Dropdown";
import IngredientInput from "./IngredientInput";
import CreateIngredient from "./CreateIngredient";
import RecipeStat from "./RecipeStat";
import {
  beerStyles,
  fermentableCategories,
  hopTypes,
  yeastFormat,
  yeastStyle,
  methods,
  mashType
} from "../data/recipeOptions";
import srmToHex from "../data/srmToHex";
import {
  InputContainer,
  IngredientListContainer,
  IngredientHeader,
  IngredientsContainer,
  IngredientLogo
} from "./styles/IngredientForm";
import User from "./User";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import Error from "next/error";
import Button from "./styles/Button";
import FormErrors from "./FormErrors";

const Name = styled.input`
  border-bottom: 1px solid black;
  font-size: 2.5rem;
`;

const Description = styled.textarea`
  height: 80px;
`;

const Instructions = styled.textarea`
  height: 45px;
  font-size: 1.5rem;
  resize: vertical;
  align-self: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  @media screen and (max-width: ${props => props.theme.tablet}) {
    justify-content: flex-end;
    flex-wrap: wrap;

    button {
      margin-left: 0;
      margin-top: 10px;
    }
  }

  @media screen and (max-width: ${props => props.theme.mobile}) {
    justify-content: space-around;
  }
`;

const StyleMethodContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 15px;

  @media screen and (max-width: ${props => props.theme.tablet}) {
    flex-direction: column;
    width: 100%;
    > div {
      width: 100%;
    }
  }
`;

const MashInput = styled(IngredientInput)``;

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

export const Add = styled.button`
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
    this.form = React.createRef();
    this.state = {
      name: null,
      description: "",
      private_recipe: true,
      published: false,
      icon: "pilsner",
      efficiency: 70,
      fermentables: [],
      grains: [],
      hops: [],
      yeasts: [],
      mash_steps: [],
      instructions: [],
      loading: false,
      errors: {
        fermentables: {},
        hops: {},
        yeasts: {},
        mash_steps: {},
        instructions: []
      },
      touched: {
        fermentables: []
      }
    };
  }

  componentWillMount() {
    this.setState({
      ...this.props.recipe,
      instructions: (this.props.recipe && this.props.recipe.instructions) || []
    });
  }

  /*** Computed Values ***/

  validatePublish = () => {
    if (
      this.state.name &&
      this.state.boil_time &&
      this.state.fermentables.length > 0 &&
      this.state.yeasts.length > 0 &&
      this.state.batch_size &&
      this.state.efficiency
    ) {
      return true;
    }
    return false;
  };

  targetGravity = () => {
    let targetGravity;
    try {
      targetGravity =
        this.state.fermentables
          .map(fermentable => {
            let {
              amount,
              fermentable: { ppg }
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
      IBU = this.state.hops
        .map(hop => {
          //Calculate AAU weight(oz) * Alpha acids
          let AAU = hop.amount * hop.hop.alpha;

          //Calculate Utilization
          let Utilization =
            1.65 *
            0.000125 ** (this.targetGravity() - 1) *
            ((1 -
              Math.E **
                (hop.hop.hop_type === "pellets"
                  ? 1 - hop.hop_schedule
                  : -0.04 * hop.hop_schedule)) /
              4.15);

          //AAU * Utilization * 75 / boil_time
          return (AAU * Utilization * 75) / this.state.batch_size;
        })
        .reduce((acc, value) => acc + value);
    } catch (e) {
      IBU = null;
    }
    return roundNumberDecimal(IBU, 0);
  };

  SRM = () => {
    let SRM;
    try {
      let MCU = this.state.fermentables
        .map(
          fermentable =>
            (fermentable.fermentable.lovibond * fermentable.amount) /
            this.state.batch_size
        )
        .reduce((acc, value) => acc + value);
      SRM = 1.4922 * MCU ** 0.6859;
    } catch (e) {
      SRM = null;
    }
    return roundNumberDecimal(SRM, 2);
  };

  /***   Event Handlers ***/

  cancelRecipe = e => {
    Router.back();
  };

  deleteRecipe = e => {
    if (
      confirm(
        "Are you sure you want to delete this recipe? This can not be undone."
      )
    ) {
      axios
        .delete(`/recipe/delete/${this.state.id}`)
        .then(res => {
          NotificationManager.success(
            `Recipe has been deleted.`,
            "Recipe Deleted."
          );
          Router.push("/recipes/");
        })
        .catch(err => {
          NotificationManager.error(
            err.response,
            Object.keys(err.response.data).map(
              field => `${field} : ${err.response.data[field]}`
            ),
            5000,
            () => {
              return;
            }
          );
        });
    } else {
      return;
    }
  };

  saveRecipe = (e, message) => {
    axios
      .put("/recipe/create", this.state)
      .then(res => {
        NotificationManager.success(
          message || `Recipe ${res.data.name} has been saved.`,
          message ? "Recipe Unpublished" : "Recipe Saved."
        );
        if (!this.props.edit) {
          Router.replace(`/recipes/edit/${res.data.id}`);
        }
      })
      .catch(err => {
        this.setState({ errors: err.response.data });
        NotificationManager.error(
          <FormErrors error={err.response.data} />,
          "Please correct the below errors before saving.",
          5000,
          () => {
            return;
          }
        );
      });
  };

  unpublishRecipe = async () => {
    await this.setState({ published: false });
    this.saveRecipe(null, "Recipe Unpublished and Saved.");
  };

  publishRecipe = async e => {
    e.preventDefault();
    if (!this.form.current.checkValidity()) {
      this.form.current.reportValidity();
      return;
    } else {
      await this.setState({
        published: true
      });
      await axios
        .put("/recipe/create", this.state)
        .then(res => {
          NotificationManager.success(
            `Recipe ${res.data.name} has been created`,
            "Recipe Created"
          );
          Router.replace(`/recipes/${res.data.id}`);
        })
        .catch(err =>
          NotificationManager.error(
            err.response,
            Object.keys(err.response.data).map(
              field => `${field} : ${err.response.data[field]}`
            ),
            5000,
            () => {
              return;
            }
          )
        );
    }
  };

  handlePrivateCheck = checked => {
    this.setState({
      private_recipe: !checked
    });
  };

  handleChange = e => {
    let { name, type, value } = e.target;
    if (!value) {
      value = e.target.dataset.value;
    }
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  addIngredient = ingredient => {
    let newIngredient = this.state[ingredient].concat([
      { [`${ingredient.substring(0, ingredient.length - 1)}_id`]: null }
    ]);
    this.setState({ [ingredient]: newIngredient });
  };

  handleInstructionChange = (e, index) => {
    console.log(e);
    let newInstructions = [...this.state.instructions];
    newInstructions[index] = e.target.value;
    this.setState({ instructions: newInstructions });
  };

  addMash = index => {
    let newStep = this.state["mash_steps"].concat({ step: index });
    this.setState({ mash_steps: newStep });
  };

  addInstruction = index => {
    let newInstruction = this.state["instructions"].concat("");
    this.setState({ instructions: newInstruction });
  };

  updateIngredient = (value, ingredient, index, field) => {
    //Clear Errors if Any Exists
    this.state.errors[ingredient] &&
      this.state.errors[ingredient][index] &&
      this.state.errors[ingredient][index][field] &&
      this.setState({
        errors: {
          [ingredient]: update(this.state.errors[ingredient], {
            [index]: { [field]: { $set: null } }
          })
        }
      });
    //Update the state of the field
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

  deleteMash = index => {
    let steps = this.state.mash_steps;
    if (index !== -1) {
      steps.splice(index, 1);
      let i = 1;
      steps.forEach(step => {
        step.step = i;
        i += 1;
      });
      this.setState({ mash_steps: steps });
    }
  };

  render() {
    return (
      <User>
        {this.props.edit && this.props.recipe.user_id !== this.props.user.id ? (
          <Error
            statusCode={403}
            title={"You can not edit someone elses recipe"}
          />
        ) : (
          <React.Fragment>
            <IngredientHeader className="recipeheader">
              <div>
                {this.props.edit ? (
                  <h1>Edit {this.state.name}</h1>
                ) : (
                  <h1>New Recipe</h1>
                )}
                {this.state.published ? (
                  <span style={{ background: "#3ECF8E", color: "white" }}>
                    Published
                  </span>
                ) : (
                  <span>Draft</span>
                )}
              </div>

              <ButtonContainer>
                <Add
                  type="button"
                  onClick={this.cancelRecipe}
                  style={{
                    textShadow: "none",
                    background: "#EFEEEE",
                    color: "#706F6A"
                  }}
                >
                  Cancel
                </Add>
                {this.props.edit && (
                  <Add
                    type="button"
                    onClick={this.deleteRecipe}
                    style={{ background: "#ED5E67" }}
                  >
                    Delete
                  </Add>
                )}
                {this.state.published && (
                  <Add
                    type="button"
                    onClick={this.unpublishRecipe}
                    style={{ background: "#ED5E67" }}
                  >
                    Unpublish
                  </Add>
                )}
                <Add type="button" onClick={this.saveRecipe}>
                  Save
                </Add>
                <Button
                  type="submit"
                  onClick={this.publishRecipe}
                  disabled={!this.validatePublish()}
                >
                  Publish
                </Button>
              </ButtonContainer>
            </IngredientHeader>
            <Form ref={this.form}>
              <fieldset
                disabled={this.state.loading}
                aria-busy={this.state.loading}
              >
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
                    data-error={
                      this.state.touched.name || this.state.errors.name
                        ? true
                        : false
                    }
                    required
                  />
                  <InputContainer>
                    <label htmlFor="private_recipe">Public</label>
                    <Switch
                      id="private_recipe"
                      onChange={this.handlePrivateCheck}
                      checked={!this.state.private_recipe}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      height={24}
                      width={52}
                    />
                  </InputContainer>
                </div>
                <StyleMethodContainer>
                  <label htmlFor="beerstyle" style={{ margin: "0 10px" }}>
                    Beer Style
                  </label>
                  <div style={{ flexGrow: "1" }}>
                    <Select
                      id="beerstyle"
                      name="style"
                      styles={{
                        valueContainer: (provided, state) => {
                          return {
                            ...provided,
                            border: `${this.state.errors.style && "1px solid"}`,
                            borderColor: `${this.state.errors.style &&
                              "#ED5E67"}`
                          };
                        }
                      }}
                      options={beerStyles}
                      getOptionLabel={option => option.label}
                      getOptionValue={option => option.value}
                      formatOptionLabel={option => option.label}
                      placeholder={"Select Beer Style..."}
                      onChange={(value, { action }) => {
                        this.setState({
                          errors: update(this.state.errors, {
                            style: { $set: null }
                          })
                        });
                        action !== "clear"
                          ? this.setState({ style: value.value })
                          : this.setState({ style: null });
                      }}
                      isClearable
                      value={beerStyles.filter(
                        ({ value }) => value === this.state.style
                      )}
                    />
                  </div>
                  <label htmlFor="brewmethod" style={{ margin: "0 10px" }}>
                    Brew Method
                  </label>
                  <div style={{ flexGrow: "1" }}>
                    <Select
                      id="brewmethod"
                      name="method"
                      options={methods}
                      styles={{
                        valueContainer: (provided, state) => {
                          return {
                            ...provided,
                            border: `${this.state.errors.method &&
                              "1px solid"}`,
                            borderColor: `${this.state.errors.method &&
                              "#ED5E67"}`
                          };
                        }
                      }}
                      getOptionLabel={option => option.label}
                      getOptionValue={option => option.value}
                      formatOptionLabel={option => option.value}
                      placeholder={"Select Method..."}
                      onChange={(value, { action }) => {
                        this.setState({
                          errors: update(this.state.errors, {
                            method: { $set: null }
                          })
                        });
                        action !== "clear"
                          ? this.setState({ method: value.value })
                          : this.setState({ method: null });
                      }}
                      isClearable
                      value={methods.filter(
                        ({ value }) => value === this.state.method
                      )}
                    />
                  </div>
                </StyleMethodContainer>
                <RecipeStats>
                  <RecipeStat
                    stat="Original Gravity"
                    value={this.targetGravity()}
                  />
                  <RecipeStat
                    stat="Final Gravity"
                    value={this.finalGravity()}
                  />
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
                    background={srmToHex(this.SRM())}
                    color={this.SRM() > 13 && "white"}
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
                  data-error={
                    this.state.touched.description ||
                    this.state.errors.description
                      ? true
                      : false
                  }
                  required
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
                    required
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
                    required
                    step="0.1"
                  />

                  <label htmlFor="efficiency">Efficiency</label>

                  <NumberInput
                    id="efficiency"
                    type="number"
                    min="0"
                    name="efficiency"
                    value={this.state.efficiency}
                    onChange={this.handleChange}
                    data-error={
                      this.state.touched.efficiency ||
                      this.state.errors.efficiency
                        ? true
                        : false
                    }
                    placeholder="0%"
                    step="0.1"
                    required
                  />
                  <label htmlFor="priming_level">Priming Level</label>

                  <NumberInput
                    id="priming_level"
                    type="number"
                    min="0"
                    name="priming_level"
                    value={this.state.priming_level}
                    onChange={this.handleChange}
                    data-error={
                      this.state.touched.priming_level ||
                      this.state.errors.priming_level
                        ? true
                        : false
                    }
                    placeholder="0"
                    step="0.1"
                    required
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
                      <IngredientListContainer>
                        {this.state.fermentables.map((fermentable, index) => (
                          <IngredientInput
                            for="fermentables"
                            selectField="fermentable_id"
                            value={fermentable.fermentable}
                            key={index}
                            invalid={
                              this.state.errors.fermentables &&
                              this.state.errors.fermentables[index] &&
                              this.state.errors.fermentables[index]
                                .fermentable_id
                            }
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
                                    placeholder: "0",
                                    help:
                                      "Points Per Pound. Usually found on package",
                                    required: true
                                  },
                                  lovibond: {
                                    type: "number",
                                    placeholder: "0",
                                    help:
                                      "Lovibond degrees to determine color of beer",
                                    required: true
                                  },
                                  category: {
                                    type: "select",
                                    options: fermentableCategories,
                                    help:
                                      "What type of fermentable are you using?",
                                    required: true
                                  }
                                }}
                              />
                            )}
                          >
                            <div>
                              <label htmlFor="fermentable_amount">
                                Amount (lbs)
                              </label>
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
                                data-error={
                                  this.state.errors.fermentables &&
                                  this.state.errors.fermentables[index] &&
                                  this.state.errors.fermentables[index].amount
                                    ? true
                                    : false
                                }
                                value={this.state.fermentables[index].amount}
                                step="0.1"
                                required
                              />
                            </div>
                          </IngredientInput>
                        ))}
                      </IngredientListContainer>
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
                          value={hop.hop}
                          key={index}
                          invalid={
                            this.state.errors.hops &&
                            this.state.errors.hops[index] &&
                            this.state.errors.hops[index].hop_id
                          }
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
                                  step: "0.1",
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
                              step="0.1"
                              required
                              data-error={
                                this.state.errors.hops &&
                                this.state.errors.hops[index] &&
                                this.state.errors.hops[index].amount
                                  ? true
                                  : false
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor="hop_schedule">Hop Schedule</label>
                            <input
                              type="number"
                              id="hops"
                              min="0"
                              name="hop_schedule"
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
                              data-error={
                                this.state.errors.hops &&
                                this.state.errors.hops[index] &&
                                this.state.errors.hops[index].hop_schedule
                                  ? true
                                  : false
                              }
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
                          invalid={
                            this.state.errors.yeasts &&
                            this.state.errors.yeasts[index] &&
                            this.state.errors.yeasts[index].yeast_id
                          }
                          value={yeast.yeast}
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
                                  help:
                                    "What brand is the yeast you are using?",
                                  required: true
                                },
                                yeast_format: {
                                  type: "select",
                                  help: "What style of yeast are you using?",
                                  options: yeastStyle,
                                  required: true
                                },
                                min_temp: {
                                  type: "number",
                                  placeholder: "0°F",
                                  help:
                                    "What is the minimum fermenting temp of the yeast"
                                },
                                max_temp: {
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
                              data-error={
                                this.state.errors.yeasts &&
                                this.state.errors.yeasts[index] &&
                                this.state.errors.yeasts[index].pitch_temp
                                  ? true
                                  : false
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
                              data-error={
                                this.state.errors.yeasts &&
                                this.state.errors.yeasts[index] &&
                                this.state.errors.yeasts[index].attenuation
                                  ? true
                                  : false
                              }
                              value={this.state.yeasts[index].attenuation}
                              required
                            />
                          </div>
                        </IngredientInput>
                      ))}
                    </div>
                  </SectionContainer>
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
                      <Add
                        type="button"
                        onClick={() =>
                          this.addMash(this.state.mash_steps.length + 1)
                        }
                      >
                        Add Mash Step
                      </Add>
                    </IngredientHeader>
                    {this.state.mash_steps.map((step, index) => (
                      <div style={{ display: "flex", width: "100%" }}>
                        <div
                          style={{ alignSelf: "center", marginLeft: "15px" }}
                        >
                          <h3>{index + 1}</h3>
                        </div>
                        <IngredientInput
                          containerStyle={{ width: "100%" }}
                          for="mash_steps"
                          value={index}
                          key={index}
                          invalid={
                            this.state.errors.mash_steps &&
                            this.state.errors.mash_steps[index]
                          }
                          updateFunction={(value, field) =>
                            this.updateIngredient(
                              value,
                              "mash_steps",
                              index,
                              field
                            )
                          }
                          deleteFunction={() => this.deleteMash(index)}
                          mainField={
                            <React.Fragment>
                              <div style={{ alignSelf: "center" }}>
                                <label htmlFor="notes">Notes</label>
                                <input
                                  type="text"
                                  id="notes"
                                  name="notes"
                                  style={{ width: "100%", fontSize: "1.7rem" }}
                                  placeholder="Enter Mash Step"
                                  data-error={
                                    this.state.errors.mash_steps &&
                                    this.state.errors.mash_steps[index] &&
                                    this.state.errors.mash_steps[index].notes
                                      ? true
                                      : false
                                  }
                                  onChange={e =>
                                    this.updateIngredient(
                                      e.target.value,
                                      "mash_steps",
                                      index,
                                      "notes"
                                    )
                                  }
                                  value={this.state.mash_steps[index].notes}
                                  required
                                />
                              </div>
                            </React.Fragment>
                          }
                        >
                          <div>
                            <label htmlFor="amount">Amount</label>
                            <input
                              type="number"
                              id="Amount"
                              min="0"
                              name="amount"
                              style={{ width: "75px", fontSize: "1.7rem" }}
                              placeholder="0.0lb"
                              onChange={e =>
                                this.updateIngredient(
                                  e.target.value,
                                  "mash_steps",
                                  index,
                                  "amount"
                                )
                              }
                              data-error={
                                this.state.errors.mash_steps &&
                                this.state.errors.mash_steps[index] &&
                                this.state.errors.mash_steps[index].amount
                                  ? true
                                  : false
                              }
                              value={this.state.mash_steps[index].amount}
                              required
                              step="0.1"
                            />
                          </div>
                          <div>
                            <label htmlFor="time">Time</label>
                            <input
                              type="number"
                              id="time"
                              min="0"
                              name="time"
                              style={{ width: "75px", fontSize: "1.7rem" }}
                              placeholder="0min"
                              onChange={e =>
                                this.updateIngredient(
                                  e.target.value,
                                  "mash_steps",
                                  index,
                                  "time"
                                )
                              }
                              data-error={
                                this.state.errors.mash_steps &&
                                this.state.errors.mash_steps[index] &&
                                this.state.errors.mash_steps[index].time
                                  ? true
                                  : false
                              }
                              value={this.state.mash_steps[index].time}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="temperature">Temp</label>
                            <input
                              type="number"
                              id="temperature"
                              min="0"
                              name="temperature"
                              style={{ width: "75px", fontSize: "1.7rem" }}
                              placeholder="0°"
                              data-error={
                                this.state.errors.mash_steps &&
                                this.state.errors.mash_steps[index] &&
                                this.state.errors.mash_steps[index].temperature
                                  ? true
                                  : false
                              }
                              onChange={e =>
                                this.updateIngredient(
                                  e.target.value,
                                  "mash_steps",
                                  index,
                                  "temperature"
                                )
                              }
                              value={this.state.mash_steps[index].temperature}
                              required
                            />
                          </div>
                          <div style={{ width: "150px" }}>
                            <label htmlFor="mash_type">Type</label>
                            <Select
                              id="mash_type"
                              name="mash_type"
                              options={mashType}
                              styles={{
                                valueContainer: (provided, state) => {
                                  return {
                                    ...provided,
                                    border: `${this.state.errors.mash_steps &&
                                      this.state.errors.mash_steps[index] &&
                                      this.state.errors.mash_steps[index]
                                        .mash_type &&
                                      "1px solid"}`,
                                    borderColor: `${this.state.errors
                                      .mash_steps &&
                                      this.state.errors.mash_steps[index] &&
                                      this.state.errors.mash_steps[index]
                                        .mash_type &&
                                      "#ED5E67"}`
                                  };
                                }
                              }}
                              getOptionLabel={option => option.label}
                              getOptionValue={option => option.value}
                              formatOptionLabel={option => option.label}
                              placeholder={"Mash Type"}
                              onChange={(value, { action }) => {
                                action !== "clear"
                                  ? this.updateIngredient(
                                      value.value,
                                      "mash_steps",
                                      index,
                                      "mash_type"
                                    )
                                  : this.updateIngredient(
                                      null,
                                      "mash_steps",
                                      index,
                                      "mash_type"
                                    );
                              }}
                              isClearable
                              value={mashType.filter(
                                ({ value }) =>
                                  value ===
                                  this.state.mash_steps[index].mash_type
                              )}
                            />
                          </div>
                        </IngredientInput>
                      </div>
                    ))}
                  </SectionContainer>
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
                      <Add
                        type="button"
                        onClick={() =>
                          this.addInstruction(
                            this.state.instructions.length + 1
                          )
                        }
                      >
                        Add Instruction Step
                      </Add>
                    </IngredientHeader>
                    {this.state.instructions.map((step, index) => (
                      <div style={{ display: "flex", width: "100%" }}>
                        <div
                          style={{ alignSelf: "center", marginLeft: "15px" }}
                        >
                          <h3>{index + 1}</h3>
                        </div>
                        <IngredientInput
                          containerStyle={{ width: "100%" }}
                          for="instructions"
                          value={index}
                          key={index}
                          invalid={
                            this.state.errors.instructions &&
                            this.state.errors.instructions[index]
                          }
                          updateFunction={(value, field) =>
                            this.updateIngredient(
                              value,
                              "instructions",
                              index,
                              field
                            )
                          }
                          deleteFunction={() =>
                            this.deleteIngredient("instructions", index)
                          }
                          mainField={
                            <React.Fragment>
                              <div
                                style={{ alignSelf: "center", padding: "10px" }}
                              >
                                <Instructions
                                  type="text"
                                  id="instructions"
                                  name="instructions"
                                  style={{ width: "100%", fontSize: "1.7rem" }}
                                  placeholder="Enter Instruction"
                                  data-error={
                                    this.state.errors.instructions &&
                                    this.state.errors.instructions[index]
                                      ? true
                                      : false
                                  }
                                  onChange={e =>
                                    this.handleInstructionChange(e, index)
                                  }
                                  value={this.state.instructions[index]}
                                  required
                                />
                              </div>
                            </React.Fragment>
                          }
                        ></IngredientInput>
                      </div>
                    ))}
                  </SectionContainer>
                </IngredientsContainer>
              </fieldset>
            </Form>
          </React.Fragment>
        )}
      </User>
    );
  }
}

CreateRecipe.propTypes = {};

export default CreateRecipe;
