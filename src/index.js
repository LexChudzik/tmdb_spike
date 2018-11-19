import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import logger from 'redux-logger';
import axios from 'axios';

import App from './components/App/App';

const sagaMiddleware = createSagaMiddleware();

//search result reducer
const searchResults = (state = [], action) =>{
  if (action.type === 'SET_RESULTS') {
      return action.payload;
  }
  return state;
}

//favorites reducer
const saved = (state = [], action) =>{
  if (action.type === 'SET_FAVORITES') {
      return action.payload;
  }
  return state;
}

const storeInstance = createStore(
  combineReducers({
      searchResults,
      saved
  }),
  applyMiddleware(
      sagaMiddleware, 
      logger
  ),
);

function* searchMovies(action) {
  try {
    const response = yield call( axios.post, '/api/tmdb', action.payload);
    yield put( {type: 'SET_RESULTS', payload: response.data} );
  }
  catch (error) {
    console.log('error with giphy search', error);
  }
}

function* saveMovie(action) {
  try {
    yield call( axios.post, '/api/database', action.payload);
    //yield put( {type: 'SET_RESULTS', payload: response.data} );
  }
  catch (error) {
    console.log('error with giphy search', error);
  }
}

function* rootSaga() {
  // yield takeEvery( 'GET_FAVORITES', fetchFavorities );
  yield takeEvery( 'SEND_SAVE', saveMovie );
  yield takeEvery( 'SEARCH_MOVIES',  searchMovies);
}

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
