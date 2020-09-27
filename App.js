import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import combineReducer from './src/Reducers/index';
import rootSaga from './src/Sagas';
import { logger } from 'redux-logger';
import Navigation from './src/Navigation/index'
const sagaMiddleWare = createSagaMiddleware();
const store = createStore(combineReducer, applyMiddleware(sagaMiddleWare,logger));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Navigation/>
      </Provider>
    );
  }
}

sagaMiddleWare.run(rootSaga);
export default App;