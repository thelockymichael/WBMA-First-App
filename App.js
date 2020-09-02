import {StatusBar} from 'expo-status-bar'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import React from 'react'
import {StyleSheet, SafeAreaView} from 'react-native'
import Navigator from './navigators/Navigator'
import placesReducer from './store/places-reducer'
import {AuthProvider} from './contexts/AuthContext'

const store = createStore(placesReducer, composeWithDevTools())

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </Provider>
  )
}


export default App
