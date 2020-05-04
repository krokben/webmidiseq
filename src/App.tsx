import * as React from "react";
import { useState, useEffect, useRef } from "react";
import WebMidi from "webmidi";
import Steps from "./components/Steps";

const MIDI_OUTPUT_DEVICE_NAME = "Steinberg UR22mkII";

export default () => {
  const [io, setIO] = useState({ output: {} });
  const [bpm, setBPM] = useState(120);
  const [meter, setMeter] = useState([4, 4]);
  const [steps, setSteps] = useState([
    { position: 1, note: "C4" },
    { position: 2, note: "C4" },
    { position: 3, note: "C4" },
    { position: 4, note: "C4" },
    { position: 5, note: "C4" },
    { position: 6, note: "C4" },
    { position: 7, note: "C4" },
    { position: 8, note: "C4" },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePosition, setActivePosition] = useState(1);
  const oneBar = (60 / (bpm / meter[0])) * 1000;
  const [nextIncrease, setNextIncrease] = useState(oneBar);

  useEffect(() => {
    WebMidi.enable((err) => {
      if (err) {
        console.error("WebMidi could not be enabled.", err);
        return;
      }
      setIO({ output: WebMidi.getOutputByName(MIDI_OUTPUT_DEVICE_NAME) });
    });
  }, []);

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

  if (isPlaying && io.output.playNote) {
    io.output.playNote(
      steps.find((step) => step.position === activePosition).note,
      "all",
      { duration: oneBar - 1 }
    );
  }

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
