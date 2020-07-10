import {useState} from 'react';

export default function useVisualMode(init){
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = (newMode, replace=false) => {
    console.log('setting to', newMode);
    setMode(newMode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
      console.log(history);
    } else {
      setHistory(prev => [...prev, newMode]);
      console.log(history);
    }
  }

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      console.log(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return {mode, transition, back};
}