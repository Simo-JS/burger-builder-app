import React from "react";

import classes from "./Order.module.css";

const order = props => {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({ name: ingName, amount: props.ingredients[ingName] });
  }
  const ingOutput = ingredients.map(ing => (
    <span
      style={{
        padding: "5px",
        margin: "0 8px",
        textTransform: "capitalize",
        border: "1px solid #ccc",
        display: "inline-block"
      }}
      key={ing.name}
    >
      {ing.name} ({ing.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingOutput}</p>
      <p>
        Price: USD <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
