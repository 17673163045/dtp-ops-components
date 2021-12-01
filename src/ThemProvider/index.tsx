type BasicThem = {
  color?: string;
  bgColor?: string;

  selectedColor?: string;
  selectedBgColor?: string;

  hoverColor?: string;
  hoverBgColor?: string;

  fontFamily?: string;
  fontSize?: string | number;

  boxShadow?: string;
  border?: string;
  outline?: string;
};
export interface ContextProvider extends BasicThem {
  icon?: BasicThem;
  button?: BasicThem;
  input?: BasicThem;
  children?: any;
}

import React from 'react';

function ThemProvider(props: ContextProvider) {
  const providerValue = props;

  return (
    <ThemContext.Provider value={providerValue}>
      {props.children}
    </ThemContext.Provider>
  );
}

export default ThemProvider;
export const ThemContext = React.createContext({} as ContextProvider);
export const useThemContext = () => React.useContext(ThemContext);
