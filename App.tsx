/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigation from './component/navigation/RootNavigation';
import RootReducer from './component/storage/RootReducer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
var store = createStore(RootReducer);

function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

export default App;
