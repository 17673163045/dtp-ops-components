import React from 'react';
import { useThemContext } from '../ThemProvider';
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

interface BoxProps extends MuiBoxProps {
  selected?: boolean;
  hover?: boolean;
  as?: React.ElementType<any>;
  themIncludes?: string[];
}

function Box(props: BoxProps) {
  const {
    color,
    bgColor,
    selectedColor,
    selectedBgColor,
    hoverColor,
    hoverBgColor,
    boxShadow,
    fontSize,
    fontFamily,
    border,
    outline,
  } = useThemContext() || {};

  const { themIncludes, component, as, hover, selected, ...restProps } = props;

  const themStyle: any = {};
  const addThemStyle = (key: string, value: any, condition?: boolean) => {
    if (value !== undefined && value !== null && condition) {
      themStyle[key] = value;
    }
  };

  if (Array.isArray(themIncludes)) {
    themIncludes.forEach((themKey) => {
      addThemStyle(themKey, color);
      addThemStyle(themKey, hoverColor, hover);
      addThemStyle(themKey, selectedColor, selected);

      addThemStyle(themKey, bgColor);
      addThemStyle(themKey, hoverBgColor, hover);
      addThemStyle(themKey, selectedBgColor, hover);

      addThemStyle(themKey, boxShadow);
      addThemStyle(themKey, fontSize);
      addThemStyle(themKey, fontFamily);
      addThemStyle(themKey, border);
      addThemStyle(themKey, outline);
    });
  }

  return (
    <MuiBox component={component || as} style={themStyle} {...restProps} />
  );
}

export default Box;
