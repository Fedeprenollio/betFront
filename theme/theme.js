// theme.js
import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  typography: {
    fontSize: 14, // Ajusta el tamaño base de la fuente
  },
});

const scaleFactor = 0.95;

const theme = createTheme({
  typography: {
    ...baseTheme.typography,
    h1: {
      ...baseTheme.typography.h1,
      fontSize: `calc(${baseTheme.typography.h1.fontSize} * ${scaleFactor})`,
    },
    h2: {
      ...baseTheme.typography.h2,
      fontSize: `calc(${baseTheme.typography.h2.fontSize} * ${scaleFactor})`,
    },
    h3: {
      ...baseTheme.typography.h3,
      fontSize: `calc(${baseTheme.typography.h3.fontSize} * ${scaleFactor})`,
    },
    h4: {
      ...baseTheme.typography.h4,
      fontSize: `calc(${baseTheme.typography.h4.fontSize} * ${scaleFactor})`,
    },
    h5: {
      ...baseTheme.typography.h5,
      fontSize: `calc(${baseTheme.typography.h5.fontSize} * ${scaleFactor})`,
    },
    h6: {
      ...baseTheme.typography.h6,
      fontSize: `calc(${baseTheme.typography.h6.fontSize} * ${scaleFactor})`,
    },
    subtitle1: {
      ...baseTheme.typography.subtitle1,
      fontSize: `calc(${baseTheme.typography.subtitle1.fontSize} * ${scaleFactor})`,
    },
    subtitle2: {
      ...baseTheme.typography.subtitle2,
      fontSize: `calc(${baseTheme.typography.subtitle2.fontSize} * ${scaleFactor})`,
    },
    body1: {
      ...baseTheme.typography.body1,
      fontSize: `calc(${baseTheme.typography.body1.fontSize} * ${scaleFactor})`,
    },
    body2: {
      ...baseTheme.typography.body2,
      fontSize: `calc(${baseTheme.typography.body2.fontSize} * ${scaleFactor})`,
    },
    button: {
      ...baseTheme.typography.button,
      fontSize: `calc(${baseTheme.typography.button.fontSize} * ${scaleFactor})`,
    },
    caption: {
      ...baseTheme.typography.caption,
      fontSize: `calc(${baseTheme.typography.caption.fontSize} * ${scaleFactor})`,
    },
    overline: {
      ...baseTheme.typography.overline,
      fontSize: `calc(${baseTheme.typography.overline.fontSize} * ${scaleFactor})`,
    },
  },
});

export default theme;
