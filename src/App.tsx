import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Steps from "./components/Steps";

export default () => {
  const [bpm, setBpm] = useState(120);
  const [meter, setMeter] = useState([4, 4]);
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePosition, setActivePosition] = useState(1);
  const oneBar = (60 / (bpm / meter[0])) * 1000;
  const [nextIncrease, setNextIncrease] = useState(oneBar);

  useInterval(
    () => {
      setActivePosition(
        activePosition === steps.length ? 1 : activePosition + 1
      );
    },
    isPlaying ? oneBar : null
  );

  const handlePlayButtonClick = () => {
    setIsPlaying(!isPlaying);
    setActivePosition(1);
  };

  return (
    <main>
      <Steps steps={steps} activePosition={activePosition} />
      <button onClick={handlePlayButtonClick}>Play/Reset</button>
    </main>
  );
};

function useInterval(callback, delay) {
  /*
  /* Thanks to Dan Abramov for this.
  /* https://overreacted.io/making-setinterval-declarative-with-react-hooks
  */
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
