import { createStore, compose } from 'redux';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate} from 'redux-persist';
import { AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './modules';
import rootSaga from './sagas';

export function configStore(){
  const middleware = createSagaMiddleware();
  const composeEnhancers = composeWithDevTools({});
  const enhancer = composeEnhancers(applyMiddleware(middleware), autoRehydrate());
  const store = createStore(rootReducer, null, enhancer);
  middleware.run(rootSaga);
  persistStore(store, {storage: AsyncStorage});
  console.log(store.getState());
  return store;
}