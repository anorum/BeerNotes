import React, { Component } from "react";
import update from "immutability-helper";
import styled from "styled-components";
import Form from "./styles/Form";
import SectionContainer from "./styles/SectionContainer";
import Dropdown from "./Dropdown";
import IngredientInput from "./IngredientInput";
import CreateIngredient from "./CreateIngredient";

const Name = styled.input`
  border-bottom: 1px solid black;
  font-size: 2.5rem;
`;

const Description = styled.textarea`
  height: 80px;
`;

const IngredientHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IngredientLogo = styled.div`
  display: flex;
  align-items: center;
`

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
            <div style={{ height: "120px", width: "100%" }}>
              PlaceHolder for all the stats
            </div>
            <Description
              type="textarea"
              id="description"
              name="description"
              placeholder="Description"
              required
              value={this.state.description}
              onChange={this.handleChange}
            />
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
                    selectField="fermentable_id"
                    key={index}
                    updateFunction={(value, field) =>
                      this.updateIngredient(value, "fermentables", index, field)
                    }
                    deleteFunction={() =>
                      this.deleteIngredient("fermentables", index)
                    }
                    createForm={(name, createFunction) => (
                      <CreateIngredient
                        name={name}
                        for="fermentables"
                        handleCreate={createFunction}
                        fields={{
                          brand: "text"
                        }}
                      />
                    )}
                  >
                    <div>
                      <label for="fermentable_amount">Amount (lbs)</label>
                      <input
                        type="number"
                        id="fermentable_amount"
                        name="amount"
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
                <Add type="button" onClick={() => this.addIngredient("hops")}>
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
                    deleteFunction={() => this.deleteIngredient("hops", index)}
                    createForm={(name, createFunction) => (
                      <CreateIngredient
                        for="hops"
                        name={name}
                        handleCreate={createFunction}
                        fields={{
                          aroma: "text",
                          alpha: "number",
                          typical_beer: "text",
                          hop_type: "text",
                          brand: "text"
                        }}
                      />
                    )}
                  >
                    <div>
                      <label for="hops_amount">Amount (oz)</label>
                      <input
                        type="number"
                        id="hops"
                        name="amount"
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
                      <label for="hops_schedule">Hop Schedule</label>
                      <input
                        type="number"
                        id="hops"
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
                <Add type="button" onClick={() => this.addIngredient("yeasts")}>
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
                          brand: "text",
                          yeast_format: "text",
                          yeast_style: "text",
                          min_fermenting_temp: "number",
                          max_fermenting_temp: "number",
                          min_attenuation_temp: "number",
                          max_attenuation_temp: "number"
                        }}
                      />
                    )}
                  >
                    <div>
                      <label for="pitch_temp">Pitch Temp</label>
                      <input
                        type="number"
                        id="pitch_temp"
                        name="pitch_temp"
                        style={{ width: "75px", fontSize: "1.7rem" }}
                        placeholder="F"
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
                  </IngredientInput>
                ))}

              </div>
            </SectionContainer>
          </fieldset>
        </Form>
      </div>
    );
  }
}

CreateRecipe.propTypes = {};

export default CreateRecipe;
