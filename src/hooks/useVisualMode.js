import {useState} from 'react';

// Our own custom state machine which keeps track of the history of modes the appointment component transitions through
export default function useVisualMode(init){
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  // If replace = false, we add the new mode to the end.
  // Else, we replace the last mode in the array with the input new mode
  const transition = (newMode, replace=false) => {
    setMode(newMode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  // Remove the last mode from the array and set the mode to the new last mode in the array
  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  // Return these three functions to be able to transition and update the mode elsewhere
  return {mode, transition, back};
}