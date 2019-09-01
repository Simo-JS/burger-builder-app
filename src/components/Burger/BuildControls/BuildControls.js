import React from "react";

import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          key={ctrl.label}
          label={ctrl.label}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purshaseable}
        onClick={props.ordered}
      >
        Order now
      </button>
    </div>
  );
};

export default buildControls;
