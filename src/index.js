import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#301924'
    },
    secondary: {
      main: '#FFA500'
    },
    tertiary: {
      dark: '#3b5998'
    }
  }
});

theme = responsiveFontSizes(theme);

const Index = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
