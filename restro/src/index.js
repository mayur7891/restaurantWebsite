import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import App from './App';


import reducers from './reducers';

const store = configureStore({
  reducer: reducers, // Provide the reducer to the configureStore function
  middleware: [thunk], // You can specify middleware in the middleware field
  // Other configuration options...
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
