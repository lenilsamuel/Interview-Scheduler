import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  function transition(val) {
    setMode(val);
  }

  function back() {

  }

  return { mode, transition, back };
}
