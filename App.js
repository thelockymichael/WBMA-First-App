import {StatusBar} from 'expo-status-bar'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import React from 'react'
import {StyleSheet, SafeAreaView} from 'react-native'
import Navigator from './navigators/Navigator'
import placesReducer from './store/places-reducer'

const store = createStore(placesReducer, composeWithDevTools())

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 40, // Android OS, Content doesn't lap over status bar.
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
})

export default App
