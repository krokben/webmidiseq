import * as React from "react";

export default ({ steps, activePosition }) => (
  <ul>
    {steps.map(({ position, note }, index) => (
      <li
        key={`step-${position}`}
        style={index + 1 == activePosition ? { color: "red" } : {}}
      >
        {note}
      </li>
    ))}
  </ul>
);
