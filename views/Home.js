import React from 'react'
import {StatusBar} from 'expo-status-bar'
import List from '../components/List'
import {StyleSheet, View, Text, SafeAreaView} from 'react-native'


const Home = ({navigation}) => {
  return (
    <SafeAreaView>
      <List navigation={navigation} />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

export default Home
