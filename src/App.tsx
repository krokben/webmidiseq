import * as React from "react";
import { useState } from "react";
import Steps from "./components/Steps";

export default () => {
  const [steps, setSteps] = useState([
    { position: 1, note: "c4" },
    { position: 2, note: "c4" },
    { position: 3, note: "c4" },
    { position: 4, note: "c4" },
    { position: 5, note: "c4" },
    { position: 6, note: "c4" },
    { position: 7, note: "c4" },
    { position: 8, note: "c4" },
  ]);

  return (
    <main>
      <Steps steps={steps} />
    </main>
  );
};
