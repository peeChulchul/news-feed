import Router from "routers";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "styles/globalstyles";
import theme from "styles/theme";

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router></Router>
      </ThemeProvider>
    </>
  );
}

export default App;
