// store.js

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // You might need additional middleware

// Import your reducers
import authReducer from '../reducers/auth'; // Replace with your actual reducer import

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers as needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
