import React, {useState, useEffect} from 'react'
import {StatusBar} from 'expo-status-bar'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import {StyleSheet, SafeAreaView} from 'react-native'
import Navigator from './navigators/Navigator'
import placesReducer from './store/places-reducer'
import {AuthProvider} from './contexts/AuthContext'

import * as Expo from 'expo'
import * as Font from 'expo-font'

const store = createStore(placesReducer, composeWithDevTools())

const App = () => {
  const [fontReady, setFontReady] = useState(false)
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    })

    setFontReady(true)
  }

  useEffect(() => {
    loadFonts()
  }, [])

  if (!fontReady) {
    console.log('Waiting for fonts...')
    return <Expo.AppLoading />
  }
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </Provider>
  )
}


export default App
