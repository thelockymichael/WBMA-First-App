import {StatusBar} from 'expo-status-bar';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import List from './components/List';

import placesReducer from './store/places-reducer';

const store = createStore(placesReducer, composeWithDevTools());

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.screen}>
        <List />
        <StatusBar style='auto' />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
