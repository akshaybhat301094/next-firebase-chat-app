import React, { useContext, useEffect } from 'react';
import { node } from 'prop-types';
import DarkModeContext from '../context/DarkModeContext';
import useDarkMode from './useDarkMode';

const DarkProvider = ({ children }) => {
  const [mode, toggleMode] = useDarkMode();

  // set default value when page is refreshed
  let defaultMode = 'light';
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    defaultMode = 'dark';
  }

  useEffect(() => {
    toggleMode(defaultMode);
  }, []);

  // add event listener to check if theme changed
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      if (event.matches) {
        toggleMode('dark');
      } else {
        toggleMode('light');
      }
    });

  return (
    <DarkModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkProvider.propTypes = {
  children: node.isRequired,
};

export default DarkProvider;

export const useDarkModeContext = () => useContext(DarkModeContext);
