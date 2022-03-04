import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace = false) {
    if (!replace) {
      setHistory(prev => ([...prev, nextMode]))
      setMode(nextMode)
    } else {
      setHistory(prev => ([...prev.slice(0, prev.length - 1), nextMode]))
      setMode(nextMode)
    }

  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, prev.length - 1))
      const historyCopy = [...history]
      historyCopy.pop()
      setMode(historyCopy[historyCopy.length - 1])      
    }
  }

  return { mode, transition, back };
}
