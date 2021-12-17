import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

