// theme.js
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
const size = "0.9rem"
const theme = unstable_createMuiStrictModeTheme({
  typography: {
    fontSize: 14, // Ajusta el tamaño base de la fuente
    body1: {
      fontSize: size,
    },
    body2: {
      fontSize: size,
    },
    h1: {
      fontSize: size,
    },
    h2: {
      fontSize: size,
    },
    h3: {
      fontSize: size,
    },
    h4: {
      fontSize: size,
    },
    h5: {
      fontSize: size,
    },
    h6: {
      fontSize: size,
    },
    subtitle1: {
      fontSize: size,
    },
    subtitle2: {
      fontSize: size,
    },
    caption: {
      fontSize: size,
    },
    overline: {
      fontSize: size,
    },
    button: {
      fontSize: size,
    },
  },
});

export default theme;
