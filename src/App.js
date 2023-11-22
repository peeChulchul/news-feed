import Router from "routers";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "styles/globalstyles";
import theme from "styles/theme";
import { Provider } from "react-redux";
import store from "redux/config/configStore";

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Router></Router>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
