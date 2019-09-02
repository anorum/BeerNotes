import React, { useState } from "react";
import PropTypes from "prop-types";
import CreateIngredient from "../CreateIngredient";
import { beerStyles, hopTypes } from "../../data/recipeOptions";
import { NotificationManager } from "react-notifications";

const CreateHop = props => {
  const handleCreate = async (success, val) => {
    if (success) {
      await props.setShow(false);
      await props.hops.push(val);
      NotificationManager.success(
        `Hop ${val.name} has been Created.`,
        "Hop Created!"
      );
    } else {
      props.setShow(false);
    }
  };
  return (
    <div>
      {props.show && (
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
              step:"0.1",
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
    </div>
  );
};

CreateHop.PropTypes = {
  show: Boolean
};

export default CreateHop;
