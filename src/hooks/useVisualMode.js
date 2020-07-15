import {useState} from 'react';

export default function useVisualMode(init){
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = (newMode, replace=false) => {
    setMode(newMode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
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