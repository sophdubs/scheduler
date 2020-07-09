import {useState} from 'react';

export default function useVisualMode(init){
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = (newMode, replace=false) => {
    setMode(newMode);
    if (replace) {
      const tempHistory = [...history];
      tempHistory.pop();
      setHistory([...tempHistory, newMode]);
    } else {
      setHistory([...history, newMode]);
    }
  }

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return {mode, transition, back};
}