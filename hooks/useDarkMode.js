import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [mode, setMode] = useState('');

  const toggleMode = (modeValue) => {
    setMode(modeValue);
  };

  const setBodyCssClass = (theme) => {
    document.body.className = theme;
  };

  useEffect(() => {
    setBodyCssClass(mode);
  }, [mode]);

  return [mode, toggleMode];
}
