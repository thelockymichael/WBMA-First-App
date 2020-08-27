import {StatusBar} from 'expo-status-bar';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import React from 'react';
import {Image, Dimensions, StyleSheet, View, SafeAreaView} from 'react-native';
import List from './components/List';

import placesReducer from './store/places-reducer';

const store = createStore(placesReducer, composeWithDevTools());

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.screen}>
        <View style={styles.imageContainer}>

          <Image
            source={require('./assets/homeless_cat.jpg')}
            style={styles.image}
          />

        </View>
        <List />
        <StatusBar style='auto' />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.3) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 20,
    marginHorizontal: Dimensions.get('window').width / 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
