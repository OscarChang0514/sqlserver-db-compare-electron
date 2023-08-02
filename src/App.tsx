import { createTheme, ThemeProvider } from '@mui/material';
import { ContextComponents } from './components/layout/context/ContextComponents';
import { GlobalContextProvider } from './context/GlobalContext';
import { RootRouter } from './route/RootRouter';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(255,255,255, 0.5)',
    },
  },
});

const App: React.FC<{}> = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalContextProvider>
        <ContextComponents />
        <RootRouter />
      </GlobalContextProvider>
    </ThemeProvider>
  );
}

export default App;
