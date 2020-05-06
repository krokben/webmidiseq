import * as React from "react";
import styled from "styled-components";

const Steps = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Step = styled.li`
  width: 6.25%;
`;

export default ({ steps }) => (
  <Steps>
    {steps.map(({ x, y, note, active }) => (
      <Step key={`step-${x}_${y}`} style={active ? { color: "red" } : {}}>
        {note}
      </Step>
    ))}
  </Steps>
);
