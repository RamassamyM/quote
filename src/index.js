import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { store } from './core/store/store';
import { Provider } from 'react-redux';
import App from './App';
import './core/theme/index.css';
import theme from './theme';
// import reportWebVitals from './reportWebVitals';
import Navbar from './components/navbar';
import Footer from './components/footer';
// uncomment line below for seeding
import { fetchProductsAsync } from './containers/box-builder-page/productsSlice';
// import { useDispatch } from 'react-redux';
import { HashRouter } from 'react-router-dom';

// To seed database: uncomment these lines and the import lines, then launch server on local
// after comment the lines
// import { seedAllProducts } from './seeder/seed-firestore';
// import { seedAllBoxes } from './seeder/seed-firestore';
// seedAllProducts();
// seedAllBoxes();

store.dispatch(fetchProductsAsync());

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HashRouter>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Navbar />
        <App />
        <Footer />
        </HashRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
