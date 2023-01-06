import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './Global/Global.scss';

import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import personsReducer from './personState'
import personSaga from './personSaga';

const saga = createSagaMiddleware();
const store = configureStore({
  reducer : {
    persons : personsReducer
  },
  middleware:[saga]
})

saga.run(personSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
