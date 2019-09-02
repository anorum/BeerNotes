import React, { useState } from "react";
import PropTypes from "prop-types";
import CreateIngredient from "../CreateIngredient";
import { yeastFormat, yeastStyle } from "../../data/recipeOptions";
import { NotificationManager } from "react-notifications";

const CreateYeast = props => {
  const handleCreate = async (success, val) => {
    if (success) {
      await props.setShow(false);
      NotificationManager.success(
        `Yeast ${val.name} has been Created.`,
        "Yeast Created!"
      );
    } else {
      props.setShow(false);
    }
  };
  return (
    <div>
      {props.show && (
        <CreateIngredient
          for="yeasts"
          handleCreate={handleCreate}
          fields={{
            brand: {
              type: "text",
              placeholder: "WyEast",
              help: "What brand is the yeast you are using?",
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
              help: "What is the minimum fermenting temp of the yeast"
            },
            max_temp: {
              type: "number",
              placeholder: "0°F",
              help: "What is the maximum fermenting temp of the yeast"
            },
            avg_attenuation: {
              type: "number",
              placeholder: "70%",
              help: "What is the average attenutation percentage?",
              default_value: 70,
              required: true
            }
          }}
        />
      )}
    </div>
  );
};

CreateYeast.PropTypes = {
  show: Boolean
};

export default CreateYeast;
