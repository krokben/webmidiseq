import * as React from "react";
import { useState, useEffect, useRef } from "react";
import WebMidi from "webmidi";
import Steps from "./components/Steps";

const MIDI_OUTPUT_DEVICE_NAME = "Steinberg UR22mkII";

export default () => {
  const steps_ = [];
  for (let y = 1; y < 17; y++) {
    for (let x = 1; x < 17; x++) {
      steps_.push({ x, y, note: "C4", active: false });
    }
  }
  console.log(steps_);
  const [io, setIO] = useState({ output: {} });
  const [launchpad, setLaunchpad] = useState({});
  const [bpm, setBPM] = useState(1000);
  const [meter, setMeter] = useState([4, 4]);
  const [steps, setSteps] = useState(steps_);
  const [isPlaying, setIsPlaying] = useState(false);
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
      setSteps(
        steps.map((step, index) => {
          if (!steps.some((step) => step.active)) {
            return index === 0 ? { ...step, active: true } : step;
          }
          if (step.active) {
            return { ...step, active: false };
          }
          if (steps[index - 1] && steps[index - 1].active) {
            return { ...step, active: true };
          }
          return step;
        })
      );
    },
    isPlaying ? oneBar : null
  );

  const handlePlayButtonClick = () => {
    setIsPlaying(!isPlaying);
    setSteps(steps.map((step, index) => ({ ...step, active: false })));
  };

  if (isPlaying && io.output.playNote) {
    io.output.playNote(steps.find((step) => step.active).note, "all", {
      duration: oneBar - 1,
    });
  }

  return (
    <main>
      <Steps steps={steps} />
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
