import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  const transition = (newMode, replace = false) => {
    let newHistory = [ ...history, newMode ];

    if(replace) {
      
      const replacement = newHistory.slice(-1);      
      newHistory = [history[0], ...replacement];
      newMode = newHistory[newHistory.length - 1];
    }

    setMode(newMode);
    setHistory(newHistory);
    return;
  }

  const back = () => {

    const backHistory = history.slice(0, -1);
    const lastMode = backHistory[backHistory.length - 1]

    setMode(lastMode);
    setHistory(backHistory);
    return;
  }

  return { mode, transition, back };
}

