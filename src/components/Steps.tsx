import * as React from "react";

export default ({ steps }) => (
  <ul>
    {steps.map(({ position, note }) => (
      <li key={`step-${position}`}>{note}</li>
    ))}
  </ul>
);
