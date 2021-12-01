import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import store from 'redux/app/store'
import { Provider } from 'react-redux'
import AuthService from 'services/Auth/AuthService'
import Loading from 'pages/Loading/Loading';


let persistor = persistStore(store);

const renderApp = () => ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

AuthService.initKeyCloak(renderApp)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
