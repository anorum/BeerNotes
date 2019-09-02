import React, { useState } from "react";
import PropTypes from "prop-types";
import CreateIngredient from "../CreateIngredient";
import { fermentableCategories } from "../../data/recipeOptions";
import { NotificationManager } from "react-notifications";

const CreateFermentable = props => {
  const handleCreate = async (success, val) => {
    if (success) {
      await props.setShow(false);
      await props.fermentables.push(val);
      NotificationManager.success(
        `Fermentable ${val.name} has been Created.`,
        "Fermentable Created!"
      );
    } else {
      props.setShow(false);
    }
  };
  return (
    <div>
      {props.show && (
        <CreateIngredient
          for="fermentables"
          handleCreate={handleCreate}
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
              help: "Points Per Pound. Usually found on package",
              required: true
            },
            lovibond: {
              type: "number",
              placeholder: "0",
              help: "Lovibond degrees to determine color of beer",
              required: true
            },
            category: {
              type: "select",
              options: fermentableCategories,
              help: "What type of fermentable are you using?",
              required: true
            }
          }}
        />
      )}
    </div>
  );
};

CreateFermentable.PropTypes = {
  show: Boolean
};

export default CreateFermentable;
