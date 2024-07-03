import { createRoot } from 'react-dom/client';

import "./index.css";
import Layout from "./pages/Layout";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import theme from '../theme/theme';

// const theme = unstable_createMuiStrictModeTheme();

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  </BrowserRouter>
);
