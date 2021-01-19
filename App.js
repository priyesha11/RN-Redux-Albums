import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import RootNavigation from './src/navigation/root-navigation';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './src/redux/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
