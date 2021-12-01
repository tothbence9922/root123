import { createTheme } from '@material-ui/core/styles';

import siteconfig from '../siteconfig.json'


const MainTheme = createTheme({
  palette: {
    primary: {
      light: siteconfig.themes.secondary.light,
      main: siteconfig.themes.secondary.main,
      dark: siteconfig.themes.secondary.dark,
      contrastText: siteconfig.themes.secondary.contrastText,
    },
  },
});

export default MainTheme; 